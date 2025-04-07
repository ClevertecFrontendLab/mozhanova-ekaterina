import { Box, Flex } from '@chakra-ui/react';

import { BlogsSection } from '~/components/BlogsSection';
import { PageToolbar } from '~/components/PageToolbar';
import { RelevantKitchenBlock } from '~/components/RelevantKitchenBlock';
import { Slider } from '~/components/Slider';
import { TheJuiciestSection } from '~/components/TheJuiciestSection';
import { TRecipe } from '~/types';

const data_1: TRecipe[] = [
    {
        id: 1,
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        likes: 152,
        favorites: 85,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_4.png',
        },
        imageSrc: 'src/assets/card_img_1.png',
    },
    {
        id: 2,
        title: 'Пряная ветчина по итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        likes: 257,
        favorites: 159,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_4.png',
        },
        imageSrc: 'src/assets/card_img_2.png',
    },
    {
        id: 3,
        title: 'Лапша с курицей и шафраном',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        likes: 342,
        favorites: 258,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_4.png',
        },
        imageSrc: 'src/assets/card_img_3.png',
    },
    {
        id: 4,
        title: 'Том-ям с капустой кимчи',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        likes: 324,
        favorites: 124,
        category: {
            title: 'Национальные',
            iconSrc: 'src/assets/icons/menu_icon_10.png',
        },
        imageSrc: 'src/assets/card_img_4.png',
    },
];
const data_2: TRecipe[] = [
    {
        id: 5,
        title: 'Солянка с грибами',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        likes: 0,
        favorites: 1,
        category: {
            title: 'Первые блюда',
            iconSrc: 'src/assets/icons/menu_icon_3.png',
        },
        imageSrc: 'src/assets/slider_1.png',
    },
    {
        id: 6,
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        likes: 1,
        favorites: 2,
        category: {
            title: 'Веганские блюда',
            iconSrc: 'src/assets/icons/menu_icon_7.png',
        },
        imageSrc: 'src/assets/slider_2.png',
    },
    {
        id: 7,
        title: 'Оладьи на кефире "Пышные"',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        likes: 1,
        favorites: 0,
        category: {
            title: 'Десерты, выпечка',
            iconSrc: 'src/assets/icons/menu_icon_5.png',
        },
        imageSrc: 'src/assets/slider_3.png',
    },
    {
        id: 8,
        title: 'Салат "Здоровье"',
        description:
            'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
        likes: 0,
        favorites: 0,
        category: {
            title: 'Салаты',
            iconSrc: 'src/assets/icons/menu_icon_1.png',
        },
        imageSrc: 'src/assets/slider_4.png',
    },
];
const data_3: TRecipe[] = [
    {
        id: 1,
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        likes: 1,
        favorites: 1,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_4.png',
        },
    },
    {
        id: 2,
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        likes: 2,
        favorites: 1,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_4.png',
        },
    },
];

export function Home() {
    return (
        <Box>
            <Box pb='24px'>
                <PageToolbar title='Приятного аппетита!' />
            </Box>
            <Flex direction='column' gap='40px'>
                <Slider data={data_2} />
                <TheJuiciestSection data={data_1} />
                <BlogsSection />
                <RelevantKitchenBlock
                    data={data_3}
                    heading='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
            </Flex>
        </Box>
    );
}
