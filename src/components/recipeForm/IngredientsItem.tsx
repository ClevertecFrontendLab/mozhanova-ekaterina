import { Flex, Input, Td, Tr } from '@chakra-ui/react';
import { Control, Controller, UseFormRegister } from 'react-hook-form';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Ingredient, MeasureUnit, NewRecipe } from '~/types';

import { PlusIconRoundedFill } from '../ui/icons/PlusIconRoundedFill';
import { TrashIcon } from '../ui/icons/TrashIcon';
import { UiSelect } from '../ui/UiSelect';

type Props = {
    index: number;
    measureUnits: MeasureUnit[] | undefined;
    error: boolean;
    ingredient: Ingredient;
    removeIngredient: VoidFunction;
    isLast: boolean;
    control: Control<NewRecipe>;
    register: UseFormRegister<NewRecipe>;
    onAdd: (ingredient: Ingredient) => void;
};

export const IngredientsItem = ({
    index,
    measureUnits,
    removeIngredient,
    error,
    onAdd,
    isLast,
    control,
    register,
}: Props) => {
    const generateIngredient = (): Ingredient => ({
        title: '',
        count: 0,
        measureUnit: '',
    });

    if (!measureUnits) return null;

    return (
        <Tr display={{ base: 'flex', sm: 'table-row' }} flexWrap='wrap'>
            <Td flexBasis='100%'>
                <Controller
                    control={control}
                    name={`ingredients.${index}.title`}
                    render={({ field }) => (
                        <Input
                            data-test-id={`recipe-ingredients-title-${index}`}
                            onBlur={(e) => field.onChange(e.target.value.trim())}
                            onChange={(e) => field.onChange(e.target.value)}
                            borderColor={error ? 'error.400' : 'border.light'}
                            _focus={
                                error
                                    ? { borderColor: 'error.400' }
                                    : { borderColor: 'border.light' }
                            }
                            variant='tableInput'
                            value={field.value}
                            placeholder='Ингредиент'
                        />
                    )}
                />
            </Td>
            <Td flexBasis='80px'>
                <Controller
                    control={control}
                    name={`ingredients.${index}.count`}
                    render={({ field }) => (
                        <Input
                            data-test-id={`recipe-ingredients-count-${index}`}
                            borderColor={error ? 'error.400' : 'border.light'}
                            _focus={
                                error
                                    ? { borderColor: 'error.400' }
                                    : { borderColor: 'border.light' }
                            }
                            variant='tableInput'
                            min={1}
                            type='number'
                            value={field.value === 0 ? '' : field.value}
                            onChange={(e) => field.onChange(e.target.value || 0)}
                            placeholder='100'
                        />
                    )}
                />
            </Td>

            <Td flexGrow={1} flexBasis='60%'>
                <UiSelect
                    index={index}
                    error={error}
                    {...register(`ingredients.${index}.measureUnit`)}
                    measureUnits={measureUnits}
                    placeholder='Единица измерения'
                />
            </Td>

            <Td>
                {isLast ? (
                    <Flex h='100%' align='center' justify='center'>
                        <PlusIconRoundedFill
                            data-test-id={DATA_TEST_IDS.RECIPE_ADD_INGREDIENTS_BUTTON}
                            size={32}
                            onClick={() => onAdd(generateIngredient())}
                        />
                    </Flex>
                ) : (
                    <Flex
                        onClick={removeIngredient}
                        w='32px'
                        h='100%'
                        align='center'
                        justify='center'
                        color='text.primary'
                    >
                        <TrashIcon
                            data-test-id={`recipe-ingredients-remove-ingredients-${index}`}
                        />
                    </Flex>
                )}
            </Td>
        </Tr>
    );
};
