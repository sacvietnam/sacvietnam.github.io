/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: 16,
		},
		fontFamily: {
			sans: ["Overpass Variable", "sans-serif"],
		},
		extend: {
			fontFamily: {
				display: "Sigmar One, sans-serif",
				displayText: "Srisakdi, sans-serif",
				handwriting: "Twinkle Star, sans-serif",
				normal: "Overpass Variable, sans-serif",
			},
			colors: {
				text: "#333333",
				primary: "#1D8DFD",
				light_primary: "#56A9F4",
				secondary: "#848484",
			},
		},
	},
	plugins: [],
};
