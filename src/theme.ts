import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            '::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
            },
            '::-webkit-scrollbar-track': {
                background: 'rgba(0, 0, 0, 0.04);',
                borderRadius: '8px',
            },
            '::-webkit-scrollbar-thumb': {
                background: 'rgba(0, 0, 0, 0.16)',
                borderRadius: '8px',
                '&:hover': {
                    background: 'primary.300',
                },
            },
        },
    },
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
    },
    semanticTokens: {
        colors: {
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
                header: 'secondary.100',
                base: 'neutral.0',
                black: 'neutral.400',
            },
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
    components: {
        Breadcrumb: {
            baseStyle: {
                link: {
                    color: 'neutral.300',
                    _hover: {
                        textDecoration: 'none',
                        color: 'neutral.400',
                    },
                    '&[aria-current=page]': {
                        color: 'neutral.400',
                    },
                },
            },
        },
        Tabs: {
            variants: {
                line: {
                    tab: {
                        color: 'primary.700',
                        _selected: {
                            color: 'primary.400',
                            fontWeight: '500',
                            borderBottomWidth: '2px',
                            borderBottomColor: 'primary.400',
                        },
                    },
                    tabpanel: {
                        p: '0',
                    },
                    tablist: {
                        '::-webkit-scrollbar': {
                            display: 'none',
                        },
                    },
                },
            },
        },
        Card: {
            sizes: {
                lg: {
                    body: {
                        pl: 6,
                        pr: 6,
                        pb: 6,
                        pt: 5,
                    },
                    footer: {
                        pl: 6,
                        pr: 6,
                        pt: 0,
                        pb: 5,
                    },
                },
                md: {
                    body: {
                        p: 4,
                    },
                },
                sm: {
                    body: {
                        pl: 2,
                        pr: 2,
                        pb: 2,
                        pt: 2,
                    },
                    footer: {
                        pl: 2,
                        pr: 2,
                        pt: 0,
                        pb: 1,
                    },
                },
            },
        },
        Table: {
            variants: {
                custom: {
                    thead: {
                        tr: {
                            height: '56px',
                        },
                        th: {
                            pt: 0,
                            pb: 0,
                            color: 'primary.400',
                            '&:nth-of-type(2)': {
                                textAlign: 'right',
                            },
                        },
                    },
                    tbody: {
                        color: 'neutral.350',
                        fontSize: '14px',
                        tr: {
                            '&:nth-of-type(odd)': {
                                bg: 'neutral.20',
                            },
                            textTransform: 'lowercase',
                        },
                        td: {
                            '&:nth-of-type(2)': {
                                textAlign: 'right',
                            },
                            pt: 0,
                            pb: 0,
                        },
                    },
                },
            },
        },
    },
    breakpoints: {
        base: '0px',
        sm: '361px',
        md: '769px',
        lg: '1441px',
        xl: '1920px',
    },
});

export default theme;
