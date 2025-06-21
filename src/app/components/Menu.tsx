import Link from "next/link";
import styles from "./Menu.module.css"

export default function Menu()
{
	return (
		<menu className={styles.menu}>
			<Link href="/"><span>♩</span>Générateur</Link>
			<Link href="/cordes"><span>♪</span>Cordes</Link>
			<Link href="/about"><span>♫</span>À propos</Link>
		</menu>
	);
}
