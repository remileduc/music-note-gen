import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true, // because of output export
		formats: ["image/avif", "image/webp"]
	}
};

export default nextConfig;
