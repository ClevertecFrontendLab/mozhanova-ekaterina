import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router';

import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { setSearchString } from '~/store/recipe-slice';

export function Home() {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(setSearchString(''));
        }
    }, [dispatch, location.pathname]);

    return (
        <Box>
            <SearchBar title='Приятного аппетита!' />

            <Flex
                direction='column'
                gap={{
                    base: '32px',
                    lg: '40px',
                }}
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Outlet />
            </Flex>
        </Box>
    );
}
