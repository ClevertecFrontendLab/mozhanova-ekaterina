import { Box, Flex } from '@chakra-ui/react';

import { BlogsSection } from '~/components/BlogsSection';
import { PageToolbar } from '~/components/PageToolbar';
import { Slider } from '~/components/Slider';
import { TheJuiciestSection } from '~/components/TheJuiciestSection';
import { VeganCuisineSection } from '~/components/VeganCuisineSection';

export function Home() {
    return (
        <Box>
            <Box pb='24px'>
                <PageToolbar title='Приятного аппетита!' />
            </Box>
            <Flex direction='column' gap='40px'>
                <Slider />
                <TheJuiciestSection />
                <BlogsSection />
                <VeganCuisineSection />
            </Flex>
        </Box>
    );
}
