import { Container, Flex, Grid, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Control, useForm } from 'react-hook-form';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useClickOutside } from '~/hooks/use-click-outside';
import { NewRecipe } from '~/types';

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
    isFormValid,
    setIsFormValid,
}: {
    isFormValid: boolean;
    onSubmit: (data: Partial<NewRecipe>) => void;
    onSave: (data: Partial<NewRecipe>) => void;
    setIsFormValid: (value: boolean) => void;
    data?: Partial<NewRecipe>;
}) => {
    const {
        register,
        control,
        getValues,
        formState: { isDirty },
    } = useForm({
        mode: 'onChange',
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

    useEffect(() => {
        if (isDirty && clickedLink) {
            showRecipePreventive({
                draft: getValues(),
                link: clickedLink,
                setError: () => {
                    setIsFormValid(false);
                },
            });
            setClickedLink('');
        }
    }, [clickedLink, isDirty]);

    const handleSave = () => {
        onSave(getValues());
    };
    const handleSubmit = () => {
        onSubmit(getValues());
    };

    return (
        <Grid data-test-id={DATA_TEST_IDS.RECIPE_FORM} gap={10} flex={1} as='form'>
            <Flex gap={6} direction={{ base: 'column', sm: 'row' }}>
                <ImageControl
                    error={!isFormValid}
                    control={control as Control<Partial<NewRecipe>>}
                />
                <VStack gap={6} flexGrow={1} maxW={{ base: '100%', sm: '575px' }}>
                    <TagsControl
                        error={!isFormValid}
                        control={control as Control<Partial<NewRecipe>>}
                    />
                    <TitleControl error={!isFormValid} {...register('title')} />
                    <DescriptionControl error={!isFormValid} {...register('description')} />
                    <PortionsControl
                        error={!isFormValid}
                        control={control as Control<Partial<NewRecipe>>}
                    />
                    <TimeControl
                        error={!isFormValid}
                        control={control as Control<Partial<NewRecipe>>}
                    />
                </VStack>
            </Flex>
            <Container p={0} display='grid' gap={10} maxW='668px'>
                <IngredientsControl
                    error={!isFormValid}
                    control={control as Control<Partial<NewRecipe>>}
                    register={register}
                />
                <StepsControl
                    error={!isFormValid}
                    control={control as Control<Partial<NewRecipe>>}
                />
            </Container>

            <SubmitButtons onSubmit={handleSubmit} saveDraft={handleSave} />
        </Grid>
    );
};
