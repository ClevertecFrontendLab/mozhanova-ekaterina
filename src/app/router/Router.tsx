import { Route, Routes } from 'react-router';

import { MainLayout } from '~/components/layouts/MainLayout';
import { PageTabs } from '~/components/PageTabs';
import { DishesByType } from '~/pages/DishesByType';
import { HomeMain } from '~/pages/HomeMain';
import { Home } from '~/pages/HomePage';
import { RecipePage } from '~/pages/ResipePage';
import SearchPage from '~/pages/SearchPage';
import { TheJuiciestPage } from '~/pages/TheJuiciestPage';

export const Router = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path='/' element={<Home />}>
                <Route path='/search' element={<SearchPage />} />
                <Route path='/' element={<HomeMain />} />
            </Route>

            <Route path='/:category/*' element={<DishesByType />} errorElement=''>
                <Route path=':subCategory' element={<PageTabs />} />
            </Route>

            <Route path='/:category/:subCategory/:id' element={<RecipePage />} errorElement='' />

            <Route path='/the-juiciest' element={<TheJuiciestPage />} />

            <Route path='/search' element={<SearchPage />} />
        </Route>
    </Routes>
);
