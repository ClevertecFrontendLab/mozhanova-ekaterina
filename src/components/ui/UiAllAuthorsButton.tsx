import { ArrowForwardIcon, ResponsiveValue } from '@chakra-ui/icons';

import { UiButton } from './UiButton';

export const UiAllAuthorsButton = ({
    size = 'lg',
    onClick,
    text = 'Всe авторы',
    dataTest,
}: {
    size?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg'>;
    text?: string;
    dataTest?: string;
    onClick?: () => void;
}) => (
    <UiButton
        data-test-id={dataTest}
        text={text}
        variant='primaryGhost'
        rightIcon={<ArrowForwardIcon />}
        size={size}
        onClick={onClick}
    />
);
