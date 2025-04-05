import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Header } from '../Header';
import { Navigation } from '../nav/Navigation';
import { Sidebar } from '../Sidebar';

export function MainLayout() {
    return (
        <Flex width='100vw'>
            <Header />
            <Navigation />
            <Box
                as='main'
                margin='80px 200px 0 256px'
                padding='0 24px'
                flexFlow='1'
                minH='calc(100vh - 80px)'
            >
                <Outlet />
            </Box>
            <Sidebar />
        </Flex>
    );
}
