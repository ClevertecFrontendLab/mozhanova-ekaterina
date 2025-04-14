import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Heading, SimpleGrid, useMediaQuery } from '@chakra-ui/react';

import { BlogCard } from './BlogCard';
import { UiButton } from './ui/UiButton';

export function BlogsSection() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

    return (
        <Flex
            direction='column'
            bg='primary.200'
            p={{
                base: 3,
                md: 6,
            }}
            borderRadius='16px'
            gap={{
                base: 3,
                md: 4,
            }}
        >
            <Flex justifyContent='space-between'>
                <Heading
                    as='h2'
                    fontSize={{
                        base: '24px',
                        md: '36px',
                    }}
                    fontWeight='500'
                >
                    Кулинарные блоги
                </Heading>
                {isLargerThanMD && (
                    <UiButton
                        text='Все авторы'
                        variant='primaryGhost'
                        rightIcon={<ArrowForwardIcon />}
                        size='lg'
                    />
                )}
            </Flex>
            <SimpleGrid
                columns={{
                    base: 1,
                    sm: 3,
                }}
                gap={{
                    base: 3,
                    md: 4,
                }}
            >
                <BlogCard
                    avatarSrc='/src/assets/blog_avatar_1.png'
                    title='Елена Высоцкая'
                    subtitle='@elenapovar'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                />
                <BlogCard
                    avatarSrc='/src/assets/blog_avatar_2.png'
                    title='Alex Cook'
                    subtitle='@funtasticooking'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                />
                <BlogCard
                    avatarSrc='/src/assets/blog_avatar_3.png'
                    title='Екатерина Константинопольская'
                    subtitle='@bake_and_pie'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                />
            </SimpleGrid>
            {!isLargerThanMD && (
                <UiButton
                    text='Все авторы'
                    variant='primaryGhost'
                    rightIcon={<ArrowForwardIcon />}
                    size='md'
                />
            )}
        </Flex>
    );
}
