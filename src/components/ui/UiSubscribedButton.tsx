import { ManIcon } from './icons/ManIcon';
import { UiButton } from './UiButton';

export const UiSubscribedButton = ({ onClick }: { onClick: () => void }) => (
    <UiButton
        onClick={onClick}
        leftIcon={<ManIcon />}
        size='xs'
        variant='outline'
        text='Вы подписаны'
    />
);
