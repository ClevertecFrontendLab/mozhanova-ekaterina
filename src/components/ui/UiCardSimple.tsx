import { Box, Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './icons/EmojiHeartEyesIcon';

type Props = {
    categoryBgColor: string;
    title: string;
    description?: string;
    category: { title: string; iconSrc: string };
    likes: number;
    favorites: number;
};

export function UiCardSimple({
    categoryBgColor,
    title,
    description,
    category,
    likes,
    favorites,
}: Props) {
    return (
        <Card
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: 'themeNeutralGreen',
            }}
            variant='outline'
        >
            <CardBody
                p={{
                    base: 3,
                    lg: 4,
                    xl: '24px 24px 20px',
                }}
                gap={{
                    base: 6,
                }}
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
            >
                <Box>
                    <Heading
                        as='h3'
                        fontWeight='500'
                        size={{
                            base: 'sm',
                            md: 'md',
                        }}
                        pb={2}
                        textOverflow='ellipsis'
                        whiteSpace='nowrap'
                        overflowX='hidden'
                    >
                        {title}
                    </Heading>
                    <Text fontSize='sm' noOfLines={3}>
                        {description}
                    </Text>
                </Box>
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
                        <Text fontSize='sm' whiteSpace='nowrap'>
                            {category.title}
                        </Text>
                    </Flex>
                    {favorites || likes ? (
                        <Flex
                            alignItems='center'
                            fontSize='12px'
                            gap='8px'
                            color='primary.400'
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
            </CardBody>
        </Card>
    );
}
