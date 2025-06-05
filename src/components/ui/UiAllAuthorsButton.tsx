import { ArrowForwardIcon, ResponsiveValue } from '@chakra-ui/icons';
import { Link } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';

import { UiButton } from './UiButton';

export const UiAllAuthorsButton = ({
    size = 'lg',
}: {
    size?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg'>;
}) => (
    <Link to={AppRoutes.BLOGS}>
        <UiButton
            text='Все авторы'
            variant='primaryGhost'
            rightIcon={<ArrowForwardIcon />}
            size={size}
        />
    </Link>
);
