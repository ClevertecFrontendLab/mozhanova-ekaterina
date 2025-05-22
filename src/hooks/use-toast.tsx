import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useToast as useChakraToast,
} from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { ToastParams } from '~/types';

export const useToast = () => {
    const toast = useChakraToast();

    const showToast = ({ ...params }: ToastParams) => {
        const toastId = `${params.type}-notification`;
        if (toast.isActive(toastId)) {
            return;
        }
        toast({
            duration: params.duration || 3000,
            position: params.position || 'bottom',
            id: toastId,
            containerStyle: { transition: 'none' },

            render: ({ onClose }) => (
                <Alert
                    w={{ base: '328px', md: '400px' }}
                    data-test-id={DATA_TEST_IDS.ERROR_NOTIFICATION}
                    variant='solid'
                    status={params.type}
                >
                    <AlertIcon />
                    <Box flexGrow={1}>
                        <AlertTitle>{params.title}</AlertTitle>
                        <AlertDescription>{params.description || ''}</AlertDescription>
                    </Box>
                    <CloseButton
                        alignSelf='flex-start'
                        data-test-id={DATA_TEST_IDS.CLOSE_ALERT_BUTTON}
                        onClick={onClose}
                    />
                </Alert>
            ),
        });
    };
    return {
        showError: (params: Omit<ToastParams, 'type'>) => showToast({ ...params, type: 'error' }),
        showSuccess: (params: Omit<ToastParams, 'type'>) =>
            showToast({ ...params, type: 'success' }),
    };
};
