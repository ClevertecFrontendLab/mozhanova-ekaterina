import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { AuthorInfo } from '~/components/shared/recipes/AuthorInfo';
import { Hero } from '~/components/shared/recipes/Hero';
import { IngredientsTable } from '~/components/shared/recipes/IngredientsTable';
import { NutritionValue } from '~/components/shared/recipes/NutritionValue';
import { Steps } from '~/components/shared/recipes/Steps';
import { Slider } from '~/components/shared/slider/Slider';
import { ThumbUpIcon } from '~/components/ui/icons/ThumbUpIcon';
import { UiButton } from '~/components/ui/UiButton';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';
import { useGetRecipeByIdQuery } from '~/query/recipe-api';
import { useAppSelector } from '~/store/hooks';
import { setCurrentRecipe } from '~/store/recipe-slice';
import { selectCurrentUserId } from '~/store/selectors';

export const RecipePage = () => {
    const { recipeId: id } = useParams();
    const { showError } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const { data, isLoading, isError } = useGetRecipeByIdQuery(id || '', { skip: !id });

    const recommendRecipe = async () => {};

    useEffect(() => {
        if (data) dispatch(setCurrentRecipe(data));
    });
    useEffect(() => {
        if (isError) {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
            navigate(-1);
        }
    }, [isError, showError, navigate]);

    if (isLoading || isError || !data) return null;
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
                <UiButton
                    variant='solid'
                    text='Рекомендовать рецепт'
                    leftIcon={<ThumbUpIcon />}
                    size='lg'
                    onClick={recommendRecipe}
                />
            </Flex>
            <Box mt={{ base: 10, md: 14 }}>
                <Slider />
            </Box>
        </Box>
    );
};
