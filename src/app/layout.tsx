import type { Metadata } from "next";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Menu from "@components/Menu";
import "./globals.css";

export const metadata: Metadata = {
	title: "Générateur de notes de musiques",
	description: "Générateur de notes de musique pour entrainement débutant : apprendre à lire les notes et à les jouer",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>)
{
	return (
		<html lang="fr">
			<body>
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
