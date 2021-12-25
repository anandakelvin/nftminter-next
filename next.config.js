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
};
