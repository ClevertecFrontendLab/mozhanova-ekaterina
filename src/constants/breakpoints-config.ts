export const BREAKPOINTS_VALUES = {
    sm: 768,
    md: 1300,
    lg: 1850,
    xl: 1920,
} as const;

export const BREAKPOINTS = {
    sm: `(min-width: ${BREAKPOINTS_VALUES.sm}px)`,
    md: `(min-width: ${BREAKPOINTS_VALUES.md}px)`,
    lg: `(min-width: ${BREAKPOINTS_VALUES.lg}px)`,
} as const;
