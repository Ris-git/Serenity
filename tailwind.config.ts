/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['var(--font-display)', 'Georgia', 'serif'],
                body: ['var(--font-body)', 'system-ui', 'sans-serif'],
            },
            colors: {
                sage: {
                    DEFAULT: '#8B9D83',
                    light: '#A8B5A1',
                    dark: '#7A8C73',
                    50: 'rgba(139,157,131,0.05)',
                    100: 'rgba(139,157,131,0.1)',
                    200: 'rgba(139,157,131,0.2)',
                },
                cream: {
                    DEFAULT: '#FAF8F5',
                    dark: '#F5F3EF',
                },
                clay: {
                    DEFAULT: '#D4C4B0',
                    dark: '#C8B8A0',
                },
                lavender: {
                    DEFAULT: '#C9C5E0',
                    dark: '#B8B4D0',
                },
                charcoal: {
                    DEFAULT: '#4A4A48',
                    dark: '#3C3C3A',
                },
                'soft-gray': '#8F8F8D',
            },
            borderRadius: {
                card: '12px',
                btn: '8px',
                modal: '16px',
            },
            boxShadow: {
                card: '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                'card-hover': '0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                'btn': '0 1px 3px rgba(139,157,131,0.3)',
            },
            animation: {
                'fade-up': 'fadeUp 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) both',
                'fade-in': 'fadeIn 0.4s ease both',
            },
            keyframes: {
                fadeUp: {
                    from: { opacity: '0', transform: 'translateY(8px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
