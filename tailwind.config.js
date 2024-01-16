/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
		},
		fontFamily: {
			sans: ["Overpass Variable", "sans-serif"],
		},
		extend: {
			fontFamily: {
				display: "Bungee, sans-serif",
				display2: "Monoton, sans-serif",
				line: "Flow Rounded, sans-serif",
				handwriting: "Twinkle Star, sans-serif",
				normal: "Overpass Variable, sans-serif",
			},
			colors: {
				text: "#333333",
				primary: "#1D8DFD",
				light_primary: "#56A9F4",
				secondary: "#848484",
			},
			animation: {
				floatVertical: "upDown 3s ease alternate infinite",
			},
			keyframes: {
				upDown: {
					"0%": { transform: "translateY(0%)" },
					"50%": { transform: "translateY(-20%)" },
					"100%": { transform: "translateY(20%)" },
				},
				fadeIn: {
					from: {
						opacity: 0,
					},
					to: {
						opacity: 1,
					},
				},
			},
		},
	},
	plugins: [],
};
