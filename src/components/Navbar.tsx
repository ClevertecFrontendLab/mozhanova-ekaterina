import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import { useBodyScrollLock } from '~/hooks/use-scroll';
import { useGetCategoriesQuery } from '~/query/category-api';

import { Footer } from './footer/Footer';
import { Navigation } from './nav/Navigation';

export const Navbar = ({
    isMenuOpen,
    setMenuOpen,
}: {
    isMenuOpen: boolean;
    setMenuOpen: (value: boolean) => void;
}) => {
    const [isLargerThanMD] = useMediaQuery('(min-width: 1001px)', { ssr: false });
    useBodyScrollLock(isMenuOpen && !isLargerThanMD);
    const { data } = useGetCategoriesQuery();
    const categories = Array.isArray(data) && data.filter((category) => category.subCategories);

    return (
        <>
            {!isLargerThanMD && (
                <Box
                    pb='185px'
                    display={isMenuOpen ? 'block' : 'none'}
                    zIndex={2001}
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
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {isMenuOpen && (
                <Flex
                    pb='185px'
                    data-test-id='nav'
                    display={isMenuOpen ? 'flex' : 'none'}
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
                    zIndex={2001}
                    borderRadius={{
                        base: '0 0 12px 12px',
                        md: 0,
                    }}
                >
                    <Navigation categories={categories || []} setMenuOpen={setMenuOpen} />
                    {isLargerThanMD && <Footer />}
                </Flex>
            )}
        </>
    );
};
