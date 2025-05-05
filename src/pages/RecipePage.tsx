import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { AuthorInfo } from '~/components/recipe/AuthorInfo';
import { Hero } from '~/components/recipe/Hero';
import { IngredientsTable } from '~/components/recipe/IngredientsTable';
import { NutritionValue } from '~/components/recipe/NutritionValue';
import { Steps } from '~/components/recipe/Steps';
import { Slider } from '~/components/shared/slider/Slider';
import { useToast } from '~/hooks/use-toast';
import { useGetRecipeByIdQuery } from '~/query/recipe-api';

export function RecipePage() {
    const { id } = useParams();
    const { showError } = useToast();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetRecipeByIdQuery(id || '', { skip: !id });

    useEffect(() => {
        if (isError) {
            showError('Ошибка сервера', 'Попробуйте попозже');
            navigate(-1);
        }
    }, [isError, showError, navigate]);

    if (isLoading || isError || !data) return null;
    return (
        <Box
            padding={{
                base: '16px 16px 32px',
                md: '56px 20px 0',
                lg: '56px 24px 0',
            }}
        >
            <Hero recipe={data} />
            <Box
                mx='auto'
                maxW={{
                    base: '100%',
                    md: '578px',
                    lg: '668px',
                }}
            >
                <NutritionValue nutritionValue={data.nutritionValue} />
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
                <IngredientsTable portions={data.portions} ingredients={data.ingredients} />
                <Steps steps={data.steps} />
                <AuthorInfo />
            </Flex>
            <Slider />
        </Box>
    );
}
