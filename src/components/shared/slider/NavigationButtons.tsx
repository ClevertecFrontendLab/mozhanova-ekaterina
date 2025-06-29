import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Z_INDEX_CONFIG } from '~/constants/z-index-config';

export const NavigationButtons = () => (
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
            zIndex={Z_INDEX_CONFIG.SLIDER_BTNS}
            data-test-id={DATA_TEST_IDS.CAROUSEL_BACK}
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
            zIndex={Z_INDEX_CONFIG.SLIDER_BTNS}
            data-test-id={DATA_TEST_IDS.CAROUSEL_FORWARD}
        >
            <ArrowForwardIcon w='24px' h='24px' color='neutral.0' />
        </IconButton>
    </Box>
);
