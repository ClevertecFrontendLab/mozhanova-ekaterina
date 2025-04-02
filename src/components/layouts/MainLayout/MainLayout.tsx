import { Outlet } from 'react-router';

import { Header } from '../../header/Header';
import { Navigation } from '../../nav/Navigation';
import { Sidebar } from '../../sidebar/Sidebar';
import styles from './MainLayout.module.scss';

export function MainLayout() {
    return (
        <div className={styles.layout}>
            <Header />
            <Navigation />
            <main className={styles.content}>
                <Outlet />
            </main>
            <Sidebar />
        </div>
    );
}
