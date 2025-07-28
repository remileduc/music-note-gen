"use client";

import Image from "next/image";
import { type ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { rsrcPath } from "@utils/global";
import { InstrumentContext } from "./GeneratorInstrument";
import styles from "./Metronome.module.css"

const INTERVAL = 100 as const;
const LOOKAHEAD = 200 as const;

class Metronome
{
	interval: number;
	#tempo: number;
	#intervalID = -1;
	#wakeLock: null | WakeLockSentinel = null;
	#audioCtxt = new AudioContext();
	#audioBuffer: null | AudioBuffer = null;
	#nextNoteTime = 0;

	constructor(interval: number, tempo: number)
	{
		this.interval = interval;
		this.#tempo = tempo;
		void this.#audioCtxt.suspend();
	}

	// accessors

	get tempo()
	{
		return this.#tempo;
	}
	set tempo(value: number)
	{
		if (isNaN(value) || value < 1)
			value = 1;
		this.#tempo = value;

		if (this.running)
			this.#nextNoteTime = this.#audioCtxt.currentTime + 60 / this.#tempo;
	}

	get running()
	{
		return this.#intervalID > 0;
	}

	// resources management

	async init(audioURL: string)
	{
		if (this.#audioBuffer)
			return Promise.resolve();

		try
		{
			const response = await fetch(rsrcPath(audioURL));
			const buffer = await response.arrayBuffer();
			this.#audioBuffer = await this.#audioCtxt.decodeAudioData(buffer);
		}
		catch (error)
		{
			console.log(`Error while initializing audio: '${error as Error}'`);
		}
	}

	finalize()
	{
		this.stop();
		// this.#audioCtxt.close();
	}

	// start / stop

	stop()
	{
		window.clearInterval(this.#intervalID);
		this.#intervalID = -1;

		this.#nextNoteTime = 0;
		void this.#audioCtxt.suspend(); // "void" to tell typescript we do not await the call on purpose

		void this.#wakeLock?.release(); // "void" to tell typescript we do not await the call on purpose
		this.#wakeLock = null;

		console.log("metronome stopped");
	}

	async start()
	{
		await this.#audioCtxt.resume();
		this.#nextNoteTime = this.#audioCtxt.currentTime;

		this.#scheduler();

		this.#intervalID = window.setInterval(this.#scheduler.bind(this), this.interval);

		navigator.wakeLock.request()
			.then((wakeLock) => this.#wakeLock = wakeLock)
			.catch((error: unknown) => { console.log(`ERROR: can't keep screen awake: '${error as Error}'`) });

		console.log("metronome started");
	}

	// scheduler

	#playClick(time = 0)
	{
		if (!this.#audioBuffer)
			return;

		const audioSource = new AudioBufferSourceNode(this.#audioCtxt, { buffer: this.#audioBuffer });
		audioSource.connect(this.#audioCtxt.destination);
		audioSource.start(time);
	}

	#scheduler()
	{
		if (!this.#audioBuffer)
			return;

		while (this.#nextNoteTime < this.#audioCtxt.currentTime + (LOOKAHEAD / 1000))
		{
			this.#playClick(this.#nextNoteTime);
			this.#nextNoteTime += 60 / this.#tempo;
		}
	}
}

export default function MetronomeUI()
{
	const instrCtxt = useContext(InstrumentContext);
	const [isPlaying, setPlaying] = useState(false);
	const tempoBtn = useRef<null | HTMLButtonElement>(null);
	const metronome = useRef<null | Metronome>(null);

	// handlers
	async function clickHandler(event: React.MouseEvent<HTMLButtonElement>)
	{
		event.preventDefault();

		if (!metronome.current)
		{
			metronome.current = new Metronome(INTERVAL, instrCtxt.instrument.tempo);
			await metronome.current.init("/druminfected__metronome.mp3");
		}

		if (metronome.current.running) // stop
		{
			setPlaying(false);
			metronome.current.stop();
		}
		else // start
		{
			setPlaying(true);
			metronome.current.tempo = instrCtxt.instrument.tempo;
			void metronome.current.start(); // "void" to tell typescript we do not await the call on purpose
		}
	}

	function changeHandlerTempo(event: ChangeEvent<HTMLInputElement>)
	{
		event.preventDefault();

		instrCtxt.setInstrument({
			...instrCtxt.instrument,
			[event.target.name]: event.target.valueAsNumber
		});
		if (metronome.current)
			metronome.current.tempo = (event.target.valueAsNumber);
	}

	// init
	useEffect(() => {
		return () => { metronome.current?.finalize(); };
	}, []);

	return (
		<div className={styles.metronome}>
			<button
				ref={tempoBtn}
				type="button"
				className={isPlaying ? styles.playing : styles.stopped}
				onClick={(event) => { void clickHandler(event); }}
			>
				<Image
					aria-hidden
					src={ isPlaying ? rsrcPath("/stop.svg") : rsrcPath("/play.svg") }
					alt=""
					width={isPlaying ? 14 : 16}
					height={isPlaying ? 14 : 16}
				/>
				Métronome
			</button>

			<div className={styles.inputbox}>
				<label htmlFor="tempo">Tempo</label>
				<input
					type="number"
					id="tempo"
					name="tempo"
					min="30"
					max="200"
					value={instrCtxt.instrument.tempo}
					onChange={changeHandlerTempo}
				/>
			</div>
		</div>
	);
}
