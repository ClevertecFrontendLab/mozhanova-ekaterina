import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { Navigation } from '../nav/Navigation';
import { Sidebar } from '../Sidebar';

export function MainLayout() {
    return (
        <Flex overflow='hidden'>
            <Header />
            <Flex w='100vw'>
                <Flex direction='column' mt='80px' basis='256px' h='calc(100vh - 80px)' pt='24px'>
                    <Navigation />
                    <Footer />
                </Flex>
                <Box
                    as='main'
                    overflow='auto'
                    maxH='calc(100vh - 80px)'
                    mt='80px'
                    padding='0 24px'
                    flexGrow='1'
                >
                    <Outlet />
                </Box>
                <Box mt='80px' height='calc(100vh - 80px)' flexBasis='256px'>
                    <Sidebar />
                </Box>
            </Flex>
        </Flex>
    );
}
