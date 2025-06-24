import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';
import { setCurrentRecipe } from '~/store/recipe-slice';

import { useGetRecipeByIdQuery } from '../recipe-api';

export const useGetRecipe = (id: string = '') => {
    const { data, isLoading, isError } = useGetRecipeByIdQuery(id, { skip: !id });

    const { showError } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) dispatch(setCurrentRecipe(data));
    });
    useEffect(() => {
        if (isError) {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
            navigate(-1);
        }
    }, [isError, showError, navigate]);

    return { data, isLoading, isError };
};
