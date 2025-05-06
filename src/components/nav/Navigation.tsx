import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import { useGetCategoriesQuery } from '~/query/category-api';

import { Footer } from '../footer/Footer';
import { Breadcrumbs } from '../header/Breadcrumbs';
import { NavigationItem } from './NavigationItem';

export function Navigation({ setMenuOpen }: { setMenuOpen: (value: boolean) => void }) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)', { ssr: false });
    const { data, isLoading, isError } = useGetCategoriesQuery();
    const categories = data?.filter((category) => category.subCategories) || [];

    if (isError || isLoading) return null;
    return (
        <Flex
            direction='column'
            grow='1'
            boxShadow={{
                base: 'unset',
                md: 'themeNeutral',
            }}
            borderRadius='0 0 12px 12px'
            overflowY='auto'
            overflowX='hidden'
            sx={{
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                '@media (min-width: 769px)': {
                    '&::-webkit-scrollbar': {
                        display: 'block',
                    },
                },
            }}
            gap={3}
        >
            {!isLargerThanMD && <Breadcrumbs setMenuOpen={setMenuOpen} />}
            <Box as='nav' pl='10px' pt='10px'>
                <ul>
                    {categories?.map((category) => (
                        <NavigationItem
                            data-id={category._id}
                            setMenuOpen={setMenuOpen}
                            key={category._id}
                            category={category}
                        />
                    ))}
                </ul>
            </Box>
            {!isLargerThanMD && <Footer />}
        </Flex>
    );
}
