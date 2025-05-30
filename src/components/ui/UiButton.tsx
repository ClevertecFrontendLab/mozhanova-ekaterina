import { Button, IconButton, ResponsiveValue } from '@chakra-ui/react';

const variants = {
    primary: {
        bg: 'primary.300',
        borderColor: 'primary.300',
        borderWidth: '1px',
        color: 'neutral.400',
    },
    primaryGhost: {
        bg: 'transparent',
        borderColor: 'transparent',
        borderWidth: '1px',
        color: 'neutral.400',
    },
    primaryOutline: {
        bg: 'transparent',
        borderColor: 'neutral.200',
        borderWidth: '1px',
        color: 'neutral.400',
    },
    outline: {
        bg: 'transparent',
        borderColor: 'border.dark',
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
    ghost: {
        bg: 'transparent',
        borderColor: 'transparent',
        borderWidth: '1px',
        color: 'neutral.400',
    },
};

type Props = {
    text?: string;
    rightIcon?: React.ReactElement;
    leftIcon?: React.ReactElement;
    icon?: React.ReactElement;
    variant?: keyof typeof variants;
    size?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg'>;
    iconButton?: boolean;
    fontSize?: string;
    isDisabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    'data-test-id'?: string;
    onClick?: () => void;
};

export const UiButton = ({
    text,
    rightIcon,
    leftIcon,
    size = 'sm',
    variant = 'outline',
    iconButton = false,
    icon,
    fontSize,
    type = 'button',
    ...props
}: Props) =>
    iconButton ? (
        <IconButton
            size={size}
            bg={variants[variant].bg}
            borderColor={variants[variant].borderColor}
            borderWidth={variants[variant].borderWidth}
            color={variants[variant].color}
            aria-label='button'
            icon={icon}
            type={type}
            {...props}
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
            _hover={{
                bg: variants[variant].bg,
                opacity: 0.8,
            }}
            _active={{
                boxShadow: 'none',
            }}
            pointerEvents={props.isDisabled ? 'none' : 'auto'}
            type={type}
            {...props}
        >
            {text}
        </Button>
    );
