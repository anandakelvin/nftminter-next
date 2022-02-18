const nextSafe = require("next-safe");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: nextSafe({ isDev }),
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/eth-ropsten-network",
				permanent: false,
			},
		];
	},
	images: {
		domains: ["gateway.pinata.cloud"],
	},
	env: {
		CAPTCHA_SITE_KEY: "6LeHd0keAAAAABQXRs7EfpgL8sWlvAydGKMyTPr0",
	},
};
