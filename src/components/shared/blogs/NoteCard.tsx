import { Card, CardBody, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Note } from '~/types';

export const NoteCard = ({
    note,
    index,
    notesLength,
}: {
    note: Note;
    index: number;
    notesLength: number;
}) => {
    const shouldUseTwoColumns = () => {
        if (notesLength % 3 === 0) {
            return false;
        }
        if (notesLength === 4) {
            return true;
        }
        if (notesLength - (notesLength % 3) > index) {
            return false;
        }
        return true;
    };
    return (
        <Card gridColumn={{ base: 'span 6', sm: shouldUseTwoColumns() ? 'span 3' : 'span 2' }}>
            <CardBody display='grid' gap={4} fontSize='14px' flexGrow={1}>
                <Text data-test-id={DATA_TEST_IDS.NOTES_CARD_DATE} color='text.primary'>
                    {format(new Date(note.date), 'dd MMMM HH:mm', { locale: ru })}
                </Text>
                <Text data-test-id={DATA_TEST_IDS.NOTES_CARD_TEXT}>{note.text}</Text>
            </CardBody>
        </Card>
    );
};
