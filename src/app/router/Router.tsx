import { Route, Routes } from 'react-router';

import { MainLayout } from '~/components/layouts/MainLayout';
import { Home } from '~/pages/HomePage';
import { TheJuiciest } from '~/pages/TheJuiciestPage';
import { VeganCuisine } from '~/pages/VeganCuisinePage';

export const Router = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/vegan-cuisine' element={<VeganCuisine />} />
            <Route path='/the-juiciest' element={<TheJuiciest />} />
        </Route>
    </Routes>
);

{
    /* <Routes>
    <Route element={<MarketingLayout />}>
        <Route index element={<MarketingHome />} />
        <Route path='contact' element={<Contact />} />
    </Route>

    <Route path='projects'>
        <Route index element={<ProjectsHome />} />
        <Route element={<ProjectsLayout />}>
            <Route path=':pid' element={<Project />} />
            <Route path=':pid/edit' element={<EditProject />} />
        </Route>
    </Route>
</Routes>; */
}
