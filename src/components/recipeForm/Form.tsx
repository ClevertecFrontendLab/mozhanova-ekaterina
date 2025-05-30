import { Container, Flex, Grid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Control, useForm } from 'react-hook-form';

import { useModalContext } from '~/contexts/modal-context';
import { useClickOutside } from '~/hooks/use-click-outside';
import { NewRecipe, Recipe, RecipeDraft } from '~/types';
import { RecipePublishSchema } from '~/validation';

import { DescriptionControl } from './DescriptionControl';
import { ImageControl } from './ImageControl';
import { IngredientsControl } from './IngredientsControl';
import { PortionsControl } from './PortionsControl';
import { StepsControl } from './StepsControl';
import { SubmitButtons } from './SubmitButtons';
import { TagsControl } from './TagsControl';
import { TimeControl } from './TimeControl';
import { TitleControl } from './TitleControl';

export const Form = ({
    data,
    onSubmit,
    onSave,
}: {
    onSubmit: (data: NewRecipe) => void;
    onSave: (data: RecipeDraft) => void;
    data?: Recipe;
}) => {
    const {
        register,
        control,
        handleSubmit,
        getValues,
        formState: { errors, isDirty },
    } = useForm({
        resolver: yupResolver(RecipePublishSchema),
        defaultValues: data || {
            title: '',
            description: '',
            categoriesIds: [],
            image: '',
            time: undefined,
            portions: undefined,
            ingredients: [],
            steps: [
                {
                    stepNumber: 1,
                    description: '',
                    image: '',
                },
            ],
        },
    });

    const { showRecipePreventive } = useModalContext();
    const { clickedLink } = useClickOutside(isDirty);

    const isValid = Object.keys(errors).length == 0;

    useEffect(() => {
        if (isDirty && clickedLink) {
            showRecipePreventive(getValues(), clickedLink);
        }
    }, [clickedLink]);

    // console.log(isDirty);
    // console.log(watch('steps'), 'steps');
    // console.log(watch('ingredients'), 'ingredients');
    // console.log(errors.portions, 'errors.portions');
    // console.log(errors, 'errors');
    // console.log(isDraft);
    // console.log(getValues(), 'getValues');
    // console.log(watch('categoriesIds'), 'categoriesIds')
    // console.log(watch('image'), 'image');
    return (
        <Grid gap={10} flex={1} as='form' onSubmit={handleSubmit(onSubmit)}>
            <Flex gap={6} direction={{ base: 'column', sm: 'row' }}>
                <ImageControl error={!isValid} control={control as Control<NewRecipe>} />
                <VStack gap={6} flexGrow={1} maxW={{ base: '100%', sm: '575px' }}>
                    <TagsControl control={control as Control<NewRecipe>} error={!isValid} />
                    <TitleControl error={!isValid} {...register('title')} />
                    <DescriptionControl error={!isValid} {...register('description')} />
                    <PortionsControl error={!isValid} control={control as Control<NewRecipe>} />
                    <TimeControl error={!isValid} control={control as Control<NewRecipe>} />
                </VStack>
            </Flex>
            <Container p={0} display='grid' gap={10} maxW='668px'>
                <IngredientsControl error={!isValid} control={control as Control<NewRecipe>} />
                <StepsControl error={!isValid} control={control as Control<NewRecipe>} />
            </Container>

            <SubmitButtons saveDraft={() => onSave(getValues())} />
        </Grid>
    );
};
