import { Box, Flex } from '@chakra-ui/react';

import { categories } from '~/constants';

import { NavigationItem } from './NavigationItem';

export function Navigation() {
    return (
        <Flex
            direction='column'
            maxH='872px'
            //  boxShadow='themeNeutral'  ???:
            borderRadius='0 0 12px 12px'
        >
            <Box as='nav' overflowY='auto' flexGrow='1' p='10px 16px 0 10px'>
                <ul>
                    {categories.map((item) => (
                        <NavigationItem
                            key={item.title}
                            title={item.title}
                            iconSrc={item.iconSrc}
                            children={item.children}
                        />
                    ))}
                </ul>
            </Box>
        </Flex>
    );
}
