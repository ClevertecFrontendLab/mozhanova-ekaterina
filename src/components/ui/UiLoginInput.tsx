import { FieldError } from 'react-hook-form';

import { UiInput } from './UiInput';

type Props = {
    error: FieldError | undefined;
    value: string;
    label: string;
    helperText: string;
    variant: 'accent' | 'ghost';
    isDisabled: boolean;
    showHelperText: boolean;
    setValue: (value: string) => void;
    'data-test-id': string;
};

export const UiLoginInput = ({
    error,
    setValue,
    label = 'Логин для входа на сайт',
    helperText = 'Логин не менее 5 символов, только латиница, цифры и !@#$&_+-',
    value,
    isDisabled,
    showHelperText,
    ...props
}: Partial<Props>) => (
    <UiInput
        isDisabled={isDisabled}
        error={error}
        setValue={setValue}
        label={label}
        helperText={helperText}
        value={value}
        showHelperText={showHelperText}
        {...props}
    />
);
