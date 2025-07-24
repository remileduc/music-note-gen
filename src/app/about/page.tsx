import type { Metadata } from "next";
import { rsrcPath } from "@utils/global";

export const metadata: Metadata = {
	title: "Aide"
};

export default function About()
{
	return (
		<main>
			<iframe
				src={ rsrcPath("/README.html") }
				height="1200"
				allow=""
				loading="lazy"
				referrerPolicy="no-referrer"
				sandbox="allow-same-origin"
				title="README"
				style={{border: "none", height: "1200px", width: "100%"}}
			/>
		</main>
	);
}
