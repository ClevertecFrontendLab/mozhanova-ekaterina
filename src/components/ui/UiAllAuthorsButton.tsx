import { ArrowForwardIcon, ResponsiveValue } from '@chakra-ui/icons';

import { UiButton } from './UiButton';

export const UiAllAuthorsButton = ({
    size = 'lg',
    onClick,
}: {
    size?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg'>;
    onClick?: () => void;
}) => (
    <UiButton
        text='Все авторы'
        variant='primaryGhost'
        rightIcon={<ArrowForwardIcon />}
        size={size}
        onClick={onClick}
    />
);
