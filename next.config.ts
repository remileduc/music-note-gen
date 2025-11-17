import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	basePath: process.env.NEXT_PUBLIC_BASEPATH,
	reactCompiler: true,
	images: {
		unoptimized: true, // because of output export
		formats: ["image/avif", "image/webp"]
	},
	experimental: {
		turbopackFileSystemCacheForDev: true
	}
};

export default nextConfig;
