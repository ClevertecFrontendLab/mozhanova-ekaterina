import { Flex, Text } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useAppSelector } from '~/store/hooks';
import { accessToken } from '~/store/user-slice';

import { LogoutButton } from './LogoutButton';

export const Footer = () => {
    const token = useAppSelector(accessToken);

    return (
        <Flex
            data-test-id={DATA_TEST_IDS.FOOTER}
            position='absolute'
            bottom={0}
            left={0}
            gap={4}
            direction='column'
            padding='16px 24px 32px'
        >
            <Text fontWeight='500' color='neutral.100' fontSize='sm'>
                Версия программы 03.25
            </Text>
            <Text fontSize='sm' noOfLines={3} color='text.secondary'>
                Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
            </Text>
            {token && <LogoutButton />}
        </Flex>
    );
};
