"use client";

import Image from "next/image";
import { type ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import manifest from "@app/manifest";
import { rsrcPath } from "@utils/global";
import { InstrumentContext } from "./GeneratorInstrument";
import styles from "./Metronome.module.css"

type MediaSessionHandler = undefined | null | MediaSessionActionHandler;
type MediaSessionHandlers = Partial<Record<MediaSessionAction, MediaSessionHandler>>;

const manif = manifest();

const INTERVAL = 100 as const;
const LOOKAHEAD = 200 as const;
const METADATA: MediaMetadataInit = {
	title: manif.name,
	artist: undefined, // shows BPM
	album: "Métronome",
	artwork: manif.icons
} as const;

class MediaSessionManager
{
	handlers: MediaSessionHandlers = {};

	constructor(metadata: MediaMetadata, handlers?: MediaSessionHandlers)
	{
		this.handlers = handlers ?? {};

		if ("mediaSession" in navigator)
		{
			navigator.mediaSession.metadata = metadata;
			navigator.mediaSession.playbackState = "paused";
			for (const [action, handler] of Object.entries(this.handlers))
				MediaSessionManager.#installHandler(action as MediaSessionAction, handler);
		}
	}

	static updateBPM(bpm: number)
	{
		if ("mediaSession" in navigator && navigator.mediaSession.metadata)
			navigator.mediaSession.metadata.artist = `${bpm.toString()} bpm`;
	}

	static startSession()
	{
		if ("mediaSession" in navigator)
			navigator.mediaSession.playbackState = "playing";
	}

	static stopSession()
	{
		if ("mediaSession" in navigator)
			navigator.mediaSession.playbackState = "paused";
	}

	static #installHandler(name: MediaSessionAction, callback: MediaSessionHandler)
	{
		if (!callback || !("mediaSession" in navigator))
			return;
		try
		{
			navigator.mediaSession.setActionHandler(name, callback);
		}
		catch (error)
		{
			console.log(`Media session action '${name}' not supported yet: '${error as Error}'`);
		}
	}
}

class Metronome
{
	interval: number;
	systemTime: number;
	mediaManager: null | MediaSessionManager = null;
	#tempo: number;
	#intervalID = -1;
	#wakeLock: null | WakeLockSentinel = null;
	#audioCtxt = new AudioContext();
	#audioBuffer: null | AudioBuffer = null;
	#nextNoteTime = 0;
	#noteIdx = 0;

	constructor(interval: number, tempo: number, systemTime = 4)
	{
		this.interval = interval;
		this.#tempo = tempo;
		this.systemTime = systemTime;
		void this.#audioCtxt.suspend();
		//new AudioBufferSourceNode(this.#audioCtxt, { buffer: this.#audioCtxt.createBuffer(1, 1, 22050) }).start();
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

		if (this.mediaManager)
			MediaSessionManager.updateBPM(value);

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
		void this.stop();
		// this.#audioCtxt.close();
	}

	// start / stop

	async stop()
	{
		window.clearInterval(this.#intervalID);
		this.#intervalID = -1;

		this.#nextNoteTime = 0;
		this.#noteIdx = 0;
		await this.#audioCtxt.suspend();

		void this.#wakeLock?.release(); // "void" to tell typescript we do not await the call on purpose
		this.#wakeLock = null;

		if (this.mediaManager)
			MediaSessionManager.stopSession();
		console.log("metronome stopped");
	}

	async start()
	{
		if (this.running)
			return;

		await this.#audioCtxt.resume();
		this.#nextNoteTime = this.#audioCtxt.currentTime;
		this.#noteIdx = 0;

		this.#scheduler();

		this.#intervalID = window.setInterval(this.#scheduler.bind(this), this.interval);

		navigator.wakeLock.request()
			.then((wakeLock) => this.#wakeLock = wakeLock)
			.catch((error: unknown) => { console.log(`ERROR: can't keep screen awake: '${error as Error}'`) });

		if (this.mediaManager)
			MediaSessionManager.startSession();
		console.log("metronome started");
	}

	// scheduler

	#playClick(time = 0)
	{
		if (!this.#audioBuffer)
			return;

		const audioSource = new AudioBufferSourceNode(this.#audioCtxt, { buffer: this.#audioBuffer });
		if (this.#noteIdx === 0)
			audioSource.playbackRate.value = 2;
		audioSource.connect(this.#audioCtxt.destination);
		audioSource.start(time);

		this.#noteIdx++;
		if (this.#noteIdx === this.systemTime)
			this.#noteIdx = 0;
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

	// media functions
	function start()
	{
		setPlaying(true);
		if (metronome.current)
		{
			metronome.current.tempo = instrCtxt.instrument.tempo;
			void metronome.current.start();
		}
	}
	function stop()
	{
		setPlaying(false);
		void metronome.current?.stop();
	}
	function changeTempo(tempo: number)
	{
		instrCtxt.setInstrument({
			...instrCtxt.instrument,
			tempo: tempo
		});
		if (metronome.current)
			metronome.current.tempo = tempo;
	}

	// handlers
	async function clickHandler(event: React.MouseEvent<HTMLButtonElement>)
	{
		event.preventDefault();

		if (!metronome.current)
		{
			metronome.current = new Metronome(INTERVAL, instrCtxt.instrument.tempo);
			const mediaManager = new MediaSessionManager(new MediaMetadata(METADATA), {
				"play": start,
				"pause": stop,
				"stop": stop,
				"seekbackward": () => { changeTempo(instrCtxt.instrument.tempo - 1); },
				"seekforward": () => { changeTempo(instrCtxt.instrument.tempo + 1); },
				"previoustrack": () => { changeTempo(instrCtxt.instrument.tempo - 10); },
				"nexttrack": () => { changeTempo(instrCtxt.instrument.tempo + 10); }
			});
			MediaSessionManager.updateBPM(instrCtxt.instrument.tempo);
			metronome.current.mediaManager = mediaManager;
			await metronome.current.init("/druminfected__metronome.mp3");
		}

		if (metronome.current.running) // stop
			stop();
		else // start
			start();
	}

	function changeHandlerTempo(event: ChangeEvent<HTMLInputElement>)
	{
		event.preventDefault();
		changeTempo(event.target.valueAsNumber);
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
