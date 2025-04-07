import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading } from '@chakra-ui/react';

import { BlogCard } from './BlogCard';
import { UiButton } from './ui/UiButton';

export function BlogsSection() {
    return (
        <Box bg='primary.200' p='24px' borderRadius='16px'>
            <Flex justifyContent='space-between' pb='24px'>
                <Heading as='h2' size='xl' fontWeight='400'>
                    Кулинарные блоги
                </Heading>
                <UiButton
                    text='Все авторы'
                    variant='primaryGhost'
                    rightIcon={<ArrowForwardIcon />}
                />
            </Flex>
            <Flex gap='16px'>
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
            </Flex>
        </Box>
    );
}
