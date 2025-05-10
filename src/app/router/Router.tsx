import { Route, Routes } from 'react-router';

import { MainLayout } from '~/components/layouts/MainLayout';
import { RecipesTabs } from '~/components/RecipesTabs';
import { AppRoutes } from '~/config';
import { CategoryPage } from '~/pages/CategoryPage';
import { Home } from '~/pages/HomePage';
import { NotFoundPage } from '~/pages/NotFoundPage';
import { RecipePage } from '~/pages/RecipePage';
import { SearchPage } from '~/pages/SearchPage';
import { TheJuiciestPage } from '~/pages/TheJuiciestPage';

export const Router = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path={AppRoutes.SEARCH} element={<SearchPage />} />

            <Route path={AppRoutes.CATEGORY_WILDCARD} element={<CategoryPage />}>
                <Route path={AppRoutes.SUB_CATEGORY} element={<RecipesTabs />} />
            </Route>

            <Route path={AppRoutes.RECIPE} element={<RecipePage />} />
            <Route path={AppRoutes.THE_JUICIEST} element={<TheJuiciestPage />} />
            <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
    </Routes>
);
