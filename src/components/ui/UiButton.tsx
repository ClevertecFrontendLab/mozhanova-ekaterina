import { Button, IconButton } from '@chakra-ui/react';

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
    icon?: React.ReactElement;
    variant?: keyof typeof variants;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    iconButton?: boolean;
    fontSize?: string;
    dataTest?: string | null;
    onClick?: () => void;
};

export function UiButton({
    text,
    rightIcon,
    leftIcon,
    size = 'sm',
    variant = 'outline',
    iconButton = false,
    icon,
    fontSize,
    dataTest = null,
}: Props) {
    return iconButton ? (
        <IconButton
            size={size}
            bg={variants[variant].bg}
            borderColor={variants[variant].borderColor}
            borderWidth={variants[variant].borderWidth}
            color={variants[variant].color}
            aria-label='button'
            icon={icon}
        />
    ) : (
        <Button
            size={size}
            bg={variants[variant].bg}
            borderColor={variants[variant].borderColor}
            borderWidth={variants[variant].borderWidth}
            rightIcon={rightIcon}
            leftIcon={leftIcon}
            color={variants[variant].color}
            fontSize={fontSize}
            data-test-id={dataTest}
        >
            {text}
        </Button>
    );
}
