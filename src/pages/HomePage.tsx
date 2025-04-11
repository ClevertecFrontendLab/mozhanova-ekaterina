import { Box, Flex } from '@chakra-ui/react';

import { BlogsSection } from '~/components/BlogsSection';
import { PageToolbar } from '~/components/PageToolbar';
import { RelevantKitchenBlock } from '~/components/RelevantKitchenBlock';
import { Slider } from '~/components/Slider';
import { TheJuiciestSection } from '~/components/TheJuiciestSection';
import { data_juiciest, data_relevant_vegan, data_slider } from '~/constants';

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
