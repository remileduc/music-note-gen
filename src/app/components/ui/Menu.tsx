import Link from "next/link";
import styles from "./Menu.module.css";

export default function Menu()
{
	return (
		<menu className={styles.menu}>
			<li><Link href="/"><span>♩</span>Générateur</Link></li>
			<li><Link href="/cordes"><span>♪</span>Cordes</Link></li>
			<li><Link href="/about"><span>♫</span>À propos</Link></li>
		</menu>
	);
}
