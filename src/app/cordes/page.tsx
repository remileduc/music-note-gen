import AllKeysForString from "@components/AllKeysForString";
import { violin } from "@utils/strings";

export default function Cordes()
{
	return (
		<main>
			{Object.entries(violin).map(([stringName, stringNotes]) =>
				<AllKeysForString key={stringName} title={stringName} stringNotes={stringNotes} />
			)}
		</main>
	);
}
