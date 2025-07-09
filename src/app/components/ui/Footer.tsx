import Image from "next/image";
import { rsrcPath } from "@utils/global";
import styles from "./Footer.module.css";

export default function Footer()
{
	return (
		<footer className={styles.footer}>
			<a
				href="https://github.com/remileduc"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					aria-hidden
					src={ rsrcPath("/remileduc.png") }
					alt="remileduc"
					width={16}
					height={16}
				/>
				Créé par remileduc
			</a>
			<a
				href="https://opensource.org/license/mit"
				target="_blank"
				rel="noopener noreferrer"
				>
				<Image
					aria-hidden
					src={ rsrcPath("/Open_Source_Initiative.svg") }
					alt="Open Source Initiative icon"
					width={16}
					height={16}
				/>
				Sous license MIT
			</a>
			<a
				href="https://github.com/remileduc/music-note-gen"
				target="_blank"
				rel="noopener noreferrer"
				>
				<Image
					aria-hidden
					src={ rsrcPath("/github.svg") }
					alt="Github logo"
					width={16}
					height={16}
				/>
				Voir le code source
			</a>
		</footer>
	);
}
