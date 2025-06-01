import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import { useBreakpoint } from '~/hooks/use-breakpoint';

import { FooterMobile } from '../footer/FooterMobile';
import { Header } from '../header/Header';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';

export const MainLayout = () => {
    const [isLargerThanMD] = useBreakpoint('md');
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => setMenuOpen(isLargerThanMD), [isLargerThanMD]);

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
            <Header isMenuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            <Navbar isMenuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            <Outlet />
            {isLargerThanMD ? (
                <Box
                    bg='background.base'
                    position='fixed'
                    right='0'
                    bottom='0'
                    top='80px'
                    w='256px'
                >
                    <Sidebar />
                </Box>
            ) : null}

            {!isLargerThanMD && <FooterMobile />}
        </Box>
    );
};
