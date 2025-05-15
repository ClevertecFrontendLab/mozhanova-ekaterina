import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const LoginErrorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <UiModal
        image='/src/assets/modals/3.png'
        isOpen={isOpen}
        onClose={onClose}
        header='Вход не выполнен'
        body='Что-то пошло не так. Попробуйте еще раз'
        footer={<UiButton type='submit' variant='solid' text='Повторить' size='lg' />}
    />
);
