import 'swiper/swiper-bundle.css';

import { Box, Flex, Heading, useMediaQuery } from '@chakra-ui/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetLatestRecipesQuery } from '~/query/recipe-api';

import { NavigationButtons } from './NavigationButtons';
import { SliderCard } from './SliderCard';

export const Slider = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 1441px)');
    const { data } = useGetLatestRecipesQuery({
        limit: 10,
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
                    speed={50}
                    data-test-id='carousel'
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    spaceBetween={isLargerThanLG ? 24 : 12}
                    slidesPerView={4}
                    breakpoints={{
                        0: { slidesPerView: 2.1 },
                        361: { slidesPerView: 4.5 },
                        1440: { slidesPerView: 3.1 },
                        1920: { slidesPerView: 4 },
                    }}
                    loop
                    freeMode
                >
                    {data?.data.map((recipe, i) => (
                        <SwiperSlide data-test-id={`carousel-card-${i}`} key={recipe._id}>
                            <SliderCard key={recipe._id} data={recipe} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Flex>
    );
};
