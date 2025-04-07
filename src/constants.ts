import { TRecipe } from './types';

export const categories = [
    {
        title: 'Салаты',
        iconSrc: '/src/assets/icons/menu_icon_1.png',
    },
    {
        title: 'Закуски',
        iconSrc: '/src/assets/icons/menu_icon_2.png',
    },
    {
        title: 'Первые блюда',
        iconSrc: '/src/assets/icons/menu_icon_3.png',
    },
    {
        title: 'Вторые блюда',
        iconSrc: '/src/assets/icons/menu_icon_4.png',
    },
    {
        title: 'Десерты, выпечка',
        iconSrc: '/src/assets/icons/menu_icon_5.png',
    },
    {
        title: 'Блюда на гриле',
        iconSrc: '/src/assets/icons/menu_icon_6.png',
    },
    {
        title: 'Веганская кухня',
        iconSrc: '/src/assets/icons/menu_icon_7.png',
        children: [
            'Закуски',
            'Первые блюда',
            'Вторые блюда',
            'Гарниры',
            'Десерты',
            'Выпечка',
            'Сыроедческие блюда',
            'Напитки',
        ],
    },
    {
        title: 'Детские блюда',
        iconSrc: '/src/assets/icons/menu_icon_8.png',
    },
    {
        title: 'Лечебное питание',
        iconSrc: '/src/assets/icons/menu_icon_9.png',
    },
    {
        title: 'Национальные',
        iconSrc: '/src/assets/icons/menu_icon_10.png',
    },
    {
        title: 'Соусы',
        iconSrc: '/src/assets/icons/menu_icon_11.png',
    },
    {
        title: 'Напитки',
        iconSrc: '/src/assets/icons/menu_icon_12.png',
    },
];
export const data_juiciest: TRecipe[] = [
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
export const data_slider: TRecipe[] = [
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
export const data_relevant_vegan: TRecipe[] = [
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
    {
        id: 3,
        title: 'Стейк для вегетарианцев',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        likes: 2,
        favorites: 1,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_4.png',
        },
    },
    {
        id: 4,
        title: 'Котлеты из гречки и фасоли',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        likes: 2,
        favorites: 1,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_4.png',
        },
    },
    {
        id: 5,
        title: 'Сырный суп с лапшой и брокколи',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        likes: 2,
        favorites: 1,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_3.png',
        },
    },
];
export const data_relevant_desert: TRecipe[] = [
    {
        id: 1,
        title: 'Бананово-молочное желе',
        description:
            'Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.',
        likes: 1,
        favorites: 1,
        category: {
            title: 'Детские блюда',
            iconSrc: 'src/assets/icons/menu_icon_8.png',
        },
    },
    {
        id: 2,
        title: 'Нежный сливочно-сырный крем для кексов',
        description:
            'Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.',
        likes: 2,
        favorites: 1,
        category: {
            title: 'Детские блюда',
            iconSrc: 'src/assets/icons/menu_icon_8.png',
        },
    },
    {
        id: 3,
        title: 'Домашние сырные палочки',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        likes: 2,
        favorites: 1,
        category: {
            title: 'Детские блюда',
            iconSrc: 'src/assets/icons/menu_icon_8.png',
        },
    },
    {
        id: 4,
        title: 'Панкейки',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        likes: 2,
        favorites: 1,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_10.png',
        },
    },
    {
        id: 5,
        title: 'Воздушное банановое печенье на сковороде',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        likes: 2,
        favorites: 1,
        category: {
            title: 'Вторые блюда',
            iconSrc: 'src/assets/icons/menu_icon_7.png',
        },
    },
];

export const data_vegan: TRecipe[] = [
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
