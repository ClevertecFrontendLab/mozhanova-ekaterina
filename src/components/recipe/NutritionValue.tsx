import { Box, Flex, Text } from '@chakra-ui/react';

export function NutritionValue({
    nutritionValue: { calories, proteins, fats, carbohydrates },
}: {
    nutritionValue: { calories: number; proteins: number; fats: number; carbohydrates: number };
}) {
    return (
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
                gap={{
                    base: 3,
                    lg: 6,
                }}
            >
                <Flex
                    direction={{
                        base: 'row',
                        sm: 'column',
                    }}
                    borderColor='border.light'
                    borderWidth='1px'
                    borderRadius='16px'
                    p={{
                        base: '0 12px',
                        sm: 4,
                    }}
                    h={{
                        base: '64px',
                        sm: '136px',
                    }}
                    w={{
                        base: 'auto',
                        sm: '173px',
                    }}
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Text
                        flexBasis='40%'
                        textTransform='lowercase'
                        color='neutral.200'
                        fontSize='sm'
                    >
                        калорийность
                    </Text>
                    <Text
                        color='primary.700'
                        fontWeight={500}
                        fontSize={{
                            base: '2xl',
                            sm: '4xl',
                        }}
                    >
                        {calories}
                    </Text>
                    <Text
                        color='neutral.350'
                        textTransform='uppercase'
                        flexBasis='20%'
                        fontWeight={600}
                        fontSize={{
                            base: 'xs',
                            sm: 'sm',
                        }}
                    >
                        ККАЛ
                    </Text>
                </Flex>
                <Flex
                    direction={{
                        base: 'row',
                        sm: 'column',
                    }}
                    borderColor='border.light'
                    borderWidth='1px'
                    borderRadius='16px'
                    p={{
                        base: '0 12px',
                        sm: 4,
                    }}
                    h={{
                        base: '64px',
                        sm: '136px',
                    }}
                    w={{
                        base: 'auto',
                        sm: '173px',
                    }}
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Text
                        flexBasis='40%'
                        textTransform='lowercase'
                        color='neutral.200'
                        fontSize='sm'
                    >
                        белки
                    </Text>
                    <Text
                        color='primary.700'
                        fontWeight={500}
                        fontSize={{
                            base: '2xl',
                            sm: '4xl',
                        }}
                    >
                        {proteins}
                    </Text>
                    <Text
                        textTransform='uppercase'
                        flexBasis='20%'
                        fontWeight={600}
                        fontSize={{
                            base: 'xs',
                            sm: 'sm',
                        }}
                        color='neutral.350'
                    >
                        ГРАММ
                    </Text>
                </Flex>
                <Flex
                    direction={{
                        base: 'row',
                        sm: 'column',
                    }}
                    borderColor='border.light'
                    borderWidth='1px'
                    borderRadius='16px'
                    p={{
                        base: '0 12px',
                        sm: 4,
                    }}
                    h={{
                        base: '64px',
                        sm: '136px',
                    }}
                    w={{
                        base: 'auto',
                        sm: '173px',
                    }}
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Text
                        flexBasis='40%'
                        textTransform='lowercase'
                        color='neutral.200'
                        fontSize='sm'
                    >
                        жиры
                    </Text>
                    <Text
                        color='primary.700'
                        fontWeight={500}
                        fontSize={{
                            base: '2xl',
                            sm: '4xl',
                        }}
                    >
                        {fats}
                    </Text>
                    <Text
                        textTransform='uppercase'
                        flexBasis='20%'
                        fontWeight={600}
                        fontSize={{
                            base: 'xs',
                            sm: 'sm',
                        }}
                        color='neutral.350'
                    >
                        ГРАММ
                    </Text>
                </Flex>
                <Flex
                    direction={{
                        base: 'row',
                        sm: 'column',
                    }}
                    borderColor='border.light'
                    borderWidth='1px'
                    borderRadius='16px'
                    p={{
                        base: '0 12px',
                        sm: 4,
                    }}
                    h={{
                        base: '64px',
                        sm: '136px',
                    }}
                    w={{
                        base: 'auto',
                        sm: '173px',
                    }}
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Text
                        flexBasis='40%'
                        textTransform='lowercase'
                        color='neutral.200'
                        fontSize='sm'
                    >
                        углеводы
                    </Text>
                    <Text
                        color='primary.700'
                        fontWeight={500}
                        fontSize={{
                            base: '2xl',
                            sm: '4xl',
                        }}
                    >
                        {carbohydrates}
                    </Text>
                    <Text
                        textTransform='uppercase'
                        flexBasis='20%'
                        fontWeight={600}
                        fontSize={{
                            base: 'xs',
                            sm: 'sm',
                        }}
                        color='neutral.350'
                    >
                        ГРАММ
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
}
