import { Box, Grid, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { UiNotesGrid } from '~/components/ui/UiNotesGrid';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useToast } from '~/hooks/use-toast';
import { useCreateNotesMutation, useDeleteNoteMutation } from '~/query/user-api';
import { Note, NoteDto } from '~/types';

import { NotesDrawer } from '../shared/profile/NotesDrawer';
import { PencilIcon } from './icons/PencilIcon';
import { UiButton } from './UiButton';

export const UiNotesBox = ({
    data = [],
    editable,
    ref,
}: {
    data: NoteDto[];
    editable?: boolean;
    ref?: (node: HTMLDivElement) => void;
}) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const [createNote] = useCreateNotesMutation();
    const { showError, showSuccess } = useToast();
    const [notes, setNotes] = useState<NoteDto[]>([]);
    const [deleteNote] = useDeleteNoteMutation();

    const handleCreate = async (note: Note) => {
        try {
            const response = await createNote(note).unwrap();
            setNotes((prev) => [...prev, response]);
            showSuccess(NOTIFICATION_MESSAGES.CREATE_NOTE_SUCCESS);
            onClose();
        } catch {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR_1);
            onClose();
        }
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        try {
            await deleteNote(id).unwrap();
            setNotes(notes.filter((note) => note._id !== id));
            showSuccess(NOTIFICATION_MESSAGES.DELETE_NOTE_SUCCESS);
        } catch {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR_1);
        }
    };

    useEffect(() => setNotes(data), [data]);

    return (
        <Grid
            data-test-id={DATA_TEST_IDS.BLOG_NOTES_BOX}
            ref={ref}
            id='notes'
            gap={4}
            p={{ base: 4, md: 6 }}
            bg='neutral.10'
            borderRadius='16px'
        >
            <Heading
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                fontSize={{ base: '18px', md: '20px' }}
                fontWeight={700}
                ref={ref}
            >
                <Box>
                    Заметки <wbr />
                    <Text as='span' fontWeight={400} color='text.secondary'>
                        ({notes.length})
                    </Text>
                </Box>
                {editable && (
                    <UiButton
                        onClick={onOpen}
                        variant='outline'
                        leftIcon={<PencilIcon />}
                        text='Новая заметка'
                    />
                )}
            </Heading>
            {notes.length > 0 && (
                <UiNotesGrid editable={editable} notes={notes} onDelete={handleDelete} />
            )}

            <NotesDrawer isOpen={isOpen} onClose={onClose} onCreate={handleCreate} />
        </Grid>
    );
};
