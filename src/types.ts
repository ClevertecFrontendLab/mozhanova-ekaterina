export type TRecipe = {
    id: number;
    title: string;
    description?: string;
    imageSrc?: string;
    category: {
        title: string;
        iconSrc: string;
    };
    usedIngredientCount?: number;
    usedIngredients?: Array<{ id: number; name: string }>;
    likes: number;
    favorites: number;
    instructions?: string;
    extendedIngredients?: Array<{ id: number; name: string }>;
};
