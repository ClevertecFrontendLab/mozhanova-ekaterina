import { Flex, Grid, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

import { useMeasureUnitsQuery } from '~/query/recipe-api';
import { NewRecipe } from '~/types';

import { RoundedPlusIcon } from '../ui/icons/RoundedPlusIcon';
import { IngredientsItem } from './IngredientsItem';

type Props = {
    error: boolean;
    control: Control<NewRecipe>;
    register: UseFormRegister<NewRecipe>;
};

export const IngredientsControl = ({ control, error, register }: Props) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });
    const { data: measureUnits } = useMeasureUnitsQuery();

    if (!measureUnits) return null;

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
                                    register={register}
                                    control={control}
                                    index={index}
                                    error={error}
                                    key={ingredient.id}
                                    measureUnits={measureUnits}
                                    removeIngredient={() => remove(index)}
                                    ingredient={ingredient}
                                    onAdd={(ingredient) => append(ingredient)}
                                    isLast={index === fields.length - 1}
                                />
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Grid>
    );
};
