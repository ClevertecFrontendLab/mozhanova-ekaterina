import { Flex, Image } from '@chakra-ui/react';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './icons/EmojiHeartEyesIcon';

type Props = {
    category: {
        title: string;
        iconSrc: string;
    };
    likes: number;
    favorites: number;
    categoryBgColor: 'accent.400' | 'accent.200';
};

export function UiCardInfo({ category, likes, favorites, categoryBgColor }: Props) {
    return (
        <Flex w='100%' justifyContent='space-between' alignItems='center'>
            <Flex
                gap='8px'
                borderRadius='4px'
                padding='2px 8px'
                fontSize='14px'
                bg={categoryBgColor}
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
    );
}
