import { useEffect } from 'react';

import { useModalContext } from '~/contexts/modal-context';

export const RecoveryPage = () => {
    const { showSendEmail } = useModalContext();

    useEffect(() => {
        showSendEmail();
    }, []);

    return null;
};
