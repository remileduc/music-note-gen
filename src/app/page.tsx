import GeneratedPartition from "@components/GeneratedPartition";
import GeneratorInstrumentProvider from "@components/settings/GeneratorInstrument";
import GeneratorSettingsProvider from "@components/settings/GeneratorSettings";
import InstrumentEditor from "@components/settings/InstrumentEditor";
import SettingsEditor from "@components/settings/SettingsEditor";

export default function Home()
{
	return (
		<main>
			<GeneratorSettingsProvider>
				<GeneratorInstrumentProvider>
					<InstrumentEditor />
					<SettingsEditor />
					<GeneratedPartition />
				</GeneratorInstrumentProvider>
			</GeneratorSettingsProvider>
		</main>
	);
}
