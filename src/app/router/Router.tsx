import { Route, Routes } from 'react-router';

import { AuthGuard } from '~/components/AuthGuard';
import { AuthLayout } from '~/components/layouts/AuthLayout';
import { MainLayout } from '~/components/layouts/MainLayout';
import { RecipesTabs } from '~/components/RecipesTabs';
import { AppRoutes } from '~/constants/routes-config';
import { RecoveryPage } from '~/pages/auth/RecoveryPage';
import { SignIn } from '~/pages/auth/SignIn';
import { SignUp } from '~/pages/auth/SignUp';
import { VerificationPage } from '~/pages/auth/VerificationPage';
import { CategoryPage } from '~/pages/CategoryPage';
import { CreateRecipePage } from '~/pages/CreateRecipePage';
import { Home } from '~/pages/HomePage';
import { NotFoundPage } from '~/pages/NotFoundPage';
import { CategoryPage } from '~/pages/recipes/CategoryPage';
import { CreateRecipePage } from '~/pages/recipes/CreateRecipePage';
import { EditRecipePage } from '~/pages/recipes/EditRecipePage';
import { RecipePage } from '~/pages/recipes/RecipePage';
import { SearchPage } from '~/pages/recipes/SearchPage';
import { TheJuiciestPage } from '~/pages/recipes/TheJuiciestPage';

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
            <Route path={AppRoutes.RECIPE} element={<RecipePage />} />
            <Route path={AppRoutes.THE_JUICIEST} element={<TheJuiciestPage />} />

            <Route path={AppRoutes.CATEGORY_WILDCARD} element={<CategoryPage />}>
                <Route path={AppRoutes.SUB_CATEGORY} element={<RecipesTabs />} />
            </Route>

            <Route path={AppRoutes.CREATE_RECIPE} element={<CreateRecipePage />} />
            <Route path={AppRoutes.EDIT_RECIPE} element={<EditRecipePage />} />

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
