import { Flex, Text } from '@chakra-ui/react';

type Props = {
    title: string;
    value: number;
    unit: string;
};

export const NutritionCard = ({ title, value, unit }: Props) => (
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
        <Text flexBasis='40%' textTransform='lowercase' color='neutral.200' fontSize='sm'>
            {title}
        </Text>
        <Text
            color='primary.700'
            fontWeight={500}
            fontSize={{
                base: '2xl',
                sm: '4xl',
            }}
        >
            {value}
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
            {unit}
        </Text>
    </Flex>
);
