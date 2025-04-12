import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router';

import { TRecipe } from '~/types';

import { UiButton } from './ui/UiButton';
import { UiCard } from './ui/UiCard';

type Props = {
    data: TRecipe[];
};

export function TheJuiciestSection({ data }: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');

    return (
        <Flex
            direction='column'
            gap={{
                base: 3,
                md: 6,
            }}
        >
            <Flex justifyContent='space-between' alignItems='center' gap='24px'>
                <Heading
                    as='h2'
                    fontSize={{
                        base: '2xl',
                        md: '4xl',
                        lg: '5xl',
                    }}
                    fontWeight='500'
                >
                    Самое сочное
                </Heading>

                <Link to='/the-juiciest' hidden={!isLargerThanMD}>
                    <UiButton
                        dataTest='juiciest-link'
                        variant='primary'
                        rightIcon={<ArrowForwardIcon />}
                        text='Вся подборка'
                        size='lg'
                    />
                </Link>
            </Flex>

            <SimpleGrid
                templateColumns={{
                    sm: 'repeat(2, 1fr)',
                    md: '1fr',
                    xl: 'repeat(2, 1fr)',
                }}
                spacing={6}
            >
                {data.map((recipe) => (
                    <UiCard
                        key={recipe.id}
                        title={recipe.title}
                        text={recipe.description}
                        imgSrc={recipe.imageSrc}
                        category={recipe.category}
                        likes={recipe.likes}
                        favorites={recipe.favorites}
                        direction='row'
                        infoPosition='top'
                        controls
                        categoryBgColor='secondary.100'
                        size={isLargerThanMD ? 'lg' : 'sm'}
                    />
                ))}
            </SimpleGrid>

            <Box textAlign='center'>
                <Link to='/the-juiciest' hidden={isLargerThanMD}>
                    <UiButton
                        dataTest='juiciest-link-mobile'
                        variant='primary'
                        rightIcon={<ArrowForwardIcon />}
                        text='Вся подборка'
                        size={isLargerThanMD ? 'lg' : 'md'}
                    />
                </Link>
            </Box>
        </Flex>
    );
}
