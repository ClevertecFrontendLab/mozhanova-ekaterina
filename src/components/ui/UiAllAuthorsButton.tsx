import { ArrowForwardIcon, ResponsiveValue } from '@chakra-ui/icons';

import { UiButton } from './UiButton';

type Props = {
    size: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg'>;
    text: string;
    dataTest: string;
    onClick: () => void;
};

export const UiAllAuthorsButton = ({
    size = 'lg',
    onClick,
    text = 'Всe авторы',
    dataTest,
}: Partial<Props>) => (
    <UiButton
        data-test-id={dataTest}
        text={text}
        variant='primaryGhost'
        rightIcon={<ArrowForwardIcon />}
        size={size}
        onClick={onClick}
    />
);
