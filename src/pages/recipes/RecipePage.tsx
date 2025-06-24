import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { AuthorInfo } from '~/components/shared/recipes/AuthorInfo';
import { Hero } from '~/components/shared/recipes/Hero';
import { IngredientsTable } from '~/components/shared/recipes/IngredientsTable';
import { NutritionValue } from '~/components/shared/recipes/NutritionValue';
import { Steps } from '~/components/shared/recipes/Steps';
import { Slider } from '~/components/shared/slider/Slider';
import { ThumbUpIcon } from '~/components/ui/icons/ThumbUpIcon';
import { UiButton } from '~/components/ui/UiButton';
import { useGetRecipe } from '~/query/hooks/use-get-recipe';
import { useRecommendRecipe } from '~/query/hooks/use-recommend-recipe';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId, selectRecommenderProfile } from '~/store/selectors';

export const RecipePage = () => {
    const { recipeId: id } = useParams();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const isRecommenderProfile = useAppSelector(selectRecommenderProfile);
    const { handleRecommendRecipe } = useRecommendRecipe();
    const { data } = useGetRecipe(id);
    const isRecommended = data?.recommendedByUserId?.includes(currentUserId);

    if (!data) return null;
    return (
        <Box
            as='main'
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
                {currentUserId !== data.authorId && (
                    <AuthorInfo currentUserId={currentUserId} authorId={data.authorId} />
                )}
                {isRecommenderProfile && (
                    <>
                        {isRecommended ? (
                            <UiButton
                                text='Вы порекомендовали'
                                leftIcon={<ThumbUpIcon />}
                                size='lg'
                                onClick={() => handleRecommendRecipe(id)}
                            />
                        ) : (
                            <UiButton
                                variant='solid'
                                text='Рекомендовать рецепт'
                                leftIcon={<ThumbUpIcon />}
                                size='lg'
                                onClick={() => handleRecommendRecipe(id)}
                            />
                        )}
                    </>
                )}
            </Flex>
            <Box mt={{ base: 10, md: 14 }}>
                <Slider />
            </Box>
        </Box>
    );
};
