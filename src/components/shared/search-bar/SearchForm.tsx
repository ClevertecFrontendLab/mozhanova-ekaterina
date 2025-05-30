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
} from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SortIcon } from '~/components/ui/icons/SortIcon';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useToast } from '~/hooks/use-toast';
import { setAllergensFilter, setSearchString } from '~/store/recipe-slice';
import { selectFilters } from '~/store/selectors';
import { Recipe } from '~/types';

import { SelectAllergens } from './SelectAllergens';

export const SearchForm = ({
    setSearchOnFocus,
    onOpen,
    data,
    isError,
    initiateSearch,
}: {
    setSearchOnFocus: (value: boolean) => void;
    onOpen: () => void;
    data: Recipe[] | undefined;
    isError: boolean;
    initiateSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const filters = useSelector(selectFilters);
    const [isLargerThanMD] = useBreakpoint('md');
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const { showError } = useToast();

    const isEmptyResult = Boolean(data && data.length === 0);
    const isValidInput = value.trim().length > 2;
    const showErrorBorder =
        ((!isValidInput && isSubmitted) || isEmptyResult) && location.pathname != '/';
    const showSuccessBorder = isValidInput && !isEmptyResult && !isError;

    const handleSearch = () => {
        setIsSubmitted(true);
        if (isValidInput || selectedAllergens.length > 0) {
            setErrorMessage('');
            dispatch(setSearchString(value.trim()));
            dispatch(setAllergensFilter(selectedAllergens));

            initiateSearch && initiateSearch(true);
        } else {
            setErrorMessage('Введите не менее 3-х символов');
        }
    };

    const handleClear = () => {
        setValue('');
        dispatch(setSearchString(''));
        setIsSubmitted(false);
    };

    useEffect(() => {
        if (isError)
            showError({
                title: 'Ошибка сервера',
                description: 'Попробуйте поискать снова попозже',
            });
    }, [isError, showError]);

    useEffect(() => {
        setValue(filters.searchString);
    }, [filters.searchString]);

    return (
        <>
            <Flex
                gap={3}
                mt={{
                    base: 4,
                    md: 8,
                }}
                justifyContent='center'
            >
                <IconButton
                    aria-label='Сортировка'
                    size={isLargerThanMD ? 'lg' : 'sm'}
                    borderColor='border.dark'
                    variant='outline'
                    icon={<SortIcon />}
                    onClick={onOpen}
                    data-test-id={DATA_TEST_IDS.FILTER_BUTTON}
                />
                <FormControl w='fit-content' isInvalid={!!errorMessage}>
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
                            data-test-id={DATA_TEST_IDS.SEARCH_INPUT}
                            onKeyDown={(e) => isValidInput && e.key === 'Enter' && handleSearch()}
                            onFocus={() => setSearchOnFocus(true)}
                            onBlur={() => setSearchOnFocus(false)}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            variant='search'
                            size={{
                                base: 'sm',
                                md: 'lg',
                            }}
                            placeholder='Название или ингредиент...'
                            borderColor={
                                showErrorBorder
                                    ? 'error.400'
                                    : showSuccessBorder
                                      ? 'primary.400'
                                      : 'border.dark'
                            }
                        />
                        <Flex alignItems='center' position='absolute' right='0' top='0' bottom='0'>
                            <Button
                                bg='transparent'
                                onClick={handleClear}
                                _hover={{ color: 'text.primary' }}
                                p={0}
                            >
                                <CloseIcon
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
                                data-test-id={DATA_TEST_IDS.SEARCH_BUTTON}
                                pointerEvents={
                                    value.length < 3 && selectedAllergens.length === 0
                                        ? 'none'
                                        : 'auto'
                                }
                                _hover={{ color: 'text.primary' }}
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
            {isLargerThanMD && (
                <SelectAllergens selected={selectedAllergens} setSelected={setSelectedAllergens} />
            )}
        </>
    );
};
