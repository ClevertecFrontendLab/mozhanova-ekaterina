import { Flex, Image, Text } from '@chakra-ui/react';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './icons/EmojiHeartEyesIcon';

type Props = {
    category: string[];
    likes: number;
    bookmarks: number;
    categoryBgColor: 'secondary.100' | 'primary.100';
};

export function UiCardInfo({ category, likes, bookmarks, categoryBgColor }: Props) {
    return (
        <Flex w='100%' justifyContent='space-between' alignItems='center'>
            <Flex
                gap='8px'
                borderRadius='4px'
                padding='2px 8px'
                fontSize='14px'
                bg={categoryBgColor}
                alignItems='center'
                position={{
                    base: 'absolute',
                    md: 'static',
                }}
                top='8px'
                left='8px'
            >
                {category.map((item) => (
                    <>
                        <Image w='16px' h='16px' src='' alt='icon' />
                        <Text fontSize='sm' whiteSpace='nowrap'>
                            {item}
                        </Text>
                    </>
                ))}
            </Flex>
            {bookmarks || likes ? (
                <Flex
                    alignItems='center'
                    fontSize='12px'
                    gap='8px'
                    color='primary.400'
                    fontWeight='600'
                >
                    {bookmarks ? (
                        <Flex p='4px' gap='6px'>
                            <BookmarkHeartIcon />
                            {bookmarks}
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
    );
}
