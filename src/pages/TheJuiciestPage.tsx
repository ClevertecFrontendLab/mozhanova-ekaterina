import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageToolbar } from '~/components/shared/PageToolbar/PageToolbar';
import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import UiCardGrid from '~/components/ui/UiCardGrid';
import { setCategoryFilter, setSubCategoryFilter } from '~/store/recipe-slice';
import { selectFilteredRecipes } from '~/store/selectors';

export function TheJuiciestPage() {
    const filteredRecipes = useSelector(selectFilteredRecipes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCategoryFilter([]));
        dispatch(setSubCategoryFilter([]));
    }, []);

    return (
        <>
            <PageToolbar title='Самое сочное' />
            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <UiCardGrid data={filteredRecipes} />
                <RelevantKitchenBlock
                    heading='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
            </Box>
        </>
    );
}
