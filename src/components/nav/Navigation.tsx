import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import { categories } from '~/mocks/categories';

import { Breadcrumbs } from '../header/Breadcrumbs';
import { NavigationItem } from './NavigationItem';

export function Navigation() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

    return (
        <Flex
            direction='column'
            grow='1'
            boxShadow='themeNeutral'
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
        >
            {!isLargerThanMD && <Breadcrumbs />}

            <Box
                as='nav'
                pl='10px'
                pt='10px'
                mt={{
                    base: 5,
                    md: 'unset',
                }}
            >
                <ul>
                    {categories.map((category) => (
                        <NavigationItem key={category.id} category={category} />
                    ))}
                </ul>
            </Box>
        </Flex>
    );
}
