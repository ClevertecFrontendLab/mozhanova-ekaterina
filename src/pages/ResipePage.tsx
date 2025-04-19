import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { AuthorInfo } from '~/components/recipe/AuthorInfo';
import { Hero } from '~/components/recipe/Hero';
import { IngredientsTable } from '~/components/recipe/IngredientsTable';
import { NutritionValue } from '~/components/recipe/NutritionValue';
import { Steps } from '~/components/recipe/Steps';
import { Slider } from '~/components/shared/slider/Slider';
import { data } from '~/mocks/recipes';
import { TRecipe } from '~/types';

export function RecipePage() {
    const params = useParams();
    const recipe = data.find((recipe) => recipe.id === params.id) as TRecipe;

    return (
        <Box pt={14}>
            <Hero recipe={recipe} />
            <Flex
                direction='column'
                gap={{
                    base: 6,
                    lg: 10,
                }}
                maxW='668px'
                mx='auto'
            >
                <NutritionValue nutritionValue={recipe.nutritionValue} />
                <IngredientsTable ingredients={recipe.ingredients} />
                <Steps steps={recipe.steps} />
                <AuthorInfo />
            </Flex>
            <Slider />
        </Box>
    );
}
