import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

export function IngredientsTable({
    ingredients,
    portions,
}: {
    ingredients: {
        title: string;
        count: string;
        measureUnit: string;
    }[];
    portions: number;
}) {
    const [portionsQuantity, setPortionsQuantity] = useState(portions);

    return (
        <TableContainer>
            <Table variant='custom'>
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
                                <NumberInput
                                    value={portionsQuantity}
                                    color='neutral.400'
                                    focusBorderColor='primary.300'
                                    onChange={(value) => setPortionsQuantity(Number(value))}
                                >
                                    <NumberInputField w='90px' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper data-test-id='increment-stepper' />
                                        <NumberDecrementStepper data-test-id='decrement-stepper' />
                                    </NumberInputStepper>
                                </NumberInput>
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
                                {(Number(ingredient.count) / portions) * portionsQuantity || ''}
                                {' ' + ingredient.measureUnit}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
