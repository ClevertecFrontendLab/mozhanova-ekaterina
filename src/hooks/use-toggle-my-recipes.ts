import { useRef, useState } from 'react';

import { Limit } from '~/query/constants/limits';
import { Recipe, RecipeDraftDto } from '~/types';

export const useToggleMyRecipes = (recipes: Recipe[], drafts: RecipeDraftDto[]) => {
    const showMoreRef = useRef<HTMLButtonElement>(null);
    const [draftsToShow, setDraftsToShow] = useState<RecipeDraftDto[]>(() => {
        if (drafts.length > Limit.DEFAULT) return drafts.slice(0, Limit.DEFAULT);
        else return drafts;
    });
    const [recipesToShow, setRecipesToShow] = useState<Recipe[]>(() => {
        if (drafts.length < Limit.DEFAULT) return recipes.slice(0, Limit.DEFAULT - drafts.length);
        else return [];
    });

    const handleShowMore = () => {
        setDraftsToShow(drafts);
        setRecipesToShow(recipes);
        showMoreRef.current!.style.display = 'none';
    };

    return { draftsToShow, recipesToShow, handleShowMore, showMoreRef };
};
