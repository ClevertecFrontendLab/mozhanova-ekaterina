import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, useMediaQuery } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';

import { ApplicationState } from '~/store/configure-store';
import { selectCategories, selectSubcategories } from '~/store/selectors';

export function Breadcrumbs({ setMenuOpen }: { setMenuOpen: (value: boolean) => void }) {
    const location = useLocation();
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)', { ssr: false });
    const categories = useSelector(selectCategories);
    const subCategories = useSelector(selectSubcategories);
    const currentRecipe = useSelector((state: ApplicationState) => state.recipe.current);
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
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
                <BreadcrumbLink
                    as={Link}
                    to='/'
                    onClick={() => !isLargerThanMD && setMenuOpen(false)}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {pathnames.length > 0 &&
                pathnames.map((path, i) => {
                    const routeTo = pathnames.slice(0, i + 1).join('/');
                    const label = (path: string) => {
                        switch (path) {
                            case 'the-juiciest':
                                return 'Самое сочное';

                            case 'search':
                                return 'Поиск по рецептам';

                            case categories.find((c) => c.category === path)?.category:
                                return categories.find((c) => c.category === path)?.title;

                            case subCategories.find((c) => c.category === path)?.category:
                                return subCategories.find((c) => c.category === path)?.title;

                            case currentRecipe?._id:
                                return currentRecipe?.title;

                            default:
                                break;
                        }
                    };

                    return (
                        <BreadcrumbItem
                            minW={0}
                            key={path}
                            isCurrentPage={i === pathnames.length - 1}
                        >
                            <BreadcrumbLink
                                whiteSpace='nowrap'
                                overflowX='hidden'
                                as={Link}
                                to={routeTo}
                                onClick={() => !isLargerThanMD && setMenuOpen(false)}
                            >
                                <Text textOverflow='ellipsis' overflowX='hidden'>
                                    {label(path)}
                                </Text>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
        </Breadcrumb>
    );
}
