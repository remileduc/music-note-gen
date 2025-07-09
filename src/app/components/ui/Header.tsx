import Link from "next/link";
import localFont from "next/font/local"
import styles from "./Header.module.css"

const fontChopin = localFont({ src: "./ChopinScript.ttf" });

export default function Header()
{
	return (
		<header className={styles.header}>
			<h1 className={fontChopin.className}><Link href="/">Générateur de Notes de Musique</Link></h1>
		</header>
	);
}
