import { Flex, Grid } from '@chakra-ui/react';
import { Control, useFieldArray } from 'react-hook-form';

// import { DATA_TEST_IDS } from '~/constants/test-ids';
import { NewRecipe, Step } from '~/types';

import { PlusIconRoundedFill } from '../ui/icons/PlusIconRoundedFill';
import { UiButton } from '../ui/UiButton';
import { StepCard } from './StepCard';

type Props = {
    error: boolean;
    control: Control<NewRecipe>;
};

export const StepsControl = ({ control, error }: Props) => {
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'steps',
    });
    const generateStep = (stepNumber: number): Step => ({
        stepNumber,
        description: '',
        image: '',
    });

    const addNewStep = () => {
        append(generateStep(fields.length + 1));
    };

    return (
        <Grid gap={4}>
            <Flex whiteSpace='nowrap' fontWeight={600} align='center' gap={2}>
                Добавьте шаги приготовления
            </Flex>
            {fields.map((step, index) => (
                <StepCard
                    control={control}
                    index={index}
                    error={error}
                    key={step.id}
                    step={{
                        ...step,
                        stepNumber: index + 1,
                    }}
                    updateStep={(updatedStep) =>
                        update(index, {
                            ...updatedStep,
                            stepNumber: index + 1,
                        })
                    }
                    removeStep={() => remove(index)}
                />
            ))}
            <Flex justify='flex-end'>
                <UiButton
                    // data-test-id={DATA_TEST_IDS.RECIPE_ADD_INGREDIENTS_BUTTON}
                    onClick={addNewStep}
                    text='Новый шаг'
                    rightIcon={<PlusIconRoundedFill />}
                />
            </Flex>
        </Grid>
    );
};
