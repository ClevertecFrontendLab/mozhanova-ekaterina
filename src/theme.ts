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
            0: '#FFFFFF',
            20: ' rgba(0, 0, 0, 0.06)',
            50: 'rgba(0, 0, 0, 0.08)', // Border light
            100: 'rgba(0, 0, 0, 0.24)',
            200: 'rgba(0, 0, 0, 0.48)', // Border dark
            300: 'rgba(0, 0, 0, 0.64)', // Text secondary
            350: 'rgba(0, 0, 0, 0.92)',
            400: '#000000', // Чистый черный
        },
        error: {
            400: 'rgb(229, 62, 62)',
        },
    },
    semanticTokens: {
        colors: {
            text: {
                primary: 'primary.400',
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
            error: {
                default: 'error.400',
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
        Textarea: {
            baseStyle: {
                fontSize: 'sm',
                borderWidth: '1px',
                color: 'text.secondary',
                borderColor: 'border.light',
                _placeholder: { color: 'text.secondary' },
            },
        },
        Toast: {
            baseStyle: {
                container: {
                    bottom: '80px !important',
                },
            },
        },
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
                list: {
                    flexWrap: 'wrap',
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
            baseStyle: {
                container: {
                    borderWidth: '1px',
                    borderColor: 'border.light',
                    transition: 'box-shadow 0.3s ease-in-out',
                    _hover: {
                        shadow: 'themeNeutralGreen',
                    },
                },
            },
        },
        Table: {
            variants: {
                striped: {
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
                            '&:nth-of-type(odd) td': {
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
                bordered: {
                    thead: {
                        tr: {
                            color: 'text.primary',
                            fontSize: '12px',
                        },
                        th: {
                            pt: 0,
                            pb: 2,
                            textTransform: 'unset',
                            '&:nth-of-type(1)': {
                                pl: 5,
                                w: '293px',
                            },
                            '&:nth-of-type(2)': {
                                px: 0,
                                w: '105px',
                                textAlign: 'center',
                            },
                            '&:nth-of-type(3)': {
                                w: '215px',
                                textAlign: 'center',
                                px: 0,
                            },
                            p: { base: 0 },
                        },
                    },
                    tbody: {
                        color: 'neutral.350',
                        fontSize: '14px',
                        tr: {
                            textTransform: 'lowercase',
                            px: 2,
                            // paddingInline: { base: 0 },
                        },
                        td: {
                            py: 2,
                            '&:nth-of-type(1)': {
                                // pr: 2,
                                paddingInlineEnd: { base: 0, sm: 3, md: 4 },
                                paddingInlineStart: 0,
                            },
                            '&:nth-of-type(2)': {
                                paddingInlineEnd: 0,
                                paddingInlineStart: 0,
                                // px: 2,
                            },
                            '&:nth-of-type(3)': {
                                // px: 2,
                                paddingInlineEnd: 0,
                                paddingInlineStart: { base: 3, md: 4 },
                            },
                            '&:nth-of-type(4)': {
                                // pl: 2,
                                paddingInlineEnd: 0,
                                paddingInlineStart: { base: 3, md: 4 },
                                cursor: 'pointer',
                            },
                        },
                    },
                    tfoot: {
                        tr: {},
                        th: {
                            color: 'text.secondary',
                        },
                    },
                },
            },
        },
        Switch: {
            baseStyle: {
                track: {
                    _checked: {
                        bg: 'primary.300',
                    },
                    _focus: {
                        boxShadow: 'none',
                    },
                },
            },
        },
        Checkbox: {
            variants: {
                select: {
                    container: {
                        w: '100%',
                    },
                    control: {
                        borderColor: 'primary.300',
                        borderWidth: '2px',
                        outline: 'none',
                        _checked: {
                            bg: 'primary.300',
                            borderColor: 'primary.300',
                        },
                        _focus: {
                            boxShadow: 'none',
                        },
                    },
                    icon: {
                        color: 'neutral.400',
                    },
                    label: {
                        fontSize: '14px',
                    },
                },
            },
        },
        Tag: {
            variants: {
                outline: {
                    container: {
                        borderColor: 'primary.300',
                        borderWidth: '1px',
                        shadow: 'none',
                    },
                    closeButton: {
                        color: 'primary.400',
                    },
                    label: {
                        color: 'primary.400',
                    },
                },
                cardBadge: {
                    container: {},
                    closeButton: {},
                    label: {
                        color: 'inherit',
                        fontSize: '14px',
                    },
                },
            },
        },
        Menu: {
            variants: {
                select: {
                    button: {},
                    list: {
                        p: 0,
                        border: 'none',
                        borderRadius: 'md',
                        boxShadow: 'md',
                        maxH: '424px',
                    },
                },
            },
        },
        Select: {
            variants: {
                select: {
                    field: {
                        borderWidth: '1px',
                        borderColor: 'border.light',
                        color: 'neutral.300',
                        _placeholder: {
                            color: 'neutral.300',
                            fontWeight: '400',
                        },
                        _focus: {
                            boxShadow: 'none',
                        },
                    },
                },
            },
        },
        Input: {
            baseStyle: {
                field: {
                    borderWidth: '1px',
                    _focus: {
                        boxShadow: 'none',
                    },
                },
                _placeholder: {
                    fontWeight: '400',
                },
            },
            sizes: {
                sm: {
                    field: {
                        borderRadius: '4px',
                    },
                },
                lg: {
                    field: {
                        borderRadius: '6px',
                    },
                },
            },
            variants: {
                search: {
                    field: {
                        borderColor: 'border.dark',
                        color: 'primary.700',
                        _placeholder: {
                            color: 'primary.700',
                        },
                    },
                },
                select: {
                    field: {
                        borderColor: 'border.light',
                        color: 'neutral.300',
                        _placeholder: {
                            color: 'primary.700',
                        },
                    },
                },
                login: {
                    field: {
                        borderColor: 'primary.100',
                        color: 'primary.700',
                        _placeholder: {
                            color: 'primary.700',
                        },
                    },
                },
                recipeForm: {
                    field: {
                        borderColor: 'primary.300',
                        _placeholder: {
                            color: 'neutral.300',
                        },
                        _focus: {
                            borderColor: 'primary.300',
                        },
                    },
                },
                tableInput: {
                    field: {
                        borderColor: 'primary.300',
                        _placeholder: {
                            color: 'text.secondary',
                        },
                        _focus: {
                            borderColor: 'primary.300',
                        },
                    },
                },
            },
        },
        Drawer: {
            sizes: {
                custom: {
                    dialog: { maxWidth: { base: '344px', sm: '463px' } },
                },
            },
            variants: {
                filter: {
                    overlay: {
                        zIndex: 50,
                    },
                    dialogContainer: {
                        zIndex: 50,
                    },
                    header: {
                        fontSize: '2xl',
                        p: { base: '16px 20px 16px 16px', md: 8 },
                    },
                    body: {
                        p: { base: 4, md: '0 32px' },
                    },
                    closeButton: {
                        bg: 'background.black',
                        borderRadius: '50%',
                        color: 'neutral.0',
                    },
                    footer: {
                        p: { base: '16px 20px 16px 16px', md: 8 },
                    },
                },
            },
        },
        Progress: {
            baseStyle: {
                track: {
                    position: 'relative',
                    bg: 'neutral.20',
                    width: 'full',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                },
                filledTrack: {
                    position: 'absolute',
                    left: 0,
                    transition: 'all 0.3s ease',
                    bg: `url(./images/progress_inner.svg)`,
                },
            },
        },
        Modal: {
            baseStyle: {
                overlay: {
                    zIndex: 30,
                },
                dialog: {
                    p: 8,
                    borderRadius: '16px',
                    textAlign: 'center',
                    zIndex: 30,
                },
                dialogContainer: {
                    zIndex: 30,
                },
                closeButton: {
                    borderRadius: '50%',
                    borderWidth: '2px',
                    borderColor: 'neutral.400',
                    _focus: {
                        boxShadow: 'none',
                    },
                },
                header: {
                    px: 0,
                    fontSize: '2xl',
                },
                body: {
                    px: 0,
                },
                footer: {
                    px: 0,
                    color: 'neutral.200',
                    fontSize: 'xs',
                    justifyContent: 'center',
                },
            },
        },
        Radio: {
            baseStyle: {
                control: {
                    _checked: {
                        bg: 'base.50',
                        boxShadow: 'none',
                        borderColor: 'primary.300',
                    },
                    _focus: {
                        boxShadow: 'none',
                        borderColor: 'primary.300',
                    },
                },
            },
        },
    },
    breakpoints: {
        base: '0px',
        sm: '768px',
        md: '1001px',
        lg: '1441px',
        xl: '1920px',
    },
});

export default theme;
