import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { UiButton } from './UiButton';
import { UiCardInfo } from './UiCardInfo';

type Props = {
    title: string;
    text?: string;
    category: {
        title: string;
        iconSrc: string;
    };
    likes: number;
    favorites: number;
    imgSrc?: string;
    recommendation?: string;
    direction?: 'row' | 'column';
    controls?: boolean;
    infoPosition?: 'top' | 'bottom';
    categoryBgColor?: 'secondary.100' | 'primary.100';
};

export function UiCard({
    title,
    text,
    imgSrc,
    category,
    recommendation,
    likes,
    favorites,
    direction = 'column',
    controls = false,
    infoPosition = 'bottom',
    categoryBgColor = 'primary.100',
}: Props) {
    return (
        <Card
            position='relative'
            direction={direction}
            overflow='hidden'
            variant='outline'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: 'themeNeutralGreen',
            }}
        >
            {imgSrc ? (
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '346px' }}
                    src={imgSrc}
                    alt='card image'
                />
            ) : null}

            {recommendation && (
                <Flex
                    position='absolute'
                    bottom='20px'
                    left='24px'
                    bg='primary.100'
                    padding='4px 8px'
                    gap='8px'
                    fontSize='14px'
                    borderRadius='4px'
                >
                    <img src='/src/assets/Avatar.png' alt='avatar' />
                    {recommendation} рекомендует
                </Flex>
            )}

            <Stack gap='0'>
                <CardBody pl='24px' pr='24px'>
                    {infoPosition === 'top' && (
                        <Box pb='24px'>
                            <UiCardInfo
                                categoryBgColor={categoryBgColor}
                                category={category}
                                likes={likes}
                                favorites={favorites}
                            />
                        </Box>
                    )}
                    <Flex gap='8px' direction='column' textAlign='left'>
                        <Heading as='h3' fontWeight='500' size='md' noOfLines={1}>
                            {title}
                        </Heading>
                        <Text fontSize='sm' noOfLines={3}>
                            {text}
                        </Text>
                    </Flex>
                </CardBody>

                <CardFooter pl='24px' pr='24px' pt='0'>
                    {infoPosition === 'bottom' && (
                        <UiCardInfo
                            categoryBgColor={categoryBgColor}
                            category={category}
                            likes={likes}
                            favorites={favorites}
                        />
                    )}
                    {controls ? (
                        <Flex gap='8px' justifyContent='flex-end' w='100%'>
                            <UiButton text='Сохранить' leftIcon={<BookmarkHeartIcon />} />
                            <UiButton text='Готовить' variant='solid' />
                        </Flex>
                    ) : null}
                </CardFooter>
            </Stack>
        </Card>
    );
}
