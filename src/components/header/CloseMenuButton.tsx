import { CloseIcon } from '@chakra-ui/icons';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';

export const CloseMenuButton = ({
    isMenuOpen,
    onClick,
}: {
    isMenuOpen: boolean;
    onClick?: () => void;
}) => {
    const [isLargerThanMD] = useBreakpoint('md');
    const isVisible = !isLargerThanMD && isMenuOpen;

    if (!isVisible) return null;
    return <CloseIcon data-test-id={DATA_TEST_IDS.CLOSE_ICON} onClick={onClick} />;
};
