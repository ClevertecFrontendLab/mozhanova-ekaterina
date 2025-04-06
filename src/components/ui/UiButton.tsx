import { Button } from '@chakra-ui/react';

const variants = {
    primary: {
        bg: 'accent.600',
        borderColor: 'transparent',
        borderWidth: '1px',
        size: 'lg',
        color: 'neutral.900',
    },
    primaryGhost: {
        bg: 'transparent',
        borderColor: 'transparent',
        borderWidth: '1px',
        size: 'lg',
        color: 'neutral.900',
    },
    outline: {
        bg: 'transparent',
        borderColor: 'neutral.900',
        borderWidth: '1px',
        size: 'md',
        color: 'neutral.900',
    },
    accentOutline: {
        bg: 'transparent',
        borderColor: 'brand.400',
        borderWidth: '1px',
        size: 'md',
        color: 'brand.400',
    },
    solid: {
        bg: 'neutral.900',
        borderColor: 'neutral.900',
        borderWidth: '1px',
        size: 'md',
        color: 'neutral.50',
    },
};

type Props = {
    text: string;
    rightIcon?: React.ReactElement;
    leftIcon?: React.ReactElement;
    variant?: keyof typeof variants;
    onClick?: () => void;
};

export function UiButton({ text, rightIcon, leftIcon, variant = 'outline', ...props }: Props) {
    return (
        <Button
            size={variants[variant].size}
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
