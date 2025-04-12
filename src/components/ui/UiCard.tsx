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
    useMediaQuery,
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
    size?: 'sm' | 'md' | 'lg';
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
    size = 'lg',
    direction = 'column',
    controls = false,
    infoPosition = 'bottom',
    categoryBgColor = 'primary.100',
}: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

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
            size={isLargerThanMD ? size : 'sm'}
            h={direction === 'row' ? 'auto' : '100%'}
        >
            {imgSrc ? (
                <Image
                    objectFit='cover'
                    maxW={{ base: '158px', md: '100%' }}
                    maxH={{ base: '128px', md: '100%' }}
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

            <Stack spacing={0} flexGrow={1}>
                <CardBody>
                    {infoPosition === 'top' && (
                        <Box
                            pb={{
                                base: 0,
                                md: 6,
                            }}
                        >
                            <UiCardInfo
                                categoryBgColor={categoryBgColor}
                                category={category}
                                likes={likes}
                                favorites={favorites}
                            />
                        </Box>
                    )}
                    <Flex
                        gap={{
                            base: 5,
                            md: 2,
                        }}
                        direction='column'
                        textAlign='left'
                    >
                        <Heading
                            as='h3'
                            fontWeight='500'
                            size={{
                                base: 'sm',
                                md: 'md',
                            }}
                            noOfLines={{
                                base: 2,
                                md: 1,
                            }}
                        >
                            {title}
                        </Heading>
                        <Text fontSize='sm' noOfLines={3}>
                            {isLargerThanMD ? text : null}
                        </Text>
                    </Flex>
                </CardBody>

                <CardFooter>
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
                            <UiButton
                                size={isLargerThanMD ? 'sm' : 'xs'}
                                text='Сохранить'
                                leftIcon={<BookmarkHeartIcon />}
                                icon={<BookmarkHeartIcon />}
                                iconButton={!isLargerThanMD}
                            />
                            <UiButton
                                size={isLargerThanMD ? 'sm' : 'xs'}
                                text='Готовить'
                                variant='solid'
                            />
                        </Flex>
                    ) : null}
                </CardFooter>
            </Stack>
        </Card>
    );
}
