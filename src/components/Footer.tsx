import { Flex, Text } from '@chakra-ui/react';

import { LeftIcon } from './ui/icons/LeftIcon';

export function Footer() {
    return (
        <Flex gap='16px' direction='column' padding='0 24px 32px 24px'>
            <Text fontWeight='500' color='neutral.100' fontSize='sm'>
                Версия программы 03.25
            </Text>
            <Text fontSize='sm' noOfLines={3} color='neutral.400'>
                Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
            </Text>
            <Flex gap='6px' alignItems='center'>
                <LeftIcon />
                <Text fontWeight='600' fontSize='sm'>
                    Выйти
                </Text>
            </Flex>
        </Flex>
    );
}
