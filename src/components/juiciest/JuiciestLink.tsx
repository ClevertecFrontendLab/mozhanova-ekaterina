import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import { Link } from 'react-router';

import { useBreakpoint } from '~/hooks/use-breakpoint';

import { UiButton } from '../ui/UiButton';

const variants = {
    mobile: {
        size: 'md',
        'data-test-id': 'juiciest-link-mobile',
    },
    default: {
        size: 'lg',
        'data-test-id': 'juiciest-link',
    },
};

export const JuiciestLink = memo(({ variant = 'default' }: { variant?: keyof typeof variants }) => {
    const [isLargerThanMD] = useBreakpoint('md');

    const isVisible =
        (isLargerThanMD && variant === 'default') || (!isLargerThanMD && variant === 'mobile')
            ? true
            : false;

    return (
        <Box display={isVisible ? 'block' : 'none'} textAlign='center'>
            <Link data-test-id={variants[variant]['data-test-id']} to='/the-juiciest'>
                <UiButton
                    variant='primary'
                    rightIcon={<ArrowForwardIcon />}
                    text='Вся подборка'
                    size={variants[variant].size}
                />
            </Link>
        </Box>
    );
});
