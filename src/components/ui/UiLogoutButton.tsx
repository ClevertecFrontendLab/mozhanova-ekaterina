import { Flex, Text } from '@chakra-ui/react';

import { LeftIcon } from './icons/LeftIcon';

export function UiLogoutButton() {
    return (
        <Flex gap='6px' alignItems='center'>
            <LeftIcon />
            <Text fontWeight='600' fontSize='sm'>
                Выйти
            </Text>
        </Flex>
    );
}
