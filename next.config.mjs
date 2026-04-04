import { readFileSync } from "node:fs";

const packageJson = JSON.parse(
	readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);
const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = `
	default-src 'self';
	script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDevelopment ? " 'unsafe-eval'" : ""};
	style-src 'self' 'unsafe-inline';
	img-src 'self' data: blob:;
	font-src 'self';
	connect-src 'self'${isDevelopment ? " ws: wss:" : ""};
	media-src 'self' blob:;
	object-src 'none';
	base-uri 'self';
	form-action 'self';
	frame-ancestors 'none';
	upgrade-insecure-requests;
`
	.replace(/\s{2,}/g, " ")
	.trim();

const securityHeaders = [
	{
		key: "Content-Security-Policy",
		value: contentSecurityPolicy,
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	{
		key: "Permissions-Policy",
		value: "camera=(self), geolocation=(), microphone=()",
	},
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		APP_VERSION: packageJson.version,
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: securityHeaders,
			},
		];
	},
};

export default nextConfig;
