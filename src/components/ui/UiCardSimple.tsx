import { Box, Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { defineCategoryImage, defineCategoryLabel } from '~/helper';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './icons/EmojiHeartEyesIcon';

type Props = {
    categoryBgColor: string;
    title: string;
    description: string;
    category: string[];
    likes: number;
    bookmarks: number;
};

export function UiCardSimple({
    categoryBgColor,
    title,
    description,
    category,
    likes,
    bookmarks,
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
                <Flex>
                    <Flex
                        position='relative'
                        gap='8px'
                        borderRadius='4px'
                        padding='2px 8px'
                        fontSize='14px'
                        bg={categoryBgColor}
                        alignItems='center'
                    >
                        {/* {category.map((item) => ( */}
                        <>
                            <Image
                                w='16px'
                                h='16px'
                                src={defineCategoryImage(category[0])}
                                alt='icon'
                            />
                            <Text fontSize='sm' whiteSpace='nowrap'>
                                {defineCategoryLabel(category[0])}
                            </Text>
                        </>
                    </Flex>
                    {bookmarks || likes ? (
                        <Flex
                            right={{
                                base: '12px',
                                lg: '24px',
                            }}
                            bottom={{
                                base: '12px',
                                lg: '20px',
                            }}
                            position='absolute'
                            alignItems='center'
                            fontSize='12px'
                            gap='8px'
                            color='primary.400'
                            fontWeight='600'
                            zIndex={50}
                            bgColor='neutral.0'
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
            </CardBody>
        </Card>
    );
}
