import { Box, Card, CardBody, Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { TrashIcon } from '~/components/ui/icons/TrashIcon';
import { DATA_TEST_IDS } from '~/constants/test-ids';
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
    const handleDeleteNote = () => {
        deleteNote(note._id);
    };
    return (
        <Card
            display={isVisible ? 'flex' : 'none'}
            gridColumn={{
                base: 'span 6',
                sm: shouldUseTwoColumns(notesLength, index) ? 'span 3' : 'span 2',
            }}
        >
            <CardBody display='grid' gap={4} fontSize='14px' flexGrow={1}>
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
                <Text data-test-id={DATA_TEST_IDS.NOTES_CARD_TEXT}>{note.text}</Text>
            </CardBody>
        </Card>
    );
};
