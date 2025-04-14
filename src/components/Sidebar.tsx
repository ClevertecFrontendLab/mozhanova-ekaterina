import { EditIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { ProfileNotification } from './ProfileNotification';
import { UiIconButton } from './ui/UiIconButton';

export function Sidebar() {
    return (
        <Flex
            direction='column'
            justifyContent='space-between'
            alignItems='center'
            h='100%'
            pl={16}
            pr={14}
            pb={12}
            pt={4}
        >
            <ProfileNotification />

            <UiIconButton
                text='Записать рецепт'
                icon={<EditIcon width='24px' height='24px' />}
                variant='primary'
            />
        </Flex>
    );
}
