import GeneratedPartition from "@components/GeneratedPartition";
import GeneratorInstrumentProvider from "@components/settings/GeneratorInstrument";
import GeneratorSettingsProvider from "@components/settings/GeneratorSettings";
import InstrumentEditor from "@components/settings/InstrumentEditor";
import SettingsEditor from "@components/settings/SettingsEditor";

export default function Home()
{
	return (
		<main>
			<GeneratorInstrumentProvider>
				<InstrumentEditor />
				<GeneratorSettingsProvider>
					<SettingsEditor />
					<GeneratedPartition />
				</GeneratorSettingsProvider>
			</GeneratorInstrumentProvider>
		</main>
	);
}
