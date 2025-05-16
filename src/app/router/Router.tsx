import { Route, Routes } from 'react-router';

import { AuthGuard } from '~/components/AuthGuard';
import { AuthLayout } from '~/components/layouts/AuthLayout';
import { MainLayout } from '~/components/layouts/MainLayout';
import { RecipesTabs } from '~/components/RecipesTabs';
import { AppRoutes } from '~/config';
import { CategoryPage } from '~/pages/CategoryPage';
import { Home } from '~/pages/HomePage';
import { NotFoundPage } from '~/pages/NotFoundPage';
import { RecipePage } from '~/pages/RecipePage';
import { RecoveryPage } from '~/pages/RecoveryPage';
import { SearchPage } from '~/pages/SearchPage';
import { TheJuiciestPage } from '~/pages/TheJuiciestPage';
import { SignIn } from '~/pages/user/SignIn';
import { SignUp } from '~/pages/user/SignUp';
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

        <Route element={<AuthLayout />}>
            <Route path={AppRoutes.SIGN_IN} element={<SignIn />}>
                <Route path={AppRoutes.RECOVERY} element={<RecoveryPage />} />
            </Route>
            <Route path={AppRoutes.SIGN_UP} element={<SignUp />} />
        </Route>

        <Route path={AppRoutes.VERIFICATION} element={<VerificationPage />} />
    </Routes>
);
