import { HamburgerIcon } from '@chakra-ui/icons/Hamburger';
import { useMediaQuery } from '@chakra-ui/react';

export const HamburgerButton = ({
    onClick,
    isMenuOpen,
}: {
    onClick?: () => void;
    isMenuOpen: boolean;
}) => {
    const [isLargerThanMD] = useMediaQuery('(min-width: 1001px)');

    if (isMenuOpen && !isLargerThanMD) return null;

    return (
        <HamburgerIcon
            display={!isLargerThanMD ? 'block' : 'none'}
            w={6}
            h={6}
            onClick={onClick}
            data-test-id='hamburger-icon'
        />
    );
};
