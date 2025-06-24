import { Box, Card, CardBody, Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { TrashIcon } from '~/components/ui/icons/TrashIcon';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useToast } from '~/hooks/use-toast';
import { useDeleteNoteMutation } from '~/query/user-api';
import { NoteDto } from '~/types';
import { shouldUseTwoColumns } from '~/utils/should-use-two-columns';

export const NoteCard = ({
    note,
    index,
    notesLength,
    isVisible = true,
    editable = false,
}: {
    note: NoteDto;
    index: number;
    notesLength: number;
    isVisible?: boolean;
    editable?: boolean;
}) => {
    const [deleteNote] = useDeleteNoteMutation();
    const { showError, showSuccess } = useToast();

    const handleDeleteNote = async () => {
        try {
            await deleteNote(note._id).unwrap();
            showSuccess(NOTIFICATION_MESSAGES.CREATE_NOTE_SUCCESS);
        } catch {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
        }
    };
    return (
        <Card
            display={isVisible ? 'flex' : 'none'}
            gridColumn={{
                base: 'span 6',
                sm: shouldUseTwoColumns(notesLength, index) ? 'span 3' : 'span 2',
            }}
        >
            <CardBody overflow='hidden' display='grid' gap={4} fontSize='14px' flexGrow={1}>
                <Flex justify='space-between' align='center'>
                    <Text data-test-id={DATA_TEST_IDS.NOTES_CARD_DATE} color='text.primary'>
                        {format(new Date(note.date), 'dd MMMM HH:mm', { locale: ru })}
                    </Text>

                    {editable && (
                        <Box cursor='pointer' onClick={handleDeleteNote}>
                            <TrashIcon />
                        </Box>
                    )}
                </Flex>
                <Text minW={0} data-test-id={DATA_TEST_IDS.NOTES_CARD_TEXT}>
                    {note.text}
                </Text>
            </CardBody>
        </Card>
    );
};
