import { EditIcon } from '@chakra-ui/icons';
import { Grid, Image } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import icon from '~/assets/ava.png';
import { HomeIcon } from '~/components/ui/icons/HomeIcon';
import { UiIconButton } from '~/components/ui/UiIconButton';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';

import { SearchIcon } from '../ui/icons/SearchIcon';

export const FooterMobile = () => {
    const location = useLocation();

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
            <Link to='/'>
                <UiIconButton
                    icon={<Image src={icon} w='40px' h='40px' borderRadius='50%' />}
                    text='Мой профиль'
                />
            </Link>
        </Grid>
    );
};
