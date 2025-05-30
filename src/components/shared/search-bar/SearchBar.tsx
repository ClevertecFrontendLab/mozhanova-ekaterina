import { Box, Flex, Heading, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import loader from '~/assets/ui/loader_bg.png';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useLazyRecipesSearch } from '~/store/hooks';

import { FiltersDrawer } from './FiltersDrawer';
import { SearchForm } from './SearchForm';

type Props = {
    title: string;
    description?: string;
};

export const SearchBar = ({ title, description }: Props) => {
    const [searchOnFocus, setSearchOnFocus] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const { data, isError, isFetching, runSearch } = useLazyRecipesSearch();
    const [isSearchInitiated, setIsSearchInitiated] = useState(false);

    useEffect(() => {
        if (isSearchInitiated) {
            runSearch();
            if (data) {
                navigate(AppRoutes.SEARCH);
                setIsSearchInitiated(false);
            }
        }
    }, [runSearch, isSearchInitiated, data, navigate]);

    return (
        <Flex
            shadow={
                searchOnFocus
                    ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : 'unset'
            }
            transition='box-shadow 0.3s ease-in-out'
            borderRadius={{ base: '0 0 8px 8px', lg: '24px' }}
            mb={{
                base: 4,
                lg: 6,
            }}
            direction='column'
            alignItems='center'
            maxW={{
                sm: '480px',
                md: '578px',
                lg: '898px',
            }}
            mx='auto'
            p={{
                base: 4,
                md: '32px 0',
            }}
        >
            {data && data.length === 0 ? (
                <Text textAlign='center' fontWeight={600}>
                    По вашему запросу ничего не найдено. <br />
                    Попробуйте другой запрос
                </Text>
            ) : (
                <Heading
                    as='h1'
                    fontSize={{
                        base: '24px',
                        md: '48px',
                    }}
                    fontWeight='700'
                >
                    {title}
                </Heading>
            )}
            {isFetching && <Loader />}

            <Box display={isFetching ? 'none' : 'block'}>
                {description && (
                    <Text
                        fontSize={{
                            base: 'sm',
                            lg: 'md',
                        }}
                        textAlign='center'
                        color='neutral.200'
                        mt={{
                            base: 4,
                            lg: 3,
                        }}
                        maxW='696px'
                    >
                        {description}
                    </Text>
                )}

                <SearchForm
                    isError={isError}
                    data={data}
                    onOpen={onOpen}
                    initiateSearch={setIsSearchInitiated}
                    setSearchOnFocus={setSearchOnFocus}
                />

                <FiltersDrawer isOpen={isOpen} onClose={onClose} />
            </Box>
        </Flex>
    );
};

function Loader() {
    return (
        <Flex
            data-test-id={DATA_TEST_IDS.LOADER_SEARCH_BLOCK}
            minW='134px'
            h='134px'
            bgImage={loader}
            bgSize='cover'
            alignItems='center'
            justifyContent='center'
            borderRadius='50%'
        >
            <Spinner size='lg' color='black' />
        </Flex>
    );
}
