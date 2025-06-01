import { Container, Flex, Grid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Control, useForm } from 'react-hook-form';

import { DATA_TEST_IDS } from '~/constants/test-ids';
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
    isDraftValid,
}: {
    onSubmit: (data: NewRecipe) => void;
    onSave: (data: RecipeDraft) => void;
    isDraftValid: boolean;
    data?: Recipe;
}) => {
    const {
        register,
        control,
        handleSubmit,
        getValues,
        setError,
        formState: { isDirty, errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(RecipePublishSchema),
        defaultValues: data || {
            title: '',
            description: '',
            categoriesIds: [],
            image: '',
            time: undefined,
            portions: undefined,
            ingredients: [
                {
                    title: '',
                    count: 0,
                    measureUnit: '',
                },
            ],
            steps: [
                {
                    stepNumber: 1,
                    description: '',
                    image: null,
                },
            ],
        },
    });

    const { showRecipePreventive } = useModalContext();
    const { clickedLink, setClickedLink } = useClickOutside(isDirty);
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        if (isDirty && clickedLink) {
            showRecipePreventive({
                draft: getValues(),
                link: clickedLink,
                setError: () => {
                    setError('title', { message: '' });
                },
            });
            setClickedLink('');
        }
    }, [clickedLink, isDirty]);

    // console.log(!isDirty, 'form clean');
    // console.log(isValid);
    // console.log(isDraftValid, 'isDraftValid');

    // console.log(watch('steps'), 'steps');
    // console.log(watch('ingredients'), 'ingredients');
    // console.log(watch('portions'), 'portions');

    // console.log(errors.portions, 'errors.portions');
    // console.log(errors, 'errors');
    // console.log(isDraft);
    // console.log(getValues(), 'getValues');
    // console.log(watch('categoriesIds'), 'categoriesIds')
    // console.log(watch('image'), 'image');
    // console.log(isRecipeValid, 'isRecipeValid');

    const handleSave = () => {
        onSave(getValues());
    };
    return (
        <Grid
            data-test-id={DATA_TEST_IDS.RECIPE_FORM}
            gap={10}
            flex={1}
            as='form'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Flex gap={6} direction={{ base: 'column', sm: 'row' }}>
                <ImageControl
                    error={!isValid || !isDraftValid}
                    control={control as Control<NewRecipe>}
                />
                <VStack gap={6} flexGrow={1} maxW={{ base: '100%', sm: '575px' }}>
                    <TagsControl
                        error={!isValid || !isDraftValid}
                        control={control as Control<NewRecipe>}
                    />
                    <TitleControl error={!isValid || !isDraftValid} {...register('title')} />
                    <DescriptionControl
                        error={!isValid || !isDraftValid}
                        {...register('description')}
                    />
                    <PortionsControl
                        error={!isValid || !isDraftValid}
                        control={control as Control<NewRecipe>}
                    />
                    <TimeControl
                        error={!isValid || !isDraftValid}
                        control={control as Control<NewRecipe>}
                    />
                </VStack>
            </Flex>
            <Container p={0} display='grid' gap={10} maxW='668px'>
                <IngredientsControl
                    error={!isValid || !isDraftValid}
                    control={control as Control<NewRecipe>}
                    register={register}
                />
                <StepsControl
                    error={!isValid || !isDraftValid}
                    control={control as Control<NewRecipe>}
                />
            </Container>

            <SubmitButtons saveDraft={handleSave} />
        </Grid>
    );
};
