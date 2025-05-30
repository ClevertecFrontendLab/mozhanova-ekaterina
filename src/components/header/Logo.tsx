import { Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router';

import logo from '~/assets/logo/logo.png';
import logo_mobile from '~/assets/logo/mobile_logo.png';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';

export const Logo = () => {
    const [isLargerThanSM] = useBreakpoint('sm');

    return (
        <Box width='256px' data-test-id={DATA_TEST_IDS.HEADER_LOGO}>
            <Link to={AppRoutes.HOME}>
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
