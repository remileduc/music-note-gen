import styles from "./page.module.css";
import AllKeysForString from "@components/AllKeysForString";
import { solStringNotes } from "@utils/Strings";

export default function Home()
{
	return (
		<main className={styles.main}>
			<AllKeysForString stringNotes={solStringNotes} />
		</main>
	);
}
