import { Box, Flex } from '@chakra-ui/react';

import { categories } from '~/mocks/categories';

import { NavigationItem } from './NavigationItem';

export function Navigation() {
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
            <Box as='nav' pl='10px' pt='10px'>
                <ul>
                    {categories.map((category) => (
                        <NavigationItem key={category.id} category={category} />
                    ))}
                </ul>
            </Box>
        </Flex>
    );
}
