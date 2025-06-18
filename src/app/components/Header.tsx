import Link from "next/link";
import localFont from "next/font/local"
import styles from "./Header.module.css"

const fontChopin = localFont({ src: "../../../public/ChopinScript.ttf" });

export default function Header()
{
	return (
		<div className={styles.header}>
			<h1 className={fontChopin.className}><Link href="/">Générateur de Notes de Musique</Link></h1>
		</div>
	);
}
