import { Box, Flex } from '@chakra-ui/react';

import { BlogsSection } from '~/components/shared/blogs/BlogsSection';
import { PageToolbar } from '~/components/shared/PageToolbar';
import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { TheJuiciestSection } from '~/components/shared/TheJuiciestSection';

export function Home() {
    return (
        <Box>
            <PageToolbar title='Приятного аппетита!' />

            <Flex
                direction='column'
                gap={{
                    base: '32px',
                    lg: '40px',
                }}
            >
                <Slider data={data_slider} />
                <TheJuiciestSection data={data_juiciest} />
                <BlogsSection />
                <RelevantKitchenBlock
                    data={data_relevant_vegan}
                    heading='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
            </Flex>
        </Box>
    );
}
