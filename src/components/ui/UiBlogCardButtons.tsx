import { Link } from 'react-router';

import { routeHelpers } from '~/utils/get-routes';

import { SubscribeIcon } from './icons/SubscribeIcon';
import { UiButton } from './UiButton';

export const UiReadButton = ({ bloggerId }: { bloggerId: string }) => (
    <Link
        to={{
            pathname: routeHelpers.getBlogPath(bloggerId),
            hash: '#notes',
        }}
    >
        <UiButton size='xs' variant='accentOutline' text='Читать' />
    </Link>
);

export const UiRecipesButton = ({ bloggerId }: { bloggerId: string }) => (
    <Link to={routeHelpers.getBlogPath(bloggerId)}>
        <UiButton size='xs' variant='solidAccent' text='Рецепты' />
    </Link>
);

export const UiSubscribeButton = ({ handleSubscribe }: { handleSubscribe: () => void }) => (
    <UiButton
        onClick={handleSubscribe}
        leftIcon={<SubscribeIcon />}
        size='xs'
        variant='solid'
        text='Подписаться'
    />
);
