import { Flex, Text } from '@chakra-ui/react';

const variants = {
    primary: {
        bg: 'background.black',
        shadow: 'themeAccent',
        iconColor: 'secondary.100',
    },
    default: {
        bg: 'transparent',
        shadow: 'none',
        iconColor: 'neutral.400',
    },
};

type Props = {
    text: string;
    icon: React.ReactElement;
    variant?: keyof typeof variants;
};

export function UiIconButton({ icon, text, variant = 'default', ...props }: Props) {
    return (
        <Flex
            as='button'
            cursor='pointer'
            direction='column'
            alignItems='center'
            m='0 auto'
            {...props}
        >
            <Flex
                justifyContent='center'
                alignItems='center'
                borderRadius='50%'
                width='48px'
                height='48px'
                bg={variants[variant].bg}
                boxShadow={variants[variant].shadow}
                color={variants[variant].iconColor}
                mb={{
                    base: 0,
                    lg: 3,
                }}
            >
                {icon}
            </Flex>
            <Text fontSize='xs' whiteSpace='nowrap'>
                {text}
            </Text>
        </Flex>
    );
}
