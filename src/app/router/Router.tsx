import { Route, Routes } from 'react-router';

import { AuthGuard } from '~/components/AuthGuard';
import { MainLayout } from '~/components/layouts/MainLayout';
import { UserLayout } from '~/components/layouts/UserLayout';
import { RecipesTabs } from '~/components/RecipesTabs';
import { AppRoutes } from '~/config';
import { CategoryPage } from '~/pages/CategoryPage';
import { Home } from '~/pages/HomePage';
import { NotFoundPage } from '~/pages/NotFoundPage';
import { RecipePage } from '~/pages/RecipePage';
import { SearchPage } from '~/pages/SearchPage';
import { TheJuiciestPage } from '~/pages/TheJuiciestPage';
import { LogIn } from '~/pages/user/LogIn';
import { SignIn } from '~/pages/user/SignIn';
import { VerificationPage } from '~/pages/user/VerificationPage';

export const Router = () => (
    <Routes>
        <Route
            element={
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            }
        >
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path={AppRoutes.SEARCH} element={<SearchPage />} />

            <Route path={AppRoutes.CATEGORY_WILDCARD} element={<CategoryPage />}>
                <Route path={AppRoutes.SUB_CATEGORY} element={<RecipesTabs />} />
            </Route>

            <Route path={AppRoutes.RECIPE} element={<RecipePage />} />
            <Route path={AppRoutes.THE_JUICIEST} element={<TheJuiciestPage />} />
            <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        </Route>

        <Route element={<UserLayout />}>
            <Route path={AppRoutes.LOG_IN} element={<LogIn />} />
            <Route path={AppRoutes.SIGN_IN} element={<SignIn />} />
        </Route>
        <Route path={AppRoutes.VERIFICATION} element={<VerificationPage />} />
    </Routes>
);

{
    /* <Route path='/verification' element={} /> */
}
