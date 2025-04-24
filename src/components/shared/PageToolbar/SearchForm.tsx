import {
    Box,
    CloseIcon,
    Flex,
    FormControl,
    FormErrorMessage,
    IconButton,
    Input,
    SearchIcon,
    useMediaQuery,
} from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { SortIcon } from '~/components/ui/icons/SortIcon';
import { RecipesState, setSearchQuery } from '~/store/recipe-slice';

export function SearchForm({
    setSearchOnFocus,
    onOpen,
}: {
    setSearchOnFocus: (value: boolean) => void;
    onOpen: () => void;
}) {
    const filters = useSelector((state: { recipe: RecipesState }) => state.recipe.filters);
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState(filters.searchQuery);
    const [isError, setIsError] = useState('');

    const handleSearch = () => {
        if (value.trim().length >= 3) {
            navigate('/search');
            setIsError('');
            dispatch(setSearchQuery(value));
        } else {
            setIsError('Введите не менее 3-ёх символов');
        }
    };

    const handleClear = () => {
        dispatch(setSearchQuery(''));
    };

    useEffect(() => {
        setValue(filters.searchQuery);
    }, [filters.searchQuery]);

    return (
        <Flex
            gap={3}
            mt={{
                base: 4,
                md: 8,
            }}
        >
            <IconButton
                aria-label='Сортировка'
                size={isLargerThanMD ? 'lg' : 'sm'}
                borderColor='border.dark'
                variant='outline'
                icon={<SortIcon />}
                onClick={onOpen}
            />
            <FormControl isInvalid={!!isError}>
                <Box
                    position='relative'
                    w={{
                        base: '284px',
                        sm: '404px',
                        md: '458px',
                    }}
                >
                    <Input
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        onFocus={() => setSearchOnFocus(true)}
                        onBlur={() => setSearchOnFocus(false)}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        variant='custom'
                        size={{
                            base: 'sm',
                            md: 'lg',
                        }}
                        placeholder='Название или ингредиент...'
                    />
                    <Flex
                        alignItems='center'
                        justifyContent='center'
                        position='absolute'
                        right={{ base: '9px', md: '16px' }}
                        top='0'
                        bottom='0'
                        gap={3}
                    >
                        <button onClick={handleClear}>
                            <CloseIcon
                                color='text.primary'
                                w={{
                                    base: '10px',
                                    md: '14px',
                                }}
                                h={{
                                    base: '10px',
                                    md: '14px',
                                }}
                            />
                        </button>
                        <button onClick={handleSearch}>
                            <SearchIcon
                                w={{
                                    base: '14px',
                                    md: '18px',
                                }}
                                h={{
                                    base: '14px',
                                    md: '18px',
                                }}
                            />
                        </button>
                    </Flex>
                </Box>
                {isError && <FormErrorMessage>{isError}</FormErrorMessage>}
            </FormControl>
        </Flex>
    );
}
