import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { categories } from '~/mocks/categories';
import { data } from '~/mocks/recipes';

export function Breadcrumbs() {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumb
            p={{
                base: '0 20px',
                md: 'unset',
            }}
            flexGrow={{
                base: 0,
                md: 1,
            }}
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
        >
            <BreadcrumbItem isCurrentPage={pathnames.length === 0}>
                <BreadcrumbLink as={Link} to='/'>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {pathnames.length > 0 &&
                pathnames.map((path, i) => {
                    const routeTo = pathnames.slice(0, i + 1).join('/');
                    const label =
                        categories.find((category) => category.id === path)?.label ||
                        categories
                            .find((category) =>
                                category.subCategories?.find(
                                    (subCategory) => subCategory.id === path,
                                ),
                            )
                            ?.subCategories?.find((subCategory) => subCategory.id === path)
                            ?.label ||
                        (path === 'the-juiciest' && 'Самое сочное') ||
                        data.find((recipe) => recipe.id === path)?.title ||
                        '';
                    return (
                        <BreadcrumbItem isCurrentPage={i === pathnames.length - 1}>
                            <BreadcrumbLink as={Link} to={routeTo} whiteSpace='nowrap'>
                                {label}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
        </Breadcrumb>
    );
}
