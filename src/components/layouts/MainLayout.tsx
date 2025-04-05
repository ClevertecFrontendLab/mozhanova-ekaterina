import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { Navigation } from '../nav/Navigation';
import { Sidebar } from '../Sidebar';

export function MainLayout() {
    return (
        <Flex maxW='100vw' overflow='hidden'>
            <Header />
            <Flex>
                <Flex
                    justifyContent='space-between'
                    direction='column'
                    mt='80px'
                    basis='256px'
                    maxH='calc(100vh - 80px)'
                    height='calc(100vh - 80px)'
                    pt='24px'
                >
                    <Navigation />
                    <Footer />
                </Flex>
                <Box
                    as='main'
                    overflow='auto'
                    maxH='calc(100vh - 80px)'
                    mt='80px'
                    padding='0 24px'
                    flexBasis='1408px'
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
