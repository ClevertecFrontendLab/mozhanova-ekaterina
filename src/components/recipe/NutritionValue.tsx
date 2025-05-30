import { Box, Flex, Text } from '@chakra-ui/react';

import { NutritionCard } from './NutritionCard';

export const NutritionValue = ({
    nutritionValue: { calories, protein, fats, carbohydrates },
}: {
    nutritionValue: { calories: number; protein: number; fats: number; carbohydrates: number };
}) => (
    <Box mb={5}>
        <Text
            mb={{
                base: 3,
            }}
            fontSize='sm'
        >
            * Калорийность на 1 порцию
        </Text>
        <Flex
            direction={{
                base: 'column',
                sm: 'row',
            }}
            justify='center'
            gap={{
                base: 3,
                lg: 6,
            }}
        >
            <NutritionCard title='калории' value={calories} unit='ккал' />
            <NutritionCard title='углеводы' value={carbohydrates} unit='ГРАММ' />
            <NutritionCard title='жиры' value={fats} unit='ГРАММ' />
            <NutritionCard title='белки' value={protein} unit='ГРАММ' />
        </Flex>
    </Box>
);
