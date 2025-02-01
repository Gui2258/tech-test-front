import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1230px', // New custom breakpoint
            '2xl': '1536px',
        },
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                blue_plus: '#007fff',
                gray_placeholder: '#8a94a6',
            },
        },

        fontFamily: {
            roboto: ['var(--font-roboto)'],
        },
    },
    plugins: [],
};
export default config;
