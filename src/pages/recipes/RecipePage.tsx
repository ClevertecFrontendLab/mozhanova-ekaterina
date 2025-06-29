import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { AuthorInfo } from '~/components/shared/recipes/AuthorInfo';
import { Hero } from '~/components/shared/recipes/Hero';
import { IngredientsTable } from '~/components/shared/recipes/IngredientsTable';
import { NutritionValue } from '~/components/shared/recipes/NutritionValue';
import { Steps } from '~/components/shared/recipes/Steps';
import { Slider } from '~/components/shared/slider/Slider';
import { ThumbUpIcon } from '~/components/ui/icons/ThumbUpIcon';
import { UiButton } from '~/components/ui/UiButton';
import { useEditRecipe } from '~/hooks/use-edit-recipe';
import { useDeleteRecipe } from '~/query/hooks/use-delete-recipe';
import { useGetRecipe } from '~/query/hooks/use-get-recipe';
import { useLikeRecipe } from '~/query/hooks/use-like-recipe';
import { useRecommendRecipe } from '~/query/hooks/use-recommend-recipe';
import { useSaveRecipe } from '~/query/hooks/use-save-recipe';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId, selectRecommenderProfile } from '~/store/selectors';

export const RecipePage = () => {
    const { category, subCategory, recipeId } = useParams();
    const [isRecommended, setIsRecommended] = useState(false);
    const currentUserId = useAppSelector(selectCurrentUserId);
    const isRecommenderProfile = useAppSelector(selectRecommenderProfile);
    const { data } = useGetRecipe(recipeId);
    const { handleRecommendRecipe } = useRecommendRecipe();
    const { handleEdit } = useEditRecipe();
    const { handleSave } = useSaveRecipe();
    const { handleLike } = useLikeRecipe();
    const { handleDelete } = useDeleteRecipe();

    const toggleRecommend = () => {
        handleRecommendRecipe(recipeId);
        setIsRecommended(!isRecommended);
    };

    useEffect(() => {
        if (data?.recommendedByUserId?.includes(currentUserId)) setIsRecommended(true);
    }, [data]);

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
            <Hero
                recipe={data}
                onEdit={() => handleEdit(data, category, subCategory)}
                onSave={() => handleSave(recipeId)}
                onLike={() => handleLike(recipeId)}
                onDelete={() => handleDelete(recipeId)}
            />
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
                                onClick={toggleRecommend}
                            />
                        ) : (
                            <UiButton
                                variant='solid'
                                text='Рекомендовать рецепт'
                                leftIcon={<ThumbUpIcon />}
                                size='lg'
                                onClick={toggleRecommend}
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
