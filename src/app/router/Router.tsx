import { Route, Routes } from 'react-router';

import { MainLayout } from '~/components/layouts/MainLayout';
import { RecipesTabs } from '~/components/RecipesTabs';
import { CategoryPage } from '~/pages/CategoryPage';
import { Home } from '~/pages/HomePage';
import { NotFoundPage } from '~/pages/NotFoundPage';
import { RecipePage } from '~/pages/RecipePage';
import { SearchPage } from '~/pages/SearchPage';
import { TheJuiciestPage } from '~/pages/TheJuiciestPage';

export const Router = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path='/' element={<Home />}></Route>

            <Route path='/search' element={<SearchPage />} />
            <Route path='/:category/*' element={<CategoryPage />} errorElement=''>
                <Route path=':subCategory' element={<RecipesTabs />} />
            </Route>

            <Route path='/:category/:subCategory/:id' element={<RecipePage />} errorElement='' />

            <Route path='/the-juiciest' element={<TheJuiciestPage />} />

            <Route path='/search' element={<SearchPage />} />

            <Route path='not-found' element={<NotFoundPage />} />
        </Route>
    </Routes>
);
