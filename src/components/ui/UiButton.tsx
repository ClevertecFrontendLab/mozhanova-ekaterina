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
    solidAccent: {
        bg: 'primary.300',
        borderColor: 'primary.300',
        borderWidth: '1px',
        color: 'neutral.400',
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
    leftIcon?: React.ReactElement | undefined;
    icon?: React.ReactElement;
    variant?: keyof typeof variants;
    size?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg'>;
    iconButton?: boolean;
    fontSize?: string;
    isDisabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    zIndex?: number;
    ref?: React.Ref<HTMLButtonElement>;
    'data-test-id'?: string;
    onClick?: () => void;
};

export const UiButton = ({
    size = 'sm',
    variant = 'outline',
    iconButton = false,
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
            icon={props.icon}
            type={type}
            {...props}
        />
    ) : (
        <Button
            ref={props.ref}
            data-test-id={props['data-test-id']}
            zIndex={props.zIndex}
            size={size}
            bg={variants[variant].bg}
            borderColor={variants[variant].borderColor}
            borderWidth={variants[variant].borderWidth}
            rightIcon={props.rightIcon}
            leftIcon={props.leftIcon}
            color={variants[variant].color}
            fontSize={props.fontSize}
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
            {props.text}
        </Button>
    );
