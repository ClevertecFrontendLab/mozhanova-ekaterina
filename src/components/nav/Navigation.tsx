import styles from './Navigation.module.scss';
import { NavigationItem } from './NavigationItem';

const navItems = [
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

export function Navigation() {
    return (
        <div className={styles.nav_wrap}>
            <nav className={styles.nav}>
                <ul>
                    {navItems.map((item) => (
                        <NavigationItem
                            key={item.title}
                            title={item.title}
                            iconSrc={item.iconSrc}
                            children={item.children}
                        />
                    ))}
                </ul>
            </nav>
            <div>
                <div>Версия программы 03.25</div>
                <div>Все права защищены, ученический файл, ©Клевер Технолоджи, 2025</div>
                <div>
                    <img src='/src/assets/icons/left-icon.svg' alt='left' />
                    Выйти
                </div>
            </div>
        </div>
    );
}
