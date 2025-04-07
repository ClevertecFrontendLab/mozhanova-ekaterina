import { Button } from '@chakra-ui/react';

const variants = {
    primary: {
        bg: 'primary.300',
        borderColor: 'transparent',
        borderWidth: '1px',
        color: 'neutral.400',
    },
    primaryGhost: {
        bg: 'transparent',
        borderColor: 'transparent',
        borderWidth: '1px',
        color: 'neutral.400',
    },
    outline: {
        bg: 'transparent',
        borderColor: 'neutral.400',
        borderWidth: '1px',
        color: 'neutral.900',
    },
    accentOutline: {
        bg: 'transparent',
        borderColor: 'primary.400',
        borderWidth: '1px',
        color: 'primary.400',
    },
    solid: {
        bg: 'neutral.400',
        borderColor: 'neutral.400',
        borderWidth: '1px',
        color: 'neutral.0',
    },
};

type Props = {
    text: string;
    rightIcon?: React.ReactElement;
    leftIcon?: React.ReactElement;
    variant?: keyof typeof variants;
    size?: string;
    onClick?: () => void;
};

export function UiButton({
    text,
    rightIcon,
    leftIcon,
    size = 'sm',
    variant = 'outline',
    ...props
}: Props) {
    return (
        <Button
            size={size}
            bg={variants[variant].bg}
            borderColor={variants[variant].borderColor}
            borderWidth={variants[variant].borderWidth}
            rightIcon={rightIcon}
            leftIcon={leftIcon}
            color={variants[variant].color}
            {...props}
        >
            {text}
        </Button>
    );
}
