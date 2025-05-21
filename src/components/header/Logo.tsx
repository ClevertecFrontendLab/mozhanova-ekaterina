import { Box, Image, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router';

import logo from '~/assets/logo/logo.png';
import logo_mobile from '~/assets/logo/mobile_logo.png';

export const Logo = () => {
    const [isLargerThanSM] = useMediaQuery('(min-width: 361px)');

    return (
        <Box width='256px'>
            <Link to='/'>
                <Image
                    w={{
                        base: '32px',
                        sm: '135px',
                    }}
                    h='32px'
                    src={isLargerThanSM ? logo : logo_mobile}
                    alt='logo'
                />
            </Link>
        </Box>
    );
};
