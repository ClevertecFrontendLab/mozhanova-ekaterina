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
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Note } from '~/types';
import { NoteSchema } from '~/validation';

type Props = {
    isOpen: boolean;
    onClose: VoidFunction;
    onCreate: (note: Note, clearForm: VoidFunction) => void;
};

export const NotesDrawer = ({ isOpen, onClose, onCreate }: Props) => {
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

    const clearForm = () => {
        setValue('text', '');
    };

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
            <DrawerContent data-test-id={DATA_TEST_IDS.FILTER_DRAWER}>
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
                            borderColor={errors.text ? 'error.400' : 'border.light'}
                            placeholder='Максимально 160 символов'
                            _focus={
                                errors.text
                                    ? { borderColor: 'error.400', boxShadow: 'none' }
                                    : { borderColor: 'border.light', boxShadow: 'none' }
                            }
                            _hover={
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
                        onClick={handleSubmit((data) => onCreate(data, clearForm))}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
