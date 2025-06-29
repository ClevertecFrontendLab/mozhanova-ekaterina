import { Category, UserDto } from '~/types';

export const getCategoriesByIds = (categories: Category[] = [], ids: (string | undefined)[]) =>
    categories.filter((category) => ids.includes(category?._id));

export const getCategoriesByTitles = (categories: Category[] = [], titles: string[]) =>
    categories.filter((category) => titles.includes(category?.title));

export const getAllSubsByRoots = (categories: Category[] = []) =>
    categories.map((category) => category?.subCategories).flat();

export const getCategoryById = (categories: Category[] = [], id: string) =>
    categories.find((category) => category?._id === id) || null;

export const getCategoryByName = (categories: Category[] = [], name: string) =>
    categories.find((category) => category?.category === name) || null;

export const getUsersByIds = (users: UserDto[] = [], ids: string[]) =>
    users.filter((user) => ids.includes(user.id));
