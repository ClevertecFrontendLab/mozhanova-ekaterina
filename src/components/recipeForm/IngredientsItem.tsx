import { Flex, Input, Td, Tr } from '@chakra-ui/react';
import { useState } from 'react';

import { Ingredient } from '~/types';

import { RadioSelect } from '../shared/RadioSelect';
import { TrashIcon } from '../ui/icons/TrashIcon';

type Props = {
    index: number;
    measureUnits: string[] | undefined;
    error: boolean;
    ingredient: Ingredient;
    removeIngredient: VoidFunction;
    updateIngredient: (ingredient: Ingredient) => void;
};

export const IngredientsItem = ({
    index,
    ingredient,
    measureUnits,
    updateIngredient,
    removeIngredient,
    error,
}: Props) => {
    const [updatedIngredient, setUpdatedIngredient] = useState<Ingredient>(ingredient);
    if (!measureUnits) return null;

    return (
        <Tr display={{ base: 'flex', sm: 'table-row' }} flexWrap='wrap'>
            <Td flexBasis='100%'>
                <Input
                    data-test-id={`recipe-ingredients-title-${index}`}
                    onBlur={() =>
                        updateIngredient({ ...ingredient, title: updatedIngredient.title.trim() })
                    }
                    onChange={(e) =>
                        setUpdatedIngredient({ ...updatedIngredient, title: e.target.value })
                    }
                    borderColor={error ? 'error.400' : 'border.light'}
                    variant='tableInput'
                    value={updatedIngredient.title}
                    placeholder='Ингредиент'
                />
            </Td>
            <Td flexBasis='80px'>
                <Input
                    data-test-id={`recipe-ingredients-count-${index}`}
                    borderColor={error ? 'error.400' : 'border.light'}
                    variant='tableInput'
                    min={1}
                    type='number'
                    value={updatedIngredient.count}
                    onChange={(e) =>
                        setUpdatedIngredient({
                            ...updatedIngredient,
                            count: parseInt(e.target.value),
                        })
                    }
                    onBlur={(e) =>
                        updateIngredient({ ...ingredient, count: parseInt(e.target.value.trim()) })
                    }
                    placeholder='100'
                />
            </Td>

            <Td flexGrow={1}>
                <RadioSelect
                    index={index}
                    error={error}
                    setSelected={(value) => updateIngredient({ ...ingredient, measureUnit: value })}
                    options={measureUnits}
                    selected={updatedIngredient.measureUnit}
                    placeholder='Единица измерения'
                />
            </Td>

            <Td>
                <Flex
                    onClick={removeIngredient}
                    w='32px'
                    h='100%'
                    align='center'
                    justify='center'
                    color='text.primary'
                >
                    <TrashIcon data-test-id={`recipe-ingredients-remove-ingredients-${index}`} />
                </Flex>
            </Td>
        </Tr>
    );
};
