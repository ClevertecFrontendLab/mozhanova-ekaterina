import { Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './icons/EmojiHeartEyesIcon';
import { UiButton } from './UiButton';

type Props = {
    title: string;
    text: string;
    imgSrc: string;
    category: {
        title: string;
        iconSrc: string;
    };
    likes: number;
    favorites: number;
    recommendation?: string;
};

export function UiCard({ title, text, imgSrc, category, recommendation, likes, favorites }: Props) {
    return (
        <Card
            position='relative'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '346px' }}
                src={imgSrc}
                alt='card image'
            />
            {recommendation && (
                <Flex
                    position='absolute'
                    bottom='20px'
                    left='24px'
                    bg='accent.200'
                    padding='4px 8px'
                    gap='8px'
                    fontSize='14px'
                    borderRadius='4px'
                >
                    <img src='/src/assets/Avatar.png' alt='avatar' />
                    {recommendation} рекомендует
                </Flex>
            )}

            <Stack>
                <CardBody>
                    <Flex mb='24px' justifyContent='space-between' alignItems='center'>
                        <Flex
                            gap='8px'
                            borderRadius='4px'
                            padding='2px 8px'
                            fontSize='14px'
                            bg='accent.400'
                            alignItems='center'
                        >
                            <Image w='16px' h='16px' src={category.iconSrc} alt='icon' />
                            {category.title}
                        </Flex>
                        {favorites || likes ? (
                            <Flex
                                alignItems='center'
                                fontSize='12px'
                                gap='8px'
                                color='brand.400'
                                fontWeight='600'
                            >
                                {favorites ? (
                                    <Flex p='4px' gap='6px'>
                                        <BookmarkHeartIcon />
                                        {favorites}
                                    </Flex>
                                ) : null}
                                {likes ? (
                                    <Flex p='4px' gap='6px'>
                                        <EmojiHeartEyesIcon />
                                        {likes}
                                    </Flex>
                                ) : null}
                            </Flex>
                        ) : null}
                    </Flex>
                    <Flex mb='24px' gap='8px' direction='column' maxW='274px'>
                        <Heading as='h3' fontWeight='500' size='md' noOfLines={1}>
                            {title}
                        </Heading>
                        <Text fontSize='sm' noOfLines={3}>
                            {text}
                        </Text>
                    </Flex>
                </CardBody>

                <CardFooter gap='8px' justifyContent='flex-end'>
                    <UiButton text='Сохранить' leftIcon={<BookmarkHeartIcon />} />
                    <UiButton text='Готовить' variant='solid' />
                </CardFooter>
            </Stack>
        </Card>
    );
}
