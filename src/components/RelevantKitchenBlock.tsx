import { Box, Flex, Grid } from '@chakra-ui/react';

import { categories } from '~/constants';
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
            <Box pt='24px' borderTop='1px solid' borderColor='neutral.200'>
                <SectionHeading title={heading} description={description} />
            </Box>
            <Flex gap='24px'>
                <Grid templateColumns='repeat(2, 1fr)' gap='24px' flexBasis='50%'>
                    {data.map((recipe) => (
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
                    <UiCardMini title='Стейк для вегетарианцев' iconSrc={categories[3].iconSrc} />
                    <UiCardMini
                        title='Котлеты из гречки и фасоли'
                        iconSrc={categories[3].iconSrc}
                    />
                    <UiCardMini
                        title='Сырный суп с лапшой и брокколи'
                        iconSrc={categories[2].iconSrc}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}
