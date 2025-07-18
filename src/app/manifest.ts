import { rsrcPath } from "@utils/global";
import type { MetadataRoute } from "next";

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest
{
	return {
		name: "Générateur de notes de musique",
		short_name: "Musique Note Gen",
		description: "Ce projet consiste à mettre à disposition un générateur de notes de musique pour entrainement débutant",
		lang: "fr",
		start_url: rsrcPath("/"),
		display: "standalone",
		orientation: "portrait-primary",
		background_color: "#e6f0ff",
		theme_color: "#602353",
		icons: [
			{
				src: rsrcPath("/violin.svg"),
				sizes: "any",
				type: "image/svg+xml",
			},
			{
				src: rsrcPath("/violin.256x256.png"),
				sizes: "256x256",
				type: "image/png",
			},
			{
				src: rsrcPath("/violin.512x512.png"),
				sizes: "512x512",
				type: "image/png",
			}
		],
	};
}
