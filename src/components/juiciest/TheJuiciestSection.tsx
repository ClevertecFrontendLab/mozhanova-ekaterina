import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { useMemo } from 'react';

import { useGetPopularRecipesQuery } from '~/query/recipe-api';

import JuiciestLink from './JuiciestLink';
import JuiciestList from './JuiciestList';

export function TheJuiciestSection() {
    const { data } = useGetPopularRecipesQuery({
        limit: 4,
    });

    return useMemo(
        () => (
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

                    <JuiciestLink />
                </Flex>

                <SimpleGrid
                    templateColumns={{
                        sm: 'repeat(2, 1fr)',
                        md: '1fr',
                        xl: 'repeat(2, 1fr)',
                    }}
                    spacing={6}
                >
                    <JuiciestList data={data?.data} />
                </SimpleGrid>
                <JuiciestLink variant='mobile' />
            </Flex>
        ),
        [data],
    );
}
