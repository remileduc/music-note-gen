import AllKeysForString from "@components/AllKeysForString";
import { laStringNotes, miStringNotes, reStringNotes, solStringNotes } from "@utils/strings";

export default function Home()
{
	return (
		<main>
			<AllKeysForString title="Corde Sol" stringNotes={solStringNotes} />

			<AllKeysForString title="Corde Re" stringNotes={reStringNotes} />

			<AllKeysForString title="Corde La" stringNotes={laStringNotes} />

			<AllKeysForString title="Corde Mi" stringNotes={miStringNotes} />
		</main>
	);
}
