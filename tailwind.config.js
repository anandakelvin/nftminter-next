module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				cultured: "#f7f7f7",
				darkCharcoal: "#333333",
				darkGunmetal: "#202426",
				spanishGray: "#999999",
				linen: "#FDF0E5",
				brightTurqoise: "#07E9D1",
				brightGray: "#EDEDED",
				violetsAreBlue: "#814EFA",
			},
			borderWidth: {
				10: "10px",
				11: "11px",
				12: "12px",
			},
		},
	},
	plugins: [],
};
