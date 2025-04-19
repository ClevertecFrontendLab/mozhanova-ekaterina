import { Flex, Heading, Image, Text } from '@chakra-ui/react';

import { PeopleOutlineIcon } from '../ui/icons/PeopleOutlineIcon';
import { PeoplePlusIcon } from '../ui/icons/PeoplePlusIcon';
import { UiButton } from '../ui/UiButton';

export function AuthorInfo() {
    return (
        <Flex
            p={{ base: 3, sm: 6 }}
            borderRadius='8px'
            bgColor='primary.200'
            gap={{ base: 2, sm: 4 }}
            position='relative'
            mb={{ base: 10, md: 8 }}
        >
            <Image w='96px' h='96px' borderRadius='50%' src='/src/assets/ava_1.png' alt='avatar' />
            <Flex direction='column' grow={1}>
                <Heading mt={2} fontSize='lg' fontWeight={600}>
                    Сергей Разумов
                </Heading>
                <Text
                    position='absolute'
                    top={{ base: '8px', sm: '24px' }}
                    right={{ base: '8px', sm: '24px' }}
                    fontSize={{ base: 'xs', sm: 'sm' }}
                >
                    Автор рецепта
                </Text>
                <Text fontSize='sm' color='neutral.300'>
                    @serge25
                </Text>
                <Flex mt={{ base: 4 }} justifyContent='space-between' alignItems='center'>
                    <UiButton
                        size='xs'
                        leftIcon={<PeoplePlusIcon />}
                        variant='solid'
                        text='Подписаться'
                    />
                    <Flex alignItems='center' gap='6px'>
                        <PeopleOutlineIcon />
                        <Text fontWeight={600} fontSize='xs' color='primary.700'>
                            125
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
