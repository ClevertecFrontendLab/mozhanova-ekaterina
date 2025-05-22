import { HamburgerIcon } from '@chakra-ui/icons/Hamburger';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';

export const HamburgerButton = ({
    onClick,
    isMenuOpen,
}: {
    onClick?: () => void;
    isMenuOpen: boolean;
}) => {
    const [isLargerThanMD] = useBreakpoint('md');

    if (isMenuOpen && !isLargerThanMD) return null;

    return (
        <HamburgerIcon
            display={!isLargerThanMD ? 'block' : 'none'}
            w={6}
            h={6}
            onClick={onClick}
            data-test-id={DATA_TEST_IDS.HAMBURGER_ICON}
        />
    );
};
