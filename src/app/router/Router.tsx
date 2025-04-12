import { Route, Routes } from 'react-router';

import { MainLayout } from '~/components/layouts/MainLayout';
import { DishesByType } from '~/pages/DishesByType ';
import { Home } from '~/pages/HomePage';
import { TheJuiciest } from '~/pages/TheJuiciestPage';
import { VeganCuisine } from '~/pages/VeganCuisinePage';

export const Router = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/vegan-cuisine' element={<VeganCuisine />}>
                <Route path=':categoryId' element={<DishesByType />} />
            </Route>
            <Route path='/the-juiciest' element={<TheJuiciest />} />
        </Route>
    </Routes>
);
