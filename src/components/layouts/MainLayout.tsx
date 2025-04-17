import { Box, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { FooterMobile } from '../FooterMobile';
import { Header } from '../header/Header';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';

export function MainLayout() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)', { ssr: false });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(isLargerThanMD);

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
            <Header isMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

            <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

            <Box
                as='main'
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
