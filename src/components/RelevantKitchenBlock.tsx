import { Box, Flex, Grid } from '@chakra-ui/react';

import { TRecipe } from '~/types';

import { SectionHeading } from './SectionHeading';
import { UiCard } from './ui/UiCard';
import { UiCardMini } from './ui/UiCardMini';

type Props = {
    heading: string;
    description: string;
    data: TRecipe[];
};

export function RelevantKitchenBlock({ heading, description, data }: Props) {
    return (
        <Flex direction='column' gap='24px'>
            <Box pt='24px' borderTop='1px solid' borderColor='border.light'>
                <SectionHeading title={heading} description={description} />
            </Box>
            <Flex gap='24px'>
                <Grid templateColumns='repeat(2, 1fr)' gap='24px' flexBasis='50%'>
                    {data.slice(0, 2).map((recipe) => (
                        <UiCard
                            key={recipe.id}
                            imgSrc={recipe.imageSrc}
                            title={recipe.title}
                            text={recipe.description}
                            category={recipe.category}
                            favorites={recipe.favorites}
                            likes={recipe.likes}
                            categoryBgColor='secondary.100'
                        />
                    ))}
                </Grid>

                <Flex basis='50%' direction='column' gap='12px'>
                    {data.slice(-3).map((recipe) => (
                        <UiCardMini
                            key={recipe.id}
                            title={recipe.title}
                            iconSrc={recipe.category.iconSrc}
                        />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
}
