import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

type Props = {
    direction: 'left' | 'right';
    onClick?: () => void;
};

export function UiSliderButton({ direction, ...props }: Props) {
    return (
        <>
            {direction === 'left' && (
                <IconButton
                    aria-label='slider left'
                    position='absolute'
                    top='147px'
                    left='-8px'
                    w='48px'
                    h='48px'
                    bg='background.black'
                    {...props}
                >
                    <ArrowBackIcon color='neutral.0' />
                </IconButton>
            )}
            {direction === 'right' && (
                <IconButton
                    aria-label='slider right'
                    position='absolute'
                    top='147px'
                    right='-8px'
                    w='48px'
                    h='48px'
                    bg='background.black'
                    {...props}
                >
                    <ArrowForwardIcon color='neutral.0' />
                </IconButton>
            )}
        </>
    );
}
