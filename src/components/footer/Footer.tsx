import { Flex, Text, useMediaQuery } from '@chakra-ui/react';

import { LogoutButton } from './LogoutButton';

export const Footer = () => {
    const [isLargerThanMD] = useMediaQuery('(min-width: 1001px)', { ssr: false });

    return (
        <Flex
            zIndex={-10}
            position='absolute'
            bottom={0}
            left={0}
            data-test-id='footer'
            gap='16px'
            direction='column'
            padding='16px 24px 32px'
        >
            <Text fontWeight='500' color='neutral.100' fontSize='sm'>
                Версия программы 03.25
            </Text>
            <Text fontSize='sm' noOfLines={3} color='text.secondary'>
                Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
            </Text>
            {isLargerThanMD && <LogoutButton />}
        </Flex>
    );
};
