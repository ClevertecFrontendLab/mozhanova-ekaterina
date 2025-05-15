import { useEffect } from 'react';

import { useModalContext } from '~/contexts/modal-context';

export const RecoveryPage = () => {
    const { showRecoveryForgot } = useModalContext();

    useEffect(() => {
        showRecoveryForgot();
    }, []);

    return null;
};
