"use client";

import { type ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { rsrcPath } from "@utils/global";
import { InstrumentContext } from "./GeneratorInstrument";
import styles from "./Metronome.module.css"

const INTERVAL = 100 as const;
const LOOKAHEAD = 200 as const;

class Timer
{
	interval: number;
	callback: (tempo: number) => void;
	#tempo: number;
	#intervalID = -1;
	#wakeLock: null | WakeLockSentinel = null;

	constructor(interval: number, tempo: number, callback: (tempo: number) => void)
	{
		this.interval = interval;
		this.#tempo = tempo;
		this.callback = callback;
	}

	get tempo()
	{
		return this.#tempo;
	}
	set tempo(value: number)
	{
		this.#tempo = value;
		if (this.running)
		{
			this.stop();
			this.start();
		}
	}

	get running()
	{
		return this.#intervalID > 0;
	}

	stop()
	{
		window.clearInterval(this.#intervalID);
		this.#intervalID = -1;
		void this.#wakeLock?.release(); // "void" to tell typescript we do not await the call on purpose
		this.#wakeLock = null;
		console.log("metronome stopped");
	}

	start()
	{
		this.callback(this.#tempo);
		this.#intervalID = window.setInterval(this.callback, this.interval, this.#tempo);
		navigator.wakeLock.request()
			.then((wakeLock) => this.#wakeLock = wakeLock)
			.catch((error: unknown) => { console.log(`ERROR: can't keep screen awake: '${error as Error}'`) });
		console.log("metronome started");
	}
}

export default function Metronome()
{
	const instrCtxt = useContext(InstrumentContext);
	const [isPlaying, setPlaying] = useState(false);
	const tempoBtn = useRef<null | HTMLButtonElement>(null);
	const timer = useRef<null | Timer>(null);
	const audioCtxt = useRef<null | AudioContext>(null);
	const audioBuffer = useRef<null | AudioBuffer>(null);

	let nextNoteTime = 0;

	// scheduler
	function playClick(time = 0)
	{
		if (!audioCtxt.current || !audioBuffer.current)
			return;

		const audioSource = new AudioBufferSourceNode(audioCtxt.current, { buffer: audioBuffer.current });
		audioSource.connect(audioCtxt.current.destination);
		audioSource.start(time);
	}

	function scheduler(tempo: number)
	{
		if (!audioCtxt.current || !audioBuffer.current)
			return;

		while (nextNoteTime < audioCtxt.current.currentTime + (LOOKAHEAD / 1000))
		{
			console.log(nextNoteTime);
			playClick(nextNoteTime);
			nextNoteTime += 60 / tempo;
		}
	}

	// handlers
	async function clickHandler(event: React.MouseEvent<HTMLButtonElement>)
	{
		event.preventDefault();

		if (!audioCtxt.current || !audioBuffer.current)
			return;

		timer.current ??= new Timer(INTERVAL, instrCtxt.instrument.tempo, scheduler);

		if (timer.current.running) // stop
		{
			setPlaying(false);
			timer.current.stop();
			nextNoteTime = 0;
			void audioCtxt.current.suspend(); // "void" to tell typescript we do not await the call on purpose
		}
		else // start
		{
			await audioCtxt.current.resume();
			setPlaying(true);
			timer.current.start();
			nextNoteTime = audioCtxt.current.currentTime;
		}
	}

	function changeHandlerTempo(event: ChangeEvent<HTMLInputElement>)
	{
		event.preventDefault();

		instrCtxt.setInstrument({
			...instrCtxt.instrument,
			[event.target.name]: event.target.valueAsNumber
		});
		if (timer.current)
			timer.current.tempo = (event.target.valueAsNumber);
	}

	// init
	useEffect(() => {
		audioCtxt.current = new AudioContext();
		void audioCtxt.current.suspend(); // "void" to tell typescript we do not await the call on purpose

		fetch(rsrcPath("/druminfected__metronome.mp3"))
			.then((response) => {
				return response.arrayBuffer();
			})
			.then((buffer) => {
				return audioCtxt.current?.decodeAudioData(buffer);
			})
			.then((audioData) => {
				if (!audioData)
					throw new Error("Received audio data is undefined");
				audioBuffer.current = audioData;
			})
			.catch((error: unknown) => {
				console.log(`Error while initializing audio: '${error as Error}'`);
			});
	}, []);

	return (
		<div className={styles.metronome}>
			<button
				ref={tempoBtn}
				type="button"
				className={isPlaying ? styles.playing : styles.stopped}
				onClick={clickHandler}
			>
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
