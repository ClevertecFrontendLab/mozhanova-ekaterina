import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Footer } from '../Footer';
import { FooterMobile } from '../FooterMobile';
import { Header } from '../Header';
import { Navigation } from '../nav/Navigation';
import { Sidebar } from '../Sidebar';

export function MainLayout() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 768px)');

    return (
        <Flex overflow='hidden'>
            <Header />
            <Flex w='100vw'>
                {isLargerThanMD && (
                    <Flex
                        direction='column'
                        mt='80px'
                        basis='256px'
                        h='calc(100vh - 80px)'
                        pt='24px'
                    >
                        <Navigation />
                        <Footer />
                    </Flex>
                )}
                <Box
                    as='main'
                    overflow='auto'
                    maxH='calc(100vh - 80px)'
                    mt={{
                        base: '64px',
                        lg: '80px',
                    }}
                    mb={{
                        base: '84px',
                        lg: '0',
                    }}
                    padding={{
                        base: '0 16px',
                        md: '0 20px',
                        lg: '0 24px',
                    }}
                    flexGrow='1'
                >
                    <Outlet />
                </Box>
                {isLargerThanMD ? (
                    <Box mt='80px' height='calc(100vh - 80px)' flexBasis='256px'>
                        <Sidebar />
                    </Box>
                ) : null}
            </Flex>
            {!isLargerThanMD && <FooterMobile />}
        </Flex>
    );
}
