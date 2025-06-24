import { rsrcPath } from "@utils/global";

export default function About()
{
	return (
		<main>
			<object
				data={ rsrcPath("/README.html") }
				width="900"
				height="750"
			>
			</object>
		</main>
	);
}
