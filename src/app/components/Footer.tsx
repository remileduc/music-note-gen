import Image from "next/image";
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
					src="/remileduc.png"
					alt="remileduc"
					width={16}
					height={16}
				/>
				Created by remileduc
			</a>
			<a
				href="https://opensource.org/license/mit"
				target="_blank"
				rel="noopener noreferrer"
				>
				<Image
					aria-hidden
					src="/Open_Source_Initiative.svg"
					alt="Open Source Initiative icon"
					width={16}
					height={16}
				/>
				Under the MIT License
			</a>
			<a
				href="https://github.com/remileduc/music-note-gen"
				target="_blank"
				rel="noopener noreferrer"
				>
				<Image
					aria-hidden
					src="/github.svg"
					alt="Github logo"
					width={16}
					height={16}
				/>
				See the code
			</a>
		</footer>
	);
}
