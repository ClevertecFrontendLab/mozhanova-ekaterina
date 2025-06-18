import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { UiButton } from '~/components/ui/UiButton';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';
import { useCreateNotesMutation } from '~/query/user-api';
import { NoteSchema } from '~/validation';

type Props = {
    isOpen: boolean;
    onClose: VoidFunction;
};

export const NotesDrawer = ({ isOpen, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(NoteSchema),
    });
    const [createNote] = useCreateNotesMutation();
    const { showError, showSuccess } = useToast();

    const handleCreate = handleSubmit(async (data) => {
        try {
            await createNote(data).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_NOTE_SUCCESS);
            setValue('text', '');
            onClose();
        } catch {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
            onClose();
        }
    });

    return (
        <Drawer
            size={{
                base: 'xs',
                md: 'custom',
            }}
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            variant='custom'
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton size='sm' />
                <DrawerHeader>Новая заметка</DrawerHeader>

                <DrawerBody>
                    <FormControl
                        onBlur={() => watch('text') && setValue('text', watch('text').trim())}
                    >
                        <Textarea
                            {...register('text')}
                            minH='96px'
                            css={{
                                '&[aria-invalid=true]': { boxShadow: 'none' },
                            }}
                            borderColor='border.light'
                            placeholder='максимально 160 символов'
                            _focus={
                                errors.text
                                    ? { borderColor: 'error.400', boxShadow: 'none' }
                                    : { borderColor: 'border.light', boxShadow: 'none' }
                            }
                        />
                    </FormControl>
                </DrawerBody>

                <DrawerFooter>
                    <UiButton
                        size={{ base: 'sm', md: 'lg' }}
                        variant='solid'
                        text='Опубликовать'
                        onClick={handleCreate}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
