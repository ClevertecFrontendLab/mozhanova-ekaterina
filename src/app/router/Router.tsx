import { Route, Routes } from 'react-router';

import { MainLayout } from '~/components/layouts/MainLayout';
import { PageTabs } from '~/components/shared/PageTabs';
import { categories } from '~/mocks/categories';
import { DishesByType } from '~/pages/DishesByType';
import { Home } from '~/pages/HomePage';
import { TheJuiciest } from '~/pages/TheJuiciestPage';

export const Router = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route index path='/' element={<Home />} />
            {categories.map((category) => (
                <Route key={category.id} path={`/${category.id}/*`} element={<DishesByType />}>
                    <Route path=':subCategoryId' element={<PageTabs />} />
                </Route>
            ))}
            <Route path='/the-juiciest' element={<TheJuiciest />} />
        </Route>
    </Routes>
);
