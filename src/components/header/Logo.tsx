import { Box, Image, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router';

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
                    src={
                        isLargerThanSM
                            ? '/src/assets/logo/logo.png'
                            : '/src/assets/logo/mobile_logo.png'
                    }
                    alt='logo'
                />
            </Link>
        </Box>
    );
};
