import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router';

import { useGetPopularRecipesQuery } from '~/query/recipe-api';

import { UiButton } from '../ui/UiButton';
import { UiCard } from '../ui/UiCard';

export function TheJuiciestSection() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const { data, isLoading, isError } = useGetPopularRecipesQuery({
        limit: 4,
    });

    if (isError || isLoading) return null;

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
                        data-test-id='juiciest-link'
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
                {data?.data.map((recipe, i) => (
                    <UiCard
                        index={i}
                        key={recipe._id}
                        data={recipe}
                        size='lg'
                        recommendation='Елена Высоцкая'
                    />
                ))}
            </SimpleGrid>

            <Box textAlign='center'>
                <Link to='/the-juiciest' hidden={isLargerThanMD}>
                    <UiButton
                        data-test-id='juiciest-link-mobile'
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
