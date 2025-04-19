import { Route, Routes } from 'react-router';

import { MainLayout } from '~/components/layouts/MainLayout';
import { PageTabs } from '~/components/PageTabs';
import { DishesByType } from '~/pages/DishesByType';
import { Home } from '~/pages/HomePage';
import { RecipePage } from '~/pages/ResipePage';
import { TheJuiciest } from '~/pages/TheJuiciestPage';

export const Router = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route index path='/' element={<Home />} />

            <Route path='/:category/*' element={<DishesByType />} errorElement=''>
                <Route path=':subCategory' element={<PageTabs />} />
            </Route>

            <Route path='/:category/:subCategory/:id' element={<RecipePage />} errorElement='' />

            <Route path='/the-juiciest' element={<TheJuiciest />} />
        </Route>
    </Routes>
);
