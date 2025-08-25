// tailwind.config.js
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary-200)',
                accent: 'var(--color-accent)',
                'dark-200': 'var(--color-dark-200)',
                // add more mappings as needed
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}
