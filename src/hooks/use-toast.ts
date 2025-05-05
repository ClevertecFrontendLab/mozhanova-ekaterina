import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export const useToast = () => {
    const chakraToast = useChakraToast();

    const defaultOptions: UseToastOptions = {
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle',
    };

    const showToast = (
        type: ToastType,
        title: string,
        description: string,
        options?: UseToastOptions,
    ) => {
        chakraToast({
            ...defaultOptions,
            ...options,
            title: title,
            description: description,
            status: type,
        });
    };

    return {
        showSuccess: (title: string, description: string, options?: UseToastOptions) =>
            showToast('success', title, description, options),
        showError: (title: string, description: string, options?: UseToastOptions) =>
            showToast('error', title, description, options),
        showWarning: (title: string, description: string, options?: UseToastOptions) =>
            showToast('warning', title, description, options),
        showInfo: (title: string, description: string, options?: UseToastOptions) =>
            showToast('info', title, description, options),
    };
};
