import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';

export function NavigationButtons() {
    return (
        <Box display={{ base: 'none', md: 'block' }}>
            <IconButton
                className='custom-prev'
                aria-label='Previous slide'
                position='absolute'
                top='147px'
                left='-8px'
                w='48px'
                h='48px'
                bg='background.black'
                zIndex={100}
            >
                <ArrowBackIcon w='24px' h='24px' color='neutral.0' />
            </IconButton>
            <IconButton
                className='custom-next'
                aria-label='Next slide'
                position='absolute'
                top='147px'
                right='-8px'
                w='48px'
                h='48px'
                bg='background.black'
                zIndex={100}
            >
                <ArrowForwardIcon w='24px' h='24px' color='neutral.0' />
            </IconButton>
        </Box>
    );
}
