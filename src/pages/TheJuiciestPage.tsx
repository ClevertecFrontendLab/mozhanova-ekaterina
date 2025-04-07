import { Box, Flex, Grid } from '@chakra-ui/react';

import { PageToolbar } from '~/components/PageToolbar';
import { RelevantKitchenBlock } from '~/components/RelevantKitchenBlock';
import { UiButton } from '~/components/ui/UiButton';
import { UiCard } from '~/components/ui/UiCard';
import { data_relevant_vegan, data_vegan } from '~/constants';

export function TheJuiciest() {
    return (
        <div>
            <Box>
                <PageToolbar title='Самое сочное' />
            </Box>
            <Grid
                templateColumns='repeat(2, 1fr)'
                templateRows='repeat(4, 1fr)'
                rowGap='16px'
                columnGap='24px'
            >
                {data_vegan.map((recipe) => (
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
                    />
                ))}
            </Grid>
            <Flex justifyContent='center' mt='16px' mb='40px'>
                <UiButton size='md' text='Загрузить еще' variant='primary' />
            </Flex>
            <RelevantKitchenBlock
                data={data_relevant_vegan}
                heading='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
        </div>
    );
}
