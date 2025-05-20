import { CloseIcon, useMediaQuery } from '@chakra-ui/icons';

export const CloseMenuButton = ({
    isMenuOpen,
    onClick,
}: {
    isMenuOpen: boolean;
    onClick?: () => void;
}) => {
    const [isLargerThanMD] = useMediaQuery('(min-width: 1001px)');
    const isVisible = !isLargerThanMD && isMenuOpen;

    if (!isVisible) return null;
    return <CloseIcon data-test-id='close-icon' onClick={onClick} />;
};
