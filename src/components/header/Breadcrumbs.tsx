import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { currentRecipeSelector } from '~/store/recipe-slice';
import { selectCategories, selectSubcategories } from '~/store/selectors';
import { selectCurrentBlogger } from '~/store/user-slice';
import { defineBreadcrumbLabel } from '~/utils/get-breadcrumb-label';
import { getBreadcrumbTestId } from '~/utils/test-utils';

export const Breadcrumbs = ({
    setMenuOpen,
    variant = 'default',
}: {
    setMenuOpen: (value: boolean) => void;
    variant?: 'mobile' | 'default';
}) => {
    const location = useLocation();
    const [isLargerThanMD] = useBreakpoint('md');
    const currentBlogger = useSelector(selectCurrentBlogger);
    const categories = useSelector(selectCategories);
    const subCategories = useSelector(selectSubcategories);
    const currentRecipe = useSelector(currentRecipeSelector);
    const pathnames = location.pathname.split('/').filter((x) => x);
    const isVisible = isLargerThanMD || variant === 'mobile';

    if (!isVisible) return null;

    return (
        <Breadcrumb
            data-test-id={DATA_TEST_IDS.BREADCRUMBS}
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
                    to={AppRoutes.HOME}
                    onClick={() => !isLargerThanMD && setMenuOpen(false)}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {pathnames.length > 0 &&
                pathnames.map((path, i) => {
                    const routeTo = pathnames.slice(0, i + 1).join('/');
                    const label = defineBreadcrumbLabel(
                        path,
                        categories,
                        subCategories,
                        currentRecipe,
                        currentBlogger,
                    );

                    return (
                        <BreadcrumbItem
                            minW={0}
                            key={path}
                            isCurrentPage={i === pathnames.length - 1}
                        >
                            <BreadcrumbLink
                                data-test-id={getBreadcrumbTestId(path, currentBlogger?._id)}
                                whiteSpace='nowrap'
                                overflowX='hidden'
                                as={Link}
                                to={routeTo}
                                onClick={() => !isLargerThanMD && setMenuOpen(false)}
                            >
                                <Text textOverflow='ellipsis' overflowX='hidden'>
                                    {label}
                                </Text>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
        </Breadcrumb>
    );
};
