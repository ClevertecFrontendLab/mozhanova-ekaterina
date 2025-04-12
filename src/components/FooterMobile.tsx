import { EditIcon } from '@chakra-ui/icons';
import { Grid, Image } from '@chakra-ui/react';
import { Link } from 'react-router';

import { HomeIcon } from './ui/icons/HomeIcon';
import { SearchIcon } from './ui/icons/SearchIcon';
import { UiIconButton } from './ui/UiIconButton';

export function FooterMobile() {
    return (
        <Grid
            data-test-id='footer'
            position='fixed'
            bottom='0'
            w='100%'
            h='84px'
            bg='background.header'
            templateColumns='repeat(4, 1fr)'
            pt={2.5}
            pb={2.5}
        >
            <Link to='/'>
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
            <Link to='/'>
                <UiIconButton text='Поиск' icon={<SearchIcon />} />
            </Link>
            <Link to='/'>
                <UiIconButton text='Записать' icon={<EditIcon w='24px' h='24px' />} />
            </Link>
            <Link to='/'>
                <UiIconButton
                    icon={
                        <Image src='/src/assets/avatar.png' w='40px' h='40px' borderRadius='50%' />
                    }
                    text='Мой профиль'
                />
            </Link>
        </Grid>
    );
}
