import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        // Основные цвета бренда
        primary: {
            50: '#eaffc7', // Самый светлый
            100: '#d7ff94',
            200: '#c4ff61',
            300: '#b1ff2e',
            400: '#2db100', // Основной цвет
            500: '#249600',
            600: '#1b7a00',
            700: '#134b00', // Самый темный
        },

        // Второстепенные/акцентные цвета
        secondary: {
            50: '#fffff5',
            100: '#ffffd3', // Header BG
            200: '#fff9a5',
            300: '#fff277',
            400: '#ffeb49',
            500: '#ffe41b', // Яркий акцент
        },

        // Нейтральные цвета
        neutral: {
            0: '#FFFFFF', // Чистый белый
            50: 'rgba(0, 0, 0, 0.08)', // Border light
            100: 'rgba(0, 0, 0, 0.24)',
            200: 'rgba(0, 0, 0, 0.48)', // Border dark
            300: 'rgba(0, 0, 0, 0.64)', // Text light
            400: '#000000', // Чистый черный
        },
        text: {
            primary: 'neutral.400',
            secondary: 'neutral.300',
            inverted: 'neutral.0',
        },
        border: {
            light: 'neutral.50',
            dark: 'neutral.200',
        },
        background: {
            header: '#ffffd3',
            base: '#FFFFFF',
        },
    },
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
    shadows: {
        themeAccent: '0px 0px 35px var(--chakra-colors-primary-300)',
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
    components: {
        Tabs: {
            variants: {
                line: {
                    tab: {
                        color: 'primary.700',
                        _selected: {
                            color: 'primary.400',
                            fontWeight: '500',
                        },
                    },
                    tabpanel: {
                        p: '0',
                    },
                },
            },
        },
    },
});

export default theme;
