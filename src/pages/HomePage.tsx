import { Box, Flex } from '@chakra-ui/react';

import { TheJuiciestSection } from '~/components/juiciest/TheJuiciestSection';
import { BlogsSection } from '~/components/shared/blogs/BlogsSection';
import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { Slider } from '~/components/shared/slider/Slider';

export function Home() {
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
                <Slider />
                <TheJuiciestSection />
                <BlogsSection />
                <RelevantKitchenBlock />
            </Flex>
        </Box>
    );
}
