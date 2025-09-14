import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/styles/**/*.{ts,tsx,css}"
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f3f6ff',
  				'100': '#e7edff',
  				'200': '#cddaff',
  				'300': '#a5bbff',
  				'400': '#7f9dff',
  				'500': '#5f82ff',
  				'600': '#4a66db',
  				'700': '#3b50b0',
  				'800': '#32458c',
  				'900': '#2c3c73',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			lavender: {
  				'50': '#faf7ff',
  				'100': '#f2ecff',
  				'200': '#e3d7ff',
  				'300': '#c7afff',
  				'400': '#a582ff',
  				'500': '#8a5cff',
  				'600': '#6e3fe3',
  				'700': '#5a32ba',
  				'800': '#4a2a97',
  				'900': '#3f257d'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		container: {
  			center: true,
  			padding: '1rem',
  			screens: {
  				'2xl': '1280px'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			xl: '16px',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
