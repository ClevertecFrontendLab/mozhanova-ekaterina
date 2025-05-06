import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { BlogsSection } from '~/components/shared/blogs/BlogsSection';
import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { Slider } from '~/components/shared/slider/Slider';
import { TheJuiciestSection } from '~/components/shared/TheJuiciestSection';
import { useRecipesSearch } from '~/store/hooks';

export function Home() {
    const navigate = useNavigate();

    const { isError, isFetching, data } = useRecipesSearch();
    const [isSearchInitiated, setIsSearchInitiated] = useState(false);

    useEffect(() => {
        if (isSearchInitiated) {
            if (isFetching) return;
            if (data && data.length > 0) {
                navigate('/search');
                setIsSearchInitiated(false);
            } else if (!data && isError) setIsSearchInitiated(false);
        }
    }, [isSearchInitiated, navigate, data, isError, isFetching]);

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
