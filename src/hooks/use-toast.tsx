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

export enum NotificationDuration {
    Short = 3000,
    Medium = 5000,
    Long = 15000,
}

export const useToast = () => {
    const toast = useChakraToast();

    const showToast = ({ ...params }: ToastParams) => {
        const toastId = `${params.type}${params.title}-notification`;
        if (toast.isActive(toastId)) {
            return;
        }
        toast({
            duration: params.duration || NotificationDuration.Short,
            position: params.position || 'bottom',
            id: toastId,
            containerStyle: { transition: 'none' },

            render: ({ onClose }) => (
                <Alert
                    zIndex={10}
                    w={{ base: '328px', md: '400px' }}
                    data-test-id={DATA_TEST_IDS.ERROR_NOTIFICATION}
                    variant='solid'
                    status={params.type}
                >
                    <AlertIcon />
                    <Box flexGrow={1}>
                        <AlertTitle
                            data-test-it={
                                params.type === 'error' && DATA_TEST_IDS.ERROR_NOTIFICATION_TITLE
                            }
                        >
                            {params.title}
                        </AlertTitle>
                        <AlertDescription
                            data-test-it={
                                params.type === 'error' &&
                                DATA_TEST_IDS.ERROR_NOTIFICATION_DESCRIPTION
                            }
                        >
                            {params.description || ''}
                        </AlertDescription>
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
