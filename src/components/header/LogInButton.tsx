import { Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { accessToken } from '~/store/user-slice';

import { LogInIcon } from '../ui/icons/LogInIcon';

export const LogInButton = () => {
    const isVisible = !useSelector(accessToken);
    return (
        <Flex display={isVisible ? 'flex' : 'none'}>
            <Link to={AppRoutes.SIGN_IN}>
                <Flex gap={2} alignItems='center'>
                    <Text whiteSpace='nowrap' fontWeight={600} fontSize='sm'>
                        Log in
                    </Text>
                    <Flex position='relative' top='1px'>
                        <LogInIcon />
                    </Flex>
                </Flex>
            </Link>
        </Flex>
    );
};
