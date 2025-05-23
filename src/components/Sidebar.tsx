import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';

import { ProfileNotification } from './shared/ProfileNotification';
import { UiIconButton } from './ui/UiIconButton';

export const Sidebar = () => (
    <Flex
        position='relative'
        direction='column'
        justifyContent='space-between'
        alignItems='center'
        h='100%'
        pt={4}
    >
        <ProfileNotification />

        <Box position='absolute' bottom='52px' left={0} right={0}>
            <UiIconButton
                text='Записать рецепт'
                icon={<EditIcon width='24px' height='24px' />}
                variant='primary'
            />
        </Box>
    </Flex>
);
