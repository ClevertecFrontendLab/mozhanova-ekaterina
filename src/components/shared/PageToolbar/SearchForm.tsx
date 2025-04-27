import {
    Box,
    Button,
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
import { selectFilteredRecipes } from '~/store/selectors';

export function SearchForm({
    setSearchOnFocus,
    onOpen,
}: {
    setSearchOnFocus: (value: boolean) => void;
    onOpen: () => void;
}) {
    const filters = useSelector((state: { recipe: RecipesState }) => state.recipe.filters);
    const filteredRecipes = useSelector(selectFilteredRecipes);
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSearch = () => {
        if (value.trim().length >= 3) {
            setErrorMessage('');
            dispatch(setSearchQuery(value));
            navigate('/search');
        } else {
            setIsError(true);
            setErrorMessage('Введите не менее 3-ёх символов');
        }
    };

    const handleClear = () => {
        dispatch(setSearchQuery(''));
        setIsError(false);
        setIsSuccess(false);
        setErrorMessage('');
    };

    useEffect(() => {
        if (value.trim().length >= 3) {
            setIsError(false);
            setErrorMessage('');
        }
    }, [value]);

    useEffect(() => {
        setValue(filters.searchQuery);
    }, [filters.searchQuery]);

    useEffect(() => {
        if (filteredRecipes.length === 0 && value.trim().length >= 3) {
            setIsError(true);
            setIsSuccess(false);
        } else if (filteredRecipes.length > 0 && value.trim().length >= 3) {
            setIsError(false);
            setIsSuccess(true);
        } else {
            setIsError(false);
            setIsSuccess(false);
        }
    }, [filteredRecipes, value]);

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
                data-test-id='filter-button'
            />
            <FormControl isInvalid={!!errorMessage}>
                <Box
                    position='relative'
                    w={{
                        base: '284px',
                        sm: '404px',
                        md: '458px',
                    }}
                >
                    <Input
                        pr={0}
                        data-test-id='search-input'
                        onKeyDown={(e) => !errorMessage && e.key === 'Enter' && handleSearch()}
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
                        borderColor={
                            isError ? 'error.400' : isSuccess ? 'primary.400' : 'border.dark'
                        }
                    />
                    <Flex alignItems='center' position='absolute' right='0' top='0' bottom='0'>
                        <Button
                            bg='transparent'
                            onClick={handleClear}
                            _hover={{ bg: 'transparent', color: 'text.primary' }}
                            p={0}
                        >
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
                        </Button>
                        <Button
                            onClick={handleSearch}
                            bg='transparent'
                            p={0}
                            data-test-id='search-button'
                            pointerEvents={value.length < 3 ? 'none' : 'auto'}
                            _hover={{ bg: 'transparent' }}
                        >
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
                        </Button>
                    </Flex>
                </Box>
                {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
            </FormControl>
        </Flex>
    );
}
