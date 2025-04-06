import { Flex } from '@chakra-ui/react';

import { categories } from '~/constants';

import { SectionHeading } from './SectionHeading';
import { UiCard } from './ui/UiCard';
import { UiSliderButton } from './ui/UiSliderButton';

export function Slider() {
    return (
        <Flex direction='column' gap='24px'>
            <SectionHeading title='Новые рецепты' />
            <Flex gap='24px' position='relative'>
                <UiCard
                    imgSrc='/src/assets/slider_1.png'
                    title='Солянка с грибами'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    category={categories[2]}
                    favorites={0}
                    likes={1}
                />
                <UiCard
                    imgSrc='/src/assets/slider_2.png'
                    title='Капустные котлеты'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    category={categories[3]}
                    favorites={2}
                    likes={1}
                />
                <UiCard
                    imgSrc='/src/assets/slider_3.png'
                    title='Оладьи на кефире "Пышные"'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    category={categories[3]}
                    favorites={0}
                    likes={1}
                />
                <UiCard
                    imgSrc='/src/assets/slider_4.png'
                    title='Салат "Здоровье"'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    category={categories[3]}
                    favorites={0}
                    likes={0}
                />

                <UiSliderButton direction='left' />
                <UiSliderButton direction='right' />
            </Flex>
        </Flex>
    );
}
