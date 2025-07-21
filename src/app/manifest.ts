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
		display_override: [ "window-controls-overlay" ],
		orientation: "portrait-primary",
		background_color: "#e6f0ff",
		theme_color: "#602353",
		shortcuts: [
			{
				name: "Générateur",
				url: rsrcPath("/"),
				icons: [
					{
						src: rsrcPath("/violin.96x96.png"),
						sizes: "96x96",
						type: "image/png"
					}
				]
			},
			{
				name: "Liste des cordes",
				short_name: "Cordes",
				url: rsrcPath("/cordes"),
				icons: [
					{
						src: rsrcPath("/violin.96x96.png"),
						sizes: "96x96",
						type: "image/png"
					}
				]
			},
			{
				name: "Aide",
				description: "Afficher le mode d'emploi",
				url: rsrcPath("/about"),
				icons: [
					{
						src: rsrcPath("/violin.96x96.png"),
						sizes: "96x96",
						type: "image/png"
					}
				]
			}
		],
		icons: [
			{
				src: rsrcPath("/violin.svg"),
				sizes: "any",
				type: "image/svg+xml"
			},
			{
				src: rsrcPath("/violin.96x96.png"),
				sizes: "96x96",
				type: "image/png"
			},
			{
				src: rsrcPath("/violin.256x256.png"),
				sizes: "256x256",
				type: "image/png"
			},
			{
				src: rsrcPath("/violin.512x512.png"),
				sizes: "512x512",
				type: "image/png"
			}
		],
		screenshots: [
			{
				src: rsrcPath("/Screenshot-wide.jpg"),
				label: "wide screen",
				type: "image/jpeg",
				sizes: "1024x843",
				form_factor: "wide"
			},
			{
				src: rsrcPath("/Screenshot-phone.jpg"),
				label: "smartphone",
				type: "image/jpeg",
				sizes: "415x666"
			},
			{
				src: rsrcPath("/opengraph-image.png"),
				label: "opengraph share",
				type: "image/png",
				sizes: "251x247"
			}
		]
	};
}
