import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';

export const VerificationPage = () => {
    const { showSuccess } = useToast();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const emailVerified = searchParams.get('emailVerified');
    const { showEmailError } = useModalContext();

    useEffect(() => {
        const verificationStatus = emailVerified === 'true';
        if (verificationStatus) {
            showSuccess('Верификация прошла успешно', '', 15000, 'bottom-left');
            navigate('/login');
        } else {
            showEmailError();
            navigate('/signin');
        }
    }, [navigate, showSuccess, showEmailError, emailVerified]);
    return null;
};
