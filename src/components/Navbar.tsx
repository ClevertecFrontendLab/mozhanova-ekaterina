import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';

import { Footer } from './footer/Footer';
import { Navigation } from './nav/Navigation';

export function Navbar({
    mobileMenuOpen,
    setMobileMenuOpen,
}: {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (value: boolean) => void;
}) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)', { ssr: false });
    useBodyScrollLock(mobileMenuOpen && !isLargerThanMD);

    return (
        <>
            {!isLargerThanMD && (
                <Box
                    display={mobileMenuOpen ? 'block' : 'none'}
                    zIndex={99}
                    position='fixed'
                    top={0}
                    bottom={0}
                    left={0}
                    w='100vw'
                    h='100vh'
                    bg='rgba(0, 0, 0, 0.16)'
                    css={{
                        backdropFilter: 'blur(4px)',
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <Flex
                display={mobileMenuOpen ? 'flex' : 'none'}
                position={{
                    base: 'absolute',
                    md: 'fixed',
                }}
                right={{
                    base: 0,
                    md: 'unset',
                }}
                left={{
                    base: 'unset',
                    md: 0,
                }}
                bottom={{
                    base: 'unset',
                    md: 0,
                }}
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
                    base: 'fit-content',
                    md: 'auto',
                }}
                maxH={{ base: 'calc(100vh - 64px - 84px)', md: 'unset' }}
                pt={{
                    base: 4,
                    md: 6,
                }}
                bg='background.base'
                zIndex={100}
                borderRadius={{
                    base: '0 0 12px 12px',
                    md: 0,
                }}
            >
                <Navigation />
                {isLargerThanMD && <Footer />}
            </Flex>
        </>
    );
}
