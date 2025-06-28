import { useEffect, useRef, useState } from 'react';

import { Limit } from '~/query/constants/limits';
import { Recipe } from '~/types';

export const useToggleRecipes = (recipes: Recipe[]) => {
    const showMoreRef = useRef<HTMLButtonElement>(null);
    const [recipesToShow, setRecipesToShow] = useState<Recipe[]>([]);
    const hasMore = recipes.length !== recipesToShow.length;

    const handleShowMore = () => {
        if (!showMoreRef.current) return;
        setRecipesToShow(recipes);
        showMoreRef.current.style.display = 'none';
    };

    useEffect(() => {
        setRecipesToShow(recipes.slice(0, Limit.DEFAULT));
    }, [recipes]);

    useEffect(() => {
        if (showMoreRef.current) showMoreRef.current.style.display = hasMore ? 'block' : 'none';
    }, [hasMore]);

    return { recipesToShow, handleShowMore, showMoreRef, hasMore };
};
