import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';
import { Link } from 'react-router';

import styles from './Header.module.scss';

export function Header() {
    return (
        <Flex className={styles.header} alignItems='center' data-test-id='header'>
            <div className={styles.logo}>
                <img src='/public/logo.svg' alt='logo' />
            </div>
            <Flex justify='space-between' alignItems='center' grow='1'>
                <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to='/'>
                            Главная
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to='/vegan-cuisine'>
                            Веганская кухня
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as={Link} to='/the-juiciest'>
                            Вторые блюда
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex className={styles.user_card} gap='12px'>
                    <img className={styles.avatar} src='/public/avatar.png' alt='avatar' />
                    <div className={styles.user_info}>
                        <div className={styles.user_name}>Екатерина Константинопольская</div>
                        <div className={styles.user_email}>@bake_and_pie</div>
                    </div>
                </Flex>
            </Flex>
        </Flex>
    );
}
