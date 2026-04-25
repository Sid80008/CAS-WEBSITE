import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./SCREENS/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				/* Core brand colors mapped to HEX variables */
				"school-blue": "var(--school-blue)",
				"school-blue-light": "var(--school-blue-light)",
				"school-blue-dark": "var(--school-blue-dark)",
				"school-amber": "var(--school-amber)",
				"school-teal": "var(--school-teal)",
				"school-coral": "var(--school-coral)",
				"school-purple": "var(--school-purple)",
				"school-green": "var(--school-green)",
				
				/* Semantic UI colors */
				"text-primary": "var(--text-primary)",
				"text-secondary": "var(--text-secondary)",
				"text-tertiary": "var(--text-tertiary)",
				
				/* shadcn/ui defaults */
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			fontFamily: {
				sans: ["var(--font-sans)", "system-ui", "sans-serif"],
			},
			fontSize: {
				xs: ["var(--spacing-3)", "1.5"], /* 12px */
				sm: ["14px", "1.5"],
				base: ["16px", "1.6"],
				lg: ["18px", "1.6"],
				xl: ["20px", "1.4"],
				"2xl": ["24px", "1.2"],
				"3xl": ["30px", "1.2"],
			},
			borderRadius: {
				sm: "var(--radius-sm)",
				DEFAULT: "var(--radius-default)",
				lg: "var(--radius-lg)",
				xl: "var(--radius-xl)",
				full: "9999px",
			},
			spacing: {
				"1": "var(--spacing-1)",
				"2": "var(--spacing-2)",
				"3": "var(--spacing-3)",
				"4": "var(--spacing-4)",
				"6": "var(--spacing-6)",
				"8": "var(--spacing-8)",
				"12": "var(--spacing-12)",
				"16": "var(--spacing-16)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [tailwindAnimate],
} satisfies Config;


