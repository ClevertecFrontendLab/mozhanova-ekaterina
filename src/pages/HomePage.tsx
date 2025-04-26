import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { PageToolbar } from '~/components/shared/PageToolbar/PageToolbar';

export function Home() {
    return (
        <Box>
            <PageToolbar title='Приятного аппетита!' />

            <Flex
                direction='column'
                gap={{
                    base: '32px',
                    lg: '40px',
                }}
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Outlet />
            </Flex>
        </Box>
    );
}
