import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            400: '#2db100', // text primary-dark
            700: '#134b00', //  text primary-light
        },
        accent: {
            100: '#eaffc7', // accent light
            400: '#ffffd3', // header bg
            500: '#c4ff61', // accent bright
            600: '#b1ff2e', // accent bright
        },
        neutral: {
            50: '#fff', // basic bg
            100: 'rgba(0, 0, 0, 0.24)',
            200: 'rgba(0, 0, 0, 0.08)', // Border light
            300: 'rgba(0, 0, 0, 0.48)', // Border dark
            400: 'rgba(0, 0, 0, 0.64)', // text light
            900: '#000', // text dark
        },
    },
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
    shadows: {
        themeAccent: '0px 0px 35px var(--chakra-colors-accent-500)',
        themeNeutral: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        themeNeutralGreen:
            '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
    },
    sizes: {
        container: {
            sm: '360px',
            md: '768px',
            lg: '1440px',
            xl: '1920px',
        },
    },
});

export default theme;
