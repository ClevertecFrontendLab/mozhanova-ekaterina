import { Box, Flex } from '@chakra-ui/react';

import { useBreakpoint } from '~/hooks/use-breakpoint';
import { Category } from '~/types';

import { Footer } from '../footer/Footer';
import { Breadcrumbs } from '../header/Breadcrumbs';
import { NavigationItem } from './NavigationItem';

export const Navigation = ({
    setMenuOpen,
    categories,
}: {
    setMenuOpen: (value: boolean) => void;
    categories: Category[];
}) => {
    const [isLargerThanMD] = useBreakpoint('md');

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
            {!isLargerThanMD && <Breadcrumbs variant='mobile' setMenuOpen={setMenuOpen} />}
            <Box as='nav' pl='10px' pt='10px'>
                <ul>
                    {categories &&
                        Array.isArray(categories) &&
                        categories.map((category) => (
                            <NavigationItem
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
};
