import { Flex, Input, Td, Tr } from '@chakra-ui/react';
import { useState } from 'react';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Ingredient } from '~/types';

import { RadioSelect } from '../shared/RadioSelect';
import { PlusIconRoundedFill } from '../ui/icons/PlusIconRoundedFill';

type Props = {
    measureUnits: string[] | undefined;
    error: boolean;
    onAdd: (ingredient: Ingredient) => void;
};

export const AddNewIngredient = ({ measureUnits, onAdd, error }: Props) => {
    const generateIngredient = (): Ingredient => ({
        title: '',
        count: 0,
        measureUnit: '',
    });

    const [newIngredient, setNewIngredient] = useState<Ingredient>(generateIngredient());

    const handleAdd = () => {
        onAdd(newIngredient);
        setNewIngredient(() => generateIngredient());
    };

    if (!measureUnits) return null;

    return (
        <Tr display={{ base: 'flex', sm: 'table-row' }} flexWrap='wrap'>
            <Td flexBasis='100%'>
                <Input
                    borderColor={error ? 'error.400' : 'border.light'}
                    variant='tableInput'
                    onChange={(e) => setNewIngredient({ ...newIngredient, title: e.target.value })}
                    value={newIngredient.title}
                    placeholder='Ингредиент'
                />
            </Td>
            <Td flexBasis='80px'>
                <Input
                    borderColor={error ? 'error.400' : 'border.light'}
                    variant='tableInput'
                    min={1}
                    type='number'
                    value={newIngredient.count === 0 ? '' : newIngredient.count}
                    onChange={(e) =>
                        setNewIngredient({ ...newIngredient, count: parseInt(e.target.value) })
                    }
                    placeholder='100'
                />
            </Td>

            <Td flexGrow={1}>
                <RadioSelect
                    error={error}
                    setSelected={(value) =>
                        setNewIngredient({ ...newIngredient, measureUnit: value })
                    }
                    options={measureUnits}
                    selected={newIngredient.measureUnit}
                    placeholder='Единица измерения'
                />
            </Td>

            <Td>
                <Flex h='100%' align='center' justify='center'>
                    <PlusIconRoundedFill
                        data-test-id={DATA_TEST_IDS.RECIPE_ADD_INGREDIENTS_BUTTON}
                        size={32}
                        onClick={() => handleAdd()}
                    />
                </Flex>
            </Td>
        </Tr>
    );
};
