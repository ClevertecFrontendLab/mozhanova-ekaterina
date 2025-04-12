import { Box, Flex } from '@chakra-ui/react';

import { categories } from '~/constants';

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
            w='256px'
        >
            <Box as='nav' pl='10px' pt='10px'>
                <ul>
                    {categories.map((item) => (
                        <NavigationItem
                            key={item.id}
                            title={item.label}
                            iconSrc={item.iconSrc}
                            subCategories={item.subCategories}
                        />
                    ))}
                </ul>
            </Box>
        </Flex>
    );
}
