import { rsrcPath } from "@utils/global";
import type { MetadataRoute } from "next";

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest
{
	return {
		name: "Générateur de notes de musique",
		short_name: "Musique Note Gen",
		description: "Générateur de notes de musique pour entrainement pour débutants aux instruments à cordes.",
		categories: [ "musique", "violon", "guitare", "débutant" ],
		lang: "fr",
		dir: "ltr",
		start_url: rsrcPath("/"),
		display: "standalone",
		orientation: "portrait-primary",
		background_color: "#e6f0ff",
		theme_color: "#602353",
		shortcuts: [
			{
				name: "Générateur",
				url: rsrcPath("/")
			},
			{
				name: "Liste des cordes",
				short_name: "Cordes",
				url: rsrcPath("/cordes")
			},
			{
				name: "Aide",
				description: "Afficher le mode d'emploi",
				url: rsrcPath("/about")
			}
		],
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
		screenshots: [
			{
				src: rsrcPath("/opengraph-image.png"),
				label: "Home",
				type: "image/png",
				sizes: "251x247"
			}
		]
	};
}
