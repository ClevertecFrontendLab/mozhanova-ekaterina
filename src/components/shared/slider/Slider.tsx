import 'swiper/swiper-bundle.css';

import { Box, Flex, Heading } from '@chakra-ui/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BREAKPOINTS_VALUES } from '~/constants/breakpoints-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { Limit } from '~/query/constants/limits';
import { useGetLatestRecipesQuery } from '~/query/recipe-api';

import { NavigationButtons } from './NavigationButtons';
import { SliderCard } from './SliderCard';

export const Slider = () => {
    const [isLargerThanLG] = useBreakpoint('md');
    const { data } = useGetLatestRecipesQuery({
        limit: Limit.CAROUSEL,
        sortBy: 'createdAt',
    });
    if (!data?.data) return null;

    return (
        <Flex
            direction='column'
            gap={{
                base: 3,
                md: 6,
            }}
        >
            <Heading
                as='h2'
                fontSize={{
                    base: '2xl',
                    md: '4xl',
                    lg: '5xl',
                }}
                fontWeight='500'
            >
                Новые рецепты
            </Heading>

            <Box position='relative'>
                <NavigationButtons />

                <Swiper
                    speed={0}
                    data-test-id={DATA_TEST_IDS.CAROUSEL}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    spaceBetween={isLargerThanLG ? 24 : 12}
                    slidesPerView={4}
                    breakpoints={{
                        0: { slidesPerView: 2.1 },
                        [BREAKPOINTS_VALUES.sm]: { slidesPerView: 4.5 },
                        [BREAKPOINTS_VALUES.md]: { slidesPerView: 3.1 },
                        [BREAKPOINTS_VALUES.lg]: { slidesPerView: 4 },
                    }}
                    loop
                    freeMode
                >
                    {data.data.map((recipe, i) => (
                        <SwiperSlide data-test-id={`carousel-card-${i}`} key={recipe._id}>
                            <SliderCard key={recipe._id} data={recipe} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Flex>
    );
};
