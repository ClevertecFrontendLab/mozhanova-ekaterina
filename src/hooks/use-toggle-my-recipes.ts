import { useEffect, useRef, useState } from 'react';

import { Limit } from '~/query/constants/limits';
import { Recipe, RecipeDraftDto } from '~/types';

export const useToggleMyRecipes = (recipes: Recipe[], drafts: RecipeDraftDto[]) => {
    const showMoreRef = useRef<HTMLButtonElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [draftsToShow, setDraftsToShow] = useState<RecipeDraftDto[]>([]);
    const [recipesToShow, setRecipesToShow] = useState<Recipe[]>([]);

    useEffect(() => {
        if (isExpanded) {
            setDraftsToShow(drafts);
            setRecipesToShow(recipes);
        } else {
            const newDrafts =
                drafts.length > Limit.DEFAULT ? drafts.slice(0, Limit.DEFAULT) : drafts;

            const remainingSlots = Limit.DEFAULT - newDrafts.length;
            const newRecipes = remainingSlots > 0 ? recipes.slice(0, remainingSlots) : [];

            setDraftsToShow(newDrafts);
            setRecipesToShow(newRecipes);
        }

        if (showMoreRef.current) {
            showMoreRef.current.style.display =
                drafts.length + recipes.length <= Limit.DEFAULT || isExpanded ? 'none' : 'block';
        }
    }, [drafts, recipes, isExpanded]);

    const handleShowMore = () => {
        setIsExpanded(true);
    };

    const hasMore = drafts.length + recipes.length > Limit.DEFAULT && !isExpanded;

    return {
        draftsToShow,
        recipesToShow,
        handleShowMore,
        showMoreRef,
        hasMore,
    };
};
