import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	basePath: process.env.NEXT_PUBLIC_BASEPATH,
	images: {
		unoptimized: true, // because of output export
		formats: ["image/avif", "image/webp"]
	}
};

export default nextConfig;
