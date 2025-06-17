import localFont from "next/font/local"
import styles from "./Header.module.css"

const fontChopin = localFont({ src: "../../../public/ChopinScript.ttf" });

export default function Header()
{
	return (
		<div className={styles.header}>
			<h1 className={fontChopin.className}>Générateur de Notes de Musique</h1>
		</div>
	);
}
