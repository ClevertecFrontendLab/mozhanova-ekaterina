import 'swiper/swiper-bundle.css';

import { Box, Flex, Heading, useMediaQuery } from '@chakra-ui/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { data } from '~/mocks/recipes';
import { TRecipe } from '~/types';

import { UiCard } from '../../ui/UiCard';
import { NavigationButtons } from './NavigationButtons';

export function Slider() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

    const sortedData: TRecipe[] = [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

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
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    spaceBetween={24}
                    slidesPerView={4}
                    breakpoints={{
                        360: { slidesPerView: 2 },
                        768: { slidesPerView: 4 },
                        1440: { slidesPerView: 3 },
                        1920: { slidesPerView: 4 },
                    }}
                    loop
                >
                    {sortedData.slice(0, 10).map((recipe) => (
                        <SwiperSlide>
                            <UiCard
                                key={recipe.id}
                                data={recipe}
                                size={isLargerThanMD ? 'lg' : 'sm'}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Flex>
    );
}
