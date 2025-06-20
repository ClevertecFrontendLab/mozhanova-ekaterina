import { EditIcon } from '@chakra-ui/icons';
import { Avatar, Grid } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { HomeIcon } from '~/components/ui/icons/HomeIcon';
import { UiIconButton } from '~/components/ui/UiIconButton';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { routeHelpers } from '~/utils/get-routes';

import { SearchIcon } from '../ui/icons/SearchIcon';

export const FooterMobile = () => {
    const location = useLocation();
    const currentUserId = useAppSelector(selectCurrentUserId);

    return (
        <Grid
            data-test-id={DATA_TEST_IDS.FOOTER}
            position='fixed'
            bottom='0'
            w='100%'
            h='84px'
            bg='background.header'
            templateColumns='repeat(4, 1fr)'
            pt={2.5}
            pb={2.5}
            zIndex={20}
        >
            <Link to={AppRoutes.HOME}>
                <UiIconButton
                    variant={location.pathname === '/' ? 'primary' : 'default'}
                    text='Главная'
                    icon={
                        <HomeIcon
                            width={location.pathname === '/' ? '16px' : '24px'}
                            height={location.pathname === '/' ? '16px' : '24px'}
                        />
                    }
                />
            </Link>
            <Link to={AppRoutes.SEARCH}>
                <UiIconButton text='Поиск' icon={<SearchIcon />} />
            </Link>
            <Link to={AppRoutes.CREATE_RECIPE}>
                <UiIconButton text='Записать' icon={<EditIcon w='24px' h='24px' />} />
            </Link>
            <Link to={routeHelpers.getBlogPath(currentUserId)}>
                <UiIconButton
                    icon={<Avatar size='md' name='Можанова Екатерина' />}
                    text='Мой профиль'
                />
            </Link>
        </Grid>
    );
};
