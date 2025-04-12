import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Footer } from '../Footer';
import { FooterMobile } from '../FooterMobile';
import { Header } from '../Header';
import { Navigation } from '../nav/Navigation';
import { Sidebar } from '../Sidebar';

export function MainLayout() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

    return (
        <Box
            pt={{
                base: '64px',
                md: '80px',
            }}
            pb={{
                base: '84px',
                md: '0',
            }}
            pl={{
                base: '0',
                md: '256px',
            }}
            pr={{
                base: '0',
                md: '256px',
            }}
        >
            <Header />

            {isLargerThanMD && (
                <Flex
                    direction='column'
                    w='256px'
                    pt='24px'
                    position='fixed'
                    top='80px'
                    left='0'
                    bottom='0'
                    bg='background.base'
                    zIndex={100}
                >
                    <Navigation />
                    <Footer />
                </Flex>
            )}

            <Box
                as='main'
                // overflow='auto'
                // maxH='calc(100vh - 80px)'

                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Outlet />
            </Box>

            {isLargerThanMD ? (
                <Box
                    bg='background.base'
                    position='fixed'
                    right='0'
                    bottom='0'
                    top='80px'
                    w='256px'
                    zIndex={100}
                >
                    <Sidebar />
                </Box>
            ) : null}

            {!isLargerThanMD && <FooterMobile />}
        </Box>
    );
}
