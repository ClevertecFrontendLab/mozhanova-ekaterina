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
        <Box
            padding={{
                base: '16px 16px 32px',
                md: '56px 20px 0',
                lg: '56px 24px 0',
            }}
        >
            <Hero recipe={recipe} />
            <Box
                mx='auto'
                maxW={{
                    base: '100%',
                    md: '578px',
                    lg: '668px',
                }}
            >
                <NutritionValue nutritionValue={recipe.nutritionValue} />
            </Box>
            <Flex
                direction='column'
                gap={{
                    base: 6,
                    lg: 10,
                }}
                maxW={{
                    base: '100%',
                    sm: '604px',
                    md: '578px',
                    lg: '668px',
                }}
                mx='auto'
            >
                <IngredientsTable portions={recipe.portions} ingredients={recipe.ingredients} />
                <Steps steps={recipe.steps} />
                <AuthorInfo />
            </Flex>
            <Slider />
        </Box>
    );
}
