import { Box, Flex } from '@chakra-ui/react';

import { categories } from '~/constants';

import { SectionHeading } from './SectionHeading';
import { UiCard } from './ui/UiCard';
import { UiCardMini } from './ui/UiCardMini';

export function VeganCuisineSection() {
    return (
        <Flex direction='column' gap='24px'>
            <Box pt='24px' borderTop='1px solid' borderColor='neutral.200'>
                <SectionHeading
                    title='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
            </Box>
            <Flex gap='24px'>
                <Flex gap='24px' basis='50%'>
                    <UiCard
                        title='Картошка, тушенная с болгарским перцем и фасолью в томатном соусе'
                        text='Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.'
                        category={categories[3]}
                        favorites={1}
                        likes={1}
                        categoryBgColor='accent.400'
                    />
                    <UiCard
                        title='Картошка, тушенная с болгарским перцем и фасолью в томатном соусе'
                        text='Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.'
                        category={categories[3]}
                        favorites={1}
                        likes={1}
                        categoryBgColor='accent.400'
                    />
                </Flex>
                <Flex basis='50%' direction='column' gap='12px'>
                    <UiCardMini title='Стейк для вегетарианцев' iconSrc={categories[3].iconSrc} />
                    <UiCardMini title='Стейк для вегетарианцев' iconSrc={categories[3].iconSrc} />
                    <UiCardMini title='Стейк для вегетарианцев' iconSrc={categories[3].iconSrc} />
                </Flex>
            </Flex>
        </Flex>
    );
}
