import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';

import { TRecipe } from '~/types';

import { UiCardMini } from './ui/UiCardMini';
import { UiCardSimple } from './ui/UiCardSimple';

type Props = {
    heading: string;
    description: string;
    data: TRecipe[];
};

export function RelevantKitchenBlock({ heading, description, data }: Props) {
    return (
        <Box pb={4}>
            <Grid
                pt={{
                    base: 2,
                    md: 6,
                }}
                pb={{
                    base: 4,
                    md: 6,
                }}
                gap={{
                    base: 3,
                    lg: 4,
                    xl: 6,
                }}
                borderTop='1px solid'
                borderColor='border.light'
                templateColumns={{
                    base: '1fr',
                    sm: 'repeat(3, 1fr)',
                    lg: 'repeat(2, 1fr)',
                }}
            >
                <Heading
                    as='h2'
                    fontSize={{
                        base: '2xl',
                        md: '4xl',
                        lg: '5xl',
                    }}
                    fontWeight='500'
                >
                    {heading}
                </Heading>

                <Text
                    gridColumn={{
                        sm: '2/4',
                        lg: '2/3',
                    }}
                    fontWeight='500'
                    color='text.secondary'
                    fontSize={{
                        base: 'sm',
                        md: 'md',
                    }}
                >
                    {description}
                </Text>
            </Grid>

            <Grid
                gap={{
                    base: 3,
                    lg: 4,
                    xl: 6,
                }}
                templateColumns={{
                    base: '1fr',
                    sm: 'repeat(3, 1fr)',
                    xl: 'repeat(2, 1fr)',
                }}
            >
                <Grid
                    gap={{
                        base: 3,
                        lg: 4,
                        xl: 6,
                    }}
                    templateColumns={{
                        base: '1fr',
                        sm: 'repeat(2, 1fr)',
                    }}
                    gridColumn={{
                        sm: '1/3',
                        xl: '1/2',
                    }}
                >
                    {data.slice(0, 2).map((recipe) => (
                        <UiCardSimple
                            key={recipe.id}
                            categoryBgColor='secondary.100'
                            title={recipe.title}
                            description={recipe.description}
                            category={recipe.category}
                            likes={recipe.likes}
                            favorites={recipe.favorites}
                        />
                    ))}
                </Grid>

                <Flex
                    direction='column'
                    gap={{
                        base: 2.5,
                        md: 1.5,
                        lg: 3,
                    }}
                    minW={0}
                >
                    {data.slice(-3).map((recipe) => (
                        <UiCardMini
                            key={recipe.id}
                            title={recipe.title}
                            iconSrc={recipe.category.iconSrc}
                        />
                    ))}
                </Flex>
            </Grid>
        </Box>
    );
}
