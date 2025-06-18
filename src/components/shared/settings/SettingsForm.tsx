import { Grid, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { UiButton } from '~/components/ui/UiButton';
import { UiInput } from '~/components/ui/UiInput';
import { UiLoginInput } from '~/components/ui/UiLoginInput';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';
import { useUpdateInfoMutation } from '~/query/user-api';
import { UserDto, UserUpdateInfo } from '~/types';
import { ProfileSchema } from '~/validation';

export const SettingsForm = ({ profile }: { profile: UserDto }) => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(ProfileSchema),
        defaultValues: {
            firstName: profile?.firstName,
            lastName: profile?.lastName,
        },
    });
    const [updateInfo] = useUpdateInfoMutation();
    const { showSuccess, showError } = useToast();

    const handleSave = async (data: UserUpdateInfo) => {
        try {
            await updateInfo(data).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CHANGES_INFO_SUCCESS);
        } catch {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
        }
    };

    return (
        <Grid gap={4} as='form' onSubmit={handleSubmit(handleSave)}>
            <SimpleGrid spacing={4} columns={{ base: 1, sm: 2 }}>
                <UiInput
                    error={errors.firstName}
                    label='Имя'
                    {...register('firstName')}
                    value={watch('firstName')}
                    setValue={(value: string) => setValue('firstName', value)}
                />
                <UiInput
                    error={errors.lastName}
                    label='Фамилия'
                    {...register('lastName')}
                    value={watch('lastName')}
                    setValue={(value: string) => setValue('lastName', value)}
                />
                <UiInput isDisabled type='email' label='Е-mail' value={profile?.email} />
                <UiLoginInput
                    showHelperText
                    isDisabled
                    helperText='Логин не менее 5 символов, только латиница'
                    label='Логин'
                    value={profile?.login}
                />
            </SimpleGrid>
            <VStack spacing={4} align={{ base: 'center', sm: 'flex-start' }}>
                <UiButton variant='ghost' text='Сменить пароль' size={{ base: 'md', md: 'lg' }} />
                <UiButton
                    variant='solid'
                    text='Сохранить изменения'
                    size={{ base: 'md', md: 'lg' }}
                    type='submit'
                />
            </VStack>
        </Grid>
    );
};
