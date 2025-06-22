import GeneratedPartition from "@components/GeneratedPartition";
import GeneratorSettingsProvider from "@components/GeneratorSettings";
import SettingsEditor from "@components/SettingsEditor";

export default function Home()
{
	return (
		<main>
			<GeneratorSettingsProvider>
				<SettingsEditor />
				{/* Generate button */}
				<GeneratedPartition />
			</GeneratorSettingsProvider>
		</main>
	);
}
