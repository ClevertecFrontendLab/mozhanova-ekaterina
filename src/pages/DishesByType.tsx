import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import { PageToolbar } from '~/components/shared/PageToolbar';
import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { categories } from '~/mocks/categories';

export function DishesByType() {
    const params = useParams();
    const navigate = useNavigate();
    const currentCategory = params.category;
    const subCategories = categories.find(
        (category) => category.id === currentCategory,
    )!.subCategories;
    useEffect(() => {
        if (!params.subCategory) {
            navigate(`/${currentCategory}/${subCategories[0].id}`);
        }
    }, [params.subCategory, currentCategory, subCategories, navigate]);
    return (
        <>
            <PageToolbar
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Outlet />
                <RelevantKitchenBlock
                    heading='Десерты, выпечка'
                    description='Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.'
                />
            </Box>
        </>
    );
}
