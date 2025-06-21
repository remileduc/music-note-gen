import GeneratedPartition from "@components/GeneratedPartition";
import { GeneratorSettingsProvider } from "@components/GeneratorSettings";

export default function Home()
{
	return (
		<main>
			<GeneratorSettingsProvider>
				{/* Settings */}
				{/* Generate button */}
				<GeneratedPartition />
			</GeneratorSettingsProvider>
		</main>
	);
}
