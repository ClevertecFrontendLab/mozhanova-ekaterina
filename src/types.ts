export type TRecipe = {
    id: string;
    title: string;
    description: string;
    imageSrc?: string;
    category: string[];
    subcategory?: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions: number;
    nutritionValue: { calories: number; proteins: number; fats: number; carbohydrates: number };
    ingredients: Array<{ title: string; count: string; measureUnit: string }>;
    steps: Array<{ stepNumber: number; description: string; image: string }>;
    meat?: string;
    side?: string;
};

export type TCategory = {
    id: string;
    label: string;
    iconSrc: string;
    subCategories: Array<{ id: string; label: string }>;
};
