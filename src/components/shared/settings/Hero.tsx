import { Avatar, AvatarBadge, Flex, Heading } from '@chakra-ui/react';

import { PictureIcon } from '~/components/ui/icons/PictureIcon';

type Props = {
    firstName?: string;
    lastName?: string;
};

export const Hero = ({ firstName = '', lastName = '' }: Props) => (
    <Flex direction={{ base: 'column' }} gap={4}>
        <Heading fontSize={{ base: '18px', md: '20px' }}>Авторизация и персонализация</Heading>
        <Avatar
            name={`${firstName} ${lastName}`}
            alignSelf={{ base: 'center', md: 'flex-start' }}
            size={{ base: 'xl', md: '2xl' }}
        >
            <AvatarBadge borderWidth='4px' boxSize='35px' bg='neutral.400'>
                <PictureIcon />
            </AvatarBadge>
        </Avatar>
    </Flex>
);
