import { categories } from './mocks/categories';

export function defineCategoryLabel(category: string) {
    return categories.find((item) => item.id === category)?.label ?? '';
}

export function defineCategoryId(category: string) {
    return categories.find((item) => item.label === category)?.id ?? '';
}

export function defineCategoryImage(category: string) {
    const categoryIndex = categories.findIndex((item) => item.id === category);
    return '/src/assets/icons/menu_icon_' + (categoryIndex + 1) + '.png';
}
