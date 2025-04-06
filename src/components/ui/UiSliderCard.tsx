import { Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './icons/EmojiHeartEyesIcon';

type Props = {
    imgSrc: string;
    title: string;
    text: string;
    category: {
        title: string;
        iconSrc: string;
    };
    favorites?: number;
    likes?: number;
};

export function UiSliderCard({ imgSrc, title, text, category, likes, favorites }: Props) {
    return (
        <Card
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
        >
            <Image src={imgSrc} alt='slider card image' />
            <CardBody>
                <Stack>
                    <Heading as='h3' size='md' fontWeight='500' noOfLines={1}>
                        {title}
                    </Heading>
                    <Text fontSize='sm' noOfLines={3}>
                        {text}
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter justifyContent='space-between'>
                <Flex
                    gap='8px'
                    borderRadius='4px'
                    padding='2px 8px'
                    fontSize='14px'
                    bg='accent.200'
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
            </CardFooter>
        </Card>
    );
}
