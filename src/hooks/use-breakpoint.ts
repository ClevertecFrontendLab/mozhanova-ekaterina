import { useMediaQuery } from '@chakra-ui/react';

import { BREAKPOINTS } from '~/constants/breakpoints-config';

type BreakpointKey = keyof typeof BREAKPOINTS;

export const useBreakpoint = (key: BreakpointKey, options?: { ssr?: boolean }) =>
    useMediaQuery(BREAKPOINTS[key], {
        ssr: options?.ssr ?? false,
        fallback: false,
    });
