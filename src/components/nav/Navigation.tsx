import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import { categories } from '~/mocks/categories';

import { Footer } from '../footer/Footer';
import { Breadcrumbs } from '../header/Breadcrumbs';
import { NavigationItem } from './NavigationItem';

export function Navigation() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)', { ssr: false });

    return (
        <Flex
            data-test-id='nav'
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
            {!isLargerThanMD && <Breadcrumbs />}
            <Box as='nav' pl='10px' pt='10px'>
                <ul>
                    {categories.map((category) => (
                        <NavigationItem key={category.id} category={category} />
                    ))}
                </ul>
            </Box>
            {!isLargerThanMD && <Footer />}
        </Flex>
    );
}
