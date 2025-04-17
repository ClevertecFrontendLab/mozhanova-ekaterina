import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';

import { Footer } from './Footer';
import { Navigation } from './nav/Navigation';

export function Navbar({
    mobileMenuOpen,
    setMobileMenuOpen,
}: {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (value: boolean) => void;
}) {
    useBodyScrollLock(mobileMenuOpen);
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)', { ssr: false });

    return (
        <>
            {!isLargerThanMD && (
                <Box
                    display={mobileMenuOpen ? 'block' : 'none'}
                    zIndex={50}
                    position='absolute'
                    top={0}
                    bottom={0}
                    left={0}
                    w='100vw'
                    h='100vh'
                    bg='neutral.200'
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <Flex
                display={mobileMenuOpen ? 'flex' : 'none'}
                position={{
                    base: 'absolute',
                    md: 'fixed',
                }}
                left={0}
                bottom={0}
                top={{
                    base: '64px',
                    md: '80px',
                }}
                direction='column'
                w={{
                    base: '344px',
                    md: '256px',
                }}
                h={{
                    base: 'calc(100vh - 64px)',
                    md: 'auto',
                }}
                pt={{
                    base: 4,
                    md: 6,
                }}
                bg='background.base'
                zIndex={100}
            >
                <Navigation />
                <Footer />
            </Flex>
        </>
    );
}
