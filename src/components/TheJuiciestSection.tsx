import { Flex, Grid } from '@chakra-ui/react';

import { categories } from '~/constants';

import { SectionHeading } from './SectionHeading';
import { UiCard } from './ui/UiCard';

export function TheJuiciestSection() {
    return (
        <Flex direction='column' gap='24px'>
            <SectionHeading title='Самое сочное' linkTo='/the-juiciest' buttonText='Вся подборка' />
            <Grid templateColumns='repeat(2, 1fr)' gap='24px'>
                <UiCard
                    title='Кнели со спагетти'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    imgSrc='/src/assets/card_img_1.png'
                    category={categories[3]}
                    likes={0}
                    favorites={85}
                    direction='row'
                    infoPosition='top'
                    controls
                    categoryBgColor='accent.400'
                />
                <UiCard
                    title='Пряная ветчина по итальянски'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    imgSrc='/src/assets/card_img_2.png'
                    category={categories[3]}
                    recommendation='Елена Высоцкая'
                    likes={257}
                    favorites={159}
                    direction='row'
                    infoPosition='top'
                    controls
                    categoryBgColor='accent.400'
                />
                <UiCard
                    title='Лапша с курицей и шафраном'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    imgSrc='/src/assets/card_img_3.png'
                    category={categories[3]}
                    recommendation='Alex Cook'
                    likes={342}
                    favorites={258}
                    direction='row'
                    infoPosition='top'
                    controls
                    categoryBgColor='accent.400'
                />
                <UiCard
                    title='Том-ям с капустой кимчи'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время х уже не хочет, время варить солянх уже не хочет, время варить солянх уже не хочет, время варить солянх уже не хочет, время варить солянх уже не хочет, время варить солянх уже не хочет, время варить солянх уже не хочет, время варить солянварить солянку.остались, но никто их уже не хочет, время варить соляностались, но никто их уже не хочет, время варить солян'
                    imgSrc='/src/assets/card_img_4.png'
                    category={categories[9]}
                    likes={354}
                    favorites={124}
                    direction='row'
                    infoPosition='top'
                    controls
                    categoryBgColor='accent.400'
                />
            </Grid>
        </Flex>
    );
}
