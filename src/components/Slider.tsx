import { Flex, Grid } from '@chakra-ui/react';

import { TRecipe } from '~/types';

import { SectionHeading } from './SectionHeading';
import { UiCard } from './ui/UiCard';
import { UiSliderButton } from './ui/UiSliderButton';

type Props = {
    data: TRecipe[];
};

export function Slider({ data }: Props) {
    return (
        <Flex direction='column' gap='24px'>
            <SectionHeading title='Новые рецепты' />
            <Grid position='relative' templateColumns='repeat(4, 1fr)' gap='24px'>
                {data.map((recipe) => (
                    <UiCard
                        key={recipe.id}
                        imgSrc={recipe.imageSrc}
                        title={recipe.title}
                        text={recipe.description}
                        category={recipe.category}
                        favorites={recipe.favorites}
                        likes={recipe.likes}
                    />
                ))}
                <UiSliderButton direction='left' />
                <UiSliderButton direction='right' />
            </Grid>
        </Flex>
    );
}
