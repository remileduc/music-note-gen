import { rsrcPath } from "@utils/global";

export default function About()
{
	return (
		<main>
			<iframe
				src={ rsrcPath("/README.html") }
				width="100%"
				height="1000"
				allow=""
				loading="lazy"
				referrerPolicy="no-referrer"
				sandbox=""
				style={{border: "none"}}
			>
			</iframe>
		</main>
	);
}
