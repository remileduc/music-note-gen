import type { Metadata, Viewport } from "next";
import Footer from "@components/ui/Footer";
import Header from "@components/ui/Header";
import Menu from "@components/ui/Menu";
import ServiceWorkerRegister from "@components/ServiceWorkerRegister";
import manifest from "./manifest"
import "./globals.css";

const manif = manifest();

export const metadata: Metadata = {
	metadataBase: process.env.NODE_ENV === "production" ? new URL("https://remileduc.github.io") : null,
	title: {
		template: "%s | " + manif.name!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
		default: manif.name! // eslint-disable-line @typescript-eslint/no-non-null-assertion
	},
	description: manif.description,
	applicationName: manif.short_name,
	keywords: manif.categories,
	authors: [ { name: "remileduc", url: "https://github.com/remileduc/" } ],
	creator: "remileduc",
	openGraph: {
		type: "website",
		url: "https://remileduc.github.io/music-note-gen/",
		title: manif.name,
		description: manif.description,
		siteName: manif.short_name,
	}
};

export const viewport: Viewport = {
  themeColor: manif.theme_color
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>)
{
	return (
		<html lang="fr">
			<body>
				<ServiceWorkerRegister />

				<Header />

				<div className="content">
					<Menu />

					<div className="page">
						{children}
					</div>
				</div>

				<Footer />
			</body>
		</html>
	);
}
