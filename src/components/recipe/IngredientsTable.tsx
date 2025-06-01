import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';

import { UiNumberInput } from '../ui/UiNumberInput';

export const IngredientsTable = ({
    ingredients = [],
    portions,
}: {
    ingredients: {
        title: string;
        count: number;
        measureUnit: string;
    }[];
    portions: number;
}) => {
    const [portionsQuantity, setPortionsQuantity] = useState(String(portions));

    return (
        <TableContainer>
            <Table variant='striped'>
                <Thead>
                    <Tr>
                        <Th pr={0} pl={{ base: 2, sm: 6 }}>
                            ИНГРЕДИЕНТЫ
                        </Th>
                        <Th pr={0} pl={0}>
                            <Flex
                                alignItems='center'
                                justifyContent='flex-end'
                                gap={{
                                    base: 3,
                                    md: 4,
                                }}
                            >
                                ПОРЦИЙ
                                <UiNumberInput
                                    value={portionsQuantity}
                                    onChange={(value: string) => setPortionsQuantity(value)}
                                />
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map((ingredient, i) => (
                        <Tr key={i} h={{ base: '40px', md: '52px' }}>
                            <Td pr={0} pl={{ base: 2, sm: 6 }}>
                                {ingredient.title}
                            </Td>
                            <Td
                                data-test-id={`ingredient-quantity-${i}`}
                                pl={0}
                                pr={{ base: 2, sm: 6 }}
                            >
                                {(Number(ingredient.count) / portions) *
                                    parseInt(portionsQuantity) || ''}
                                {' ' + ingredient.measureUnit}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
