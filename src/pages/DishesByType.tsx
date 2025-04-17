import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';

import { PageToolbar } from '~/components/shared/PageToolbar';
import { categories } from '~/mocks/categories';

export function DishesByType() {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const currentCategory = location.pathname.split('/').filter((x) => x)[0];
    const subCategories = categories.find(
        (category) => category.id === currentCategory,
    )!.subCategories;
    useEffect(() => {
        if (!params.subCategoryId) {
            navigate(`/${currentCategory}/${subCategories[0].id}`);
        }
    }, [params.subCategoryId, currentCategory, subCategories, navigate]);
    return (
        <div>
            <PageToolbar
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
            <Outlet />
            {/* <RelevantKitchenBlock
                data={data_relevant_desert}
                heading='Десерты, выпечка'
                description='Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.'
            /> */}
        </div>
    );
}
