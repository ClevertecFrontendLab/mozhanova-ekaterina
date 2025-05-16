import { useEffect } from 'react';

import { useModalContext } from '~/contexts/modal-context';

export const RecoveryPage = () => {
    const { showSentEmail } = useModalContext();

    useEffect(() => {
        showSentEmail();
    }, []);

    return null;
};
