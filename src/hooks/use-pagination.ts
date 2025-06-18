import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { paginationSelector, setCurrentPage } from '~/store/recipe-slice';
import { selectFilters } from '~/store/selectors';
import { Recipe } from '~/types';

export const usePagination = (data?: Recipe[]) => {
    const dispatch = useDispatch();
    const [recipesToShow, setRecipesToShow] = useState<Recipe[]>([]);
    const pagination = useSelector(paginationSelector);
    const filters = useSelector(selectFilters);

    const hasMore = pagination?.totalPages ? pagination.currentPage < pagination.totalPages : false;
    const loadMore = () => {
        if (hasMore) {
            dispatch(setCurrentPage(pagination.currentPage + 1));
        }
    };

    useEffect(() => {
        setRecipesToShow([]);
        dispatch(setCurrentPage(1));
    }, [filters]);

    useEffect(() => {
        if (!data) return;

        const newIds = new Set(data.map((item) => item._id));

        setRecipesToShow((prev) => {
            const filteredPrev = prev.filter((item) => !newIds.has(item._id));
            return [...filteredPrev, ...data];
        });
    }, [data]);

    return { hasMore, loadMore, recipesToShow, setRecipesToShow };
};
