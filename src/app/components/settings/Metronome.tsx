"use client";

import { type ChangeEvent, useContext, useRef, useState } from "react";
import { rsrcPath } from "@utils/global";
import { InstrumentContext } from "./GeneratorInstrument";
import styles from "./Metronome.module.css"

class Timer
{
	callback: () => void;
	#tempo = 75;
	#intervalID = -1;

	constructor(bpm: number, callback: () => void)
	{
		this.#tempo = bpm;
		this.callback = callback;
	}

	set tempo(bpm: number)
	{
		this.#tempo = bpm;
		if (this.running)
		{
			this.stop();
			this.start();
		}
	}
	get tempo()
	{
		return this.#tempo;
	}

	get running()
	{
		return this.#intervalID > 0;
	}

	stop()
	{
		window.clearInterval(this.#intervalID);
		this.#intervalID = -1;
		console.log("metronome stopped");
	}

	start()
	{
		this.#intervalID = window.setInterval(this.callback, 60000 / this.#tempo);
		this.callback();
		console.log("metronome started");
	}
}

export default function Metronome()
{
	const instrCtxt = useContext(InstrumentContext);
	const [isPlaying, setPlaying] = useState(false);
	const tempoBtn = useRef<null | HTMLButtonElement>(null);
	const audioElt = useRef<null | HTMLAudioElement>(null);
	const timer = useRef<null | Timer>(null);

	function clickHandler(event: React.MouseEvent<HTMLButtonElement>)
	{
		event.preventDefault();

		timer.current ??= new Timer(instrCtxt.instrument.tempo, playClick);

		if (timer.current.running) // stop
		{
			setPlaying(false);
			timer.current.stop();
		}
		else
		{
			setPlaying(true);
			timer.current.start();
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
			timer.current.tempo = event.target.valueAsNumber;
	}

	function playClick()
	{
		if (!audioElt.current)
			return;

		void audioElt.current.play(); // "void" to tell typescript we do not await the call on purpose
		audioElt.current.currentTime = 0;
	}

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
			<audio ref={audioElt} id="tempoAudioFile">
				<source src={rsrcPath("/druminfected__metronome.mp3")} type="audio/mpeg" />
			</audio>

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
