import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { BlogsSection } from '~/components/shared/blogs/BlogsSection';
import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { Slider } from '~/components/shared/slider/Slider';
import { TheJuiciestSection } from '~/components/shared/TheJuiciestSection';
import { useToast } from '~/hooks/use-toast';
import { useLazyRecipesSearch } from '~/store/hooks';

export function Home() {
    const navigate = useNavigate();
    const { showError } = useToast();

    const { data, isError, isFetching, refetch } = useLazyRecipesSearch();
    const [isSearchInitiated, setIsSearchInitiated] = useState(false);

    useEffect(() => {
        if (isSearchInitiated) {
            refetch();
            setIsSearchInitiated(false);
        }
    }, [refetch, isSearchInitiated]);

    useEffect(() => {
        if (!isFetching && data && data.length > 0) {
            navigate('/search');
        } else if (!data && isError) {
            isError && showError('Ошибка сервера', 'Попробуйте поискать снова попозже');
        }
    }, [navigate, data, isError, isFetching, showError]);

    return (
        <Box>
            <SearchBar
                isFetching={isFetching}
                isError={isError}
                data={data}
                title='Приятного аппетита!'
                onSearch={setIsSearchInitiated}
            />

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
                <Slider />
                <TheJuiciestSection />
                <BlogsSection />
                <RelevantKitchenBlock />
            </Flex>
        </Box>
    );
}
