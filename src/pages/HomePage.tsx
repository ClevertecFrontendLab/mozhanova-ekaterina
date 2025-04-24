import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { BlogsSection } from '~/components/shared/blogs/BlogsSection';
import { PageToolbar } from '~/components/shared/PageToolbar/PageToolbar';
import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { Slider } from '~/components/shared/slider/Slider';
import { TheJuiciestSection } from '~/components/shared/TheJuiciestSection';
import { cleanFilters } from '~/store/recipe-slice';

export function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(cleanFilters());
    }, []);

    return (
        <Box>
            <PageToolbar title='Приятного аппетита!' />

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
                <RelevantKitchenBlock
                    heading='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
            </Flex>
        </Box>
    );
}
