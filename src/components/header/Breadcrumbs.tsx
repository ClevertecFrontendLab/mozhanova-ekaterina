import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { ApplicationState } from '~/store/configure-store';
import { selectCategories, selectSubcategories } from '~/store/selectors';
import { defineBreadcrumbLabel } from '~/utils/get-breadcrumb-label';

export const Breadcrumbs = ({
    setMenuOpen,
    variant = 'default',
}: {
    setMenuOpen: (value: boolean) => void;
    variant?: 'mobile' | 'default';
}) => {
    const location = useLocation();
    const [isLargerThanMD] = useBreakpoint('md');

    const categories = useSelector(selectCategories) || [];
    const subCategories = useSelector(selectSubcategories) || [];
    const currentRecipe = useSelector((state: ApplicationState) => state.recipe.current);
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
                    to='/'
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
                    );

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
                                    {label}
                                </Text>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
        </Breadcrumb>
    );
};
