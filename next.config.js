module.exports = {
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
