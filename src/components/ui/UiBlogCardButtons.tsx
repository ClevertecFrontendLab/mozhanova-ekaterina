import { Link } from 'react-router';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { routeHelpers } from '~/utils/get-routes';

import { ManIcon } from './icons/ManIcon';
import { SubscribeIcon } from './icons/SubscribeIcon';
import { UiButton } from './UiButton';

export const UiReadButton = ({ bloggerId }: { bloggerId: string }) => (
    <Link
        data-test-id={DATA_TEST_IDS.BLOG_CARD_NOTES_BUTTON}
        to={{
            pathname: routeHelpers.getBlogPath(bloggerId),
            hash: '#notes',
        }}
    >
        <UiButton size='xs' variant='accentOutline' text='Читать' />
    </Link>
);

export const UiRecipesButton = ({ bloggerId }: { bloggerId: string }) => (
    <Link
        data-test-id={DATA_TEST_IDS.BLOG_CARD_RECIPES_BUTTON}
        to={routeHelpers.getBlogPath(bloggerId)}
    >
        <UiButton size='xs' variant='solidAccent' text='Рецепты' />
    </Link>
);

export const UiSubscribeButton = ({
    onClick,
    dataTest,
}: {
    onClick: () => void;
    dataTest?: string;
}) => (
    <UiButton
        data-test-id={dataTest}
        onClick={onClick}
        leftIcon={<SubscribeIcon />}
        size='xs'
        variant='solid'
        text='Подписаться'
    />
);

export const UiUnsubscribeButton = ({ onClick }: { onClick: () => void }) => (
    <UiButton
        data-test-id={DATA_TEST_IDS.BLOG_TOGGLE_UNSUBSCRIBE}
        onClick={onClick}
        leftIcon={<ManIcon />}
        size='xs'
        variant='outline'
        text='Вы подписаны'
    />
);
