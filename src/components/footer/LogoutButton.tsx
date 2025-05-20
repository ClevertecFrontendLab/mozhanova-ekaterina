import { Flex, Text } from '@chakra-ui/react';

import { LeftIcon } from '../ui/icons/LeftIcon';

export const LogoutButton = () => (
    <Flex gap='6px' alignItems='center'>
        <LeftIcon />
        <Text fontWeight='600' fontSize='sm'>
            Выйти
        </Text>
    </Flex>
);
