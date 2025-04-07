import { Flex, Grid } from '@chakra-ui/react';

import { TRecipe } from '~/types';

import { SectionHeading } from './SectionHeading';
import { UiCard } from './ui/UiCard';

type Props = {
    data: TRecipe[];
};

export function TheJuiciestSection({ data }: Props) {
    return (
        <Flex direction='column' gap='24px'>
            <SectionHeading title='Самое сочное' linkTo='/the-juiciest' buttonText='Вся подборка' />
            <Grid templateColumns='repeat(2, 1fr)' gap='24px'>
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
                    />
                ))}
            </Grid>
        </Flex>
    );
}
