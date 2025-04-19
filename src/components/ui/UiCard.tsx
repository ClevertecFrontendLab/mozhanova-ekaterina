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
import { Link, useParams } from 'react-router';

import { TRecipe } from '~/types';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { UiButton } from './UiButton';
import { UiCardInfo } from './UiCardInfo';

type Props = {
    data: TRecipe;
    size?: 'sm' | 'md' | 'lg';
    recommendation?: string;
    categoryBgColor?: 'secondary.100' | 'primary.100';
};

export function UiCard({
    data: { title, description, image, category, likes, bookmarks, subcategory, id },
    recommendation,
    size = 'lg',
}: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const params = useParams();

    return (
        <Card
            position='relative'
            direction='row'
            overflow='hidden'
            variant='outline'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: 'themeNeutralGreen',
            }}
            size={isLargerThanMD ? size : 'sm'}
            h='auto'
        >
            <Image
                objectFit='cover'
                maxW={{
                    base: '158px',
                    md: '346px',
                }}
                maxH='100%'
                src={image}
                alt='card image'
            />

            {recommendation && isLargerThanMD && (
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
                    <img
                        width='16px'
                        height='16px'
                        src='/src/assets/blog_avatar_1.png'
                        alt='avatar'
                    />
                    {recommendation} рекомендует
                </Flex>
            )}

            <Stack spacing={0} flexGrow={1}>
                <CardBody>
                    <Box
                        pb={{
                            base: 0,
                            md: 6,
                        }}
                    >
                        <UiCardInfo
                            categoryBgColor='secondary.100'
                            category={category}
                            likes={likes}
                            bookmarks={bookmarks}
                            alignItems='flex-start'
                        />
                    </Box>
                    <Link
                        to={`/${params.category || category[0]}/${params.subCategory || subcategory[0]}/${id}`}
                    >
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
                                {isLargerThanMD ? description : null}
                            </Text>
                        </Flex>
                    </Link>
                </CardBody>

                <CardFooter>
                    <Flex gap='8px' justifyContent='flex-end' w='100%'>
                        <UiButton
                            size={isLargerThanMD ? 'sm' : 'xs'}
                            text='Сохранить'
                            leftIcon={<BookmarkHeartIcon />}
                            icon={<BookmarkHeartIcon size={!isLargerThanMD ? '12px' : '16px'} />}
                            iconButton={!isLargerThanMD}
                        />
                        <UiButton
                            size={isLargerThanMD ? 'sm' : 'xs'}
                            text='Готовить'
                            variant='solid'
                        />
                    </Flex>
                </CardFooter>
            </Stack>
        </Card>
    );
}
