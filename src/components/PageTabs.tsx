import { Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { TRecipe } from '~/types';

import { UiCard } from './ui/UiCard';

type Props = {
    tabs: string[];
};

const data: TRecipe[] = [
    {
        id: 1,
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        likes: 152,
        favorites: 85,
        category: {
            title: 'Национальные',
            iconSrc: 'src/assets/icons/menu_icon_10.png',
        },
        imageSrc: 'src/assets/card_img_10.png',
    },
    {
        id: 2,
        title: 'Картофельные рулетики с грибами',
        description:
            'Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!',
        likes: 152,
        favorites: 85,
        category: {
            title: 'Детские блюда',
            iconSrc: 'src/assets/icons/menu_icon_8.png',
        },
        imageSrc: 'src/assets/card_img_5.png',
    },
    {
        id: 3,
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        likes: 124,
        favorites: 324,
        category: {
            title: 'Национальные',
            iconSrc: 'src/assets/icons/menu_icon_10.png',
        },
        imageSrc: 'src/assets/card_img_4.png',
    },
    {
        id: 4,
        title: 'Овощная лазанья из лаваша',
        description:
            'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.',
        likes: 152,
        favorites: 85,
        category: {
            title: 'Блюда на гриле',
            iconSrc: 'src/assets/icons/menu_icon_6.png',
        },
        imageSrc: 'src/assets/card_img_6.png',
    },
    {
        id: 5,
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
        likes: 152,
        favorites: 85,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_4.png',
        },
        imageSrc: 'src/assets/card_img_7.png',
    },
    {
        id: 6,
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
        likes: 152,
        favorites: 85,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_4.png',
        },
        imageSrc: 'src/assets/card_img_7.png',
    },
    {
        id: 7,
        title: 'Чесночная картошка',
        description:
            'Такая картошечка украсит любой семейный обед! Все будут в полном  восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке - просто объедение! Отличная идея для обеда или ужина, готовится просто!',
        likes: 324,
        favorites: 124,
        category: {
            title: 'Национальные',
            iconSrc: 'src/assets/icons/menu_icon_10.png',
        },
        imageSrc: 'src/assets/card_img_8.png',
    },
    {
        id: 8,
        title: 'Пури',
        description:
            'Пури - это индийские жареные лепешки, которые готовятся из пресного  теста. Рецепт лепешек пури требует самых доступных ингредиентов, и  времени на приготовление хрустящих лепешек уйдет мало.',
        likes: 324,
        favorites: 124,
        category: {
            title: 'Национальные',
            iconSrc: 'src/assets/icons/menu_icon_10.png',
        },
        imageSrc: 'src/assets/card_img_9.png',
    },
];

export function PageTabs({ tabs }: Props) {
    return (
        <Tabs variant='line' align='center'>
            <TabList w='fit-content'>
                {tabs.map((tab, i) => (
                    <Tab key={i}>{tab}</Tab>
                ))}
            </TabList>

            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <Grid
                        templateColumns='repeat(2, 1fr)'
                        templateRows='repeat(4, 1fr)'
                        rowGap='16px'
                        columnGap='24px'
                        pt='24px'
                    >
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
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
