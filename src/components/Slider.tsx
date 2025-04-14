import { Box, Flex, Heading, useMediaQuery } from '@chakra-ui/react';

import { TRecipe } from '~/types';

import { UiCard } from './ui/UiCard';
import { UiSliderButton } from './ui/UiSliderButton';

type Props = {
    data: TRecipe[];
};

export function Slider({ data }: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

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
                <Box w='100%' overflowX='hidden'>
                    <Flex
                        gap={{
                            base: 3,
                            xl: 6,
                        }}
                    >
                        {data.map((recipe) => (
                            <Box
                                minW={{
                                    base: '158px',
                                    md: '277px',
                                    lg: '322px',
                                }}
                                flexBasis={{
                                    base: '158px',
                                    md: '277px',
                                    lg: '322px',
                                }}
                            >
                                <UiCard
                                    key={recipe.id}
                                    imgSrc={recipe.imageSrc}
                                    title={recipe.title}
                                    text={recipe.description}
                                    category={recipe.category}
                                    favorites={recipe.favorites}
                                    likes={recipe.likes}
                                    size={isLargerThanMD ? 'lg' : 'sm'}
                                />
                            </Box>
                        ))}
                    </Flex>
                </Box>
                {isLargerThanMD && (
                    <>
                        <UiSliderButton direction='left' />
                        <UiSliderButton direction='right' />
                    </>
                )}
            </Box>
        </Flex>
    );
}
