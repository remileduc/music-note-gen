import type { Metadata } from "next";
import GeneratorInstrumentProvider from "@components/settings/GeneratorInstrument";
import GeneratorSettingsProvider from "@components/settings/GeneratorSettings";
import InstrumentEditor from "@components/settings/InstrumentEditor";
import CordesContent from "./CordesContent";

export const metadata: Metadata = {
	title: "Cordes"
};

export default function Cordes()
{
	return (
		<main>
			<GeneratorSettingsProvider>
				<GeneratorInstrumentProvider>
					<InstrumentEditor />
					<CordesContent />
				</GeneratorInstrumentProvider>
			</GeneratorSettingsProvider>
		</main>
	);
}
