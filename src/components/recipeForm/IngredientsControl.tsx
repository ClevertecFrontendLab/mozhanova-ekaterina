import { Flex, Grid, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Control, useFieldArray } from 'react-hook-form';

import { useMeasureUnitsQuery } from '~/query/recipe-api';
import { NewRecipe } from '~/types';

import { RoundedPlusIcon } from '../ui/icons/RoundedPlusIcon';
import { AddNewIngredient } from './AddNewIngredient';
import { IngredientsItem } from './IngredientsItem';

type Props = {
    error: boolean;
    control: Control<NewRecipe>;
};

export const IngredientsControl = ({ control, error }: Props) => {
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'ingredients',
    });
    const { data } = useMeasureUnitsQuery();
    const measureUnits = data?.map((item) => item.name);

    if (!data) return null;

    return (
        <Grid gap={{ base: 3, sm: 4 }}>
            <Flex
                whiteSpace='nowrap'
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight={600}
                align='center'
                gap={2}
            >
                Добавьте ингредиенты рецепта, нажав на <RoundedPlusIcon />
            </Flex>
            <TableContainer>
                <Table display={{ base: 'block', sm: 'table' }} variant='bordered'>
                    <Thead display={{ base: 'none', sm: 'table-header-group' }}>
                        <Tr>
                            <Th>Ингредиент</Th>
                            <Th>Количество</Th>
                            <Th>Единица измерения</Th>
                        </Tr>
                    </Thead>
                    <Tbody display={{ base: 'block', sm: 'table-row-group' }}>
                        {fields &&
                            fields.map((ingredient, index) => (
                                <IngredientsItem
                                    index={index}
                                    error={error}
                                    key={ingredient.id}
                                    measureUnits={measureUnits}
                                    updateIngredient={(ingredient) => update(index, ingredient)}
                                    removeIngredient={() => remove(index)}
                                    ingredient={ingredient}
                                />
                            ))}
                        <AddNewIngredient
                            error={error}
                            measureUnits={measureUnits}
                            onAdd={(ingredient) => append(ingredient)}
                        />
                    </Tbody>
                </Table>
            </TableContainer>
        </Grid>
    );
};
