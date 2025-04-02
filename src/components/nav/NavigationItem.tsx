import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';

import styles from './Navigation.module.scss';

type Props = {
    title: string;
    iconSrc: string;
    children?: string[];
};

export function NavigationItem({ title, iconSrc, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <li>
            <div className={styles.nav_item} onClick={() => setIsOpen((prev) => !prev)}>
                <div className={styles.nav_title}>
                    <img className={styles.nav_icon} src={iconSrc} alt='menu_item_icon' />
                    <span>{title}</span>
                </div>
                <ChevronDownIcon width='16px' height='16px' />
            </div>

            {children && (
                <ul className={styles.nav_sublist + ' ' + (isOpen ? styles.active : '')}>
                    {children.map((child) => (
                        <li className={styles.nav_sublist_title}>
                            <div className={styles.divider}></div>
                            {child}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}
