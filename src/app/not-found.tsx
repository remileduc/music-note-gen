import Link from "next/link";

export default function NotFound()
{
	return (
		<main style={{
			textAlign: "center",
			padding: "2rem",
			display: "flex",
			flexDirection: "column",
			gap: "40px"
		}}>
			<h1>𝅘𝅥𝅲 Fausse Note 𝅘𝅥𝅲</h1>
			<p>Could not find requested page</p>
			<Link href="/" style={{ textDecoration: "underline" }}>Return Home</Link>
		</main>
	);
}
