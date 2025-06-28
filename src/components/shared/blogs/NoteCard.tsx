import { Box, Card, CardBody, Flex, Text } from '@chakra-ui/react';

import { TrashIcon } from '~/components/ui/icons/TrashIcon';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { NoteDto } from '~/types';
import { shouldUseTwoColumns } from '~/utils/should-use-two-columns';

export const NoteCard = ({
    note,
    index,
    notesLength,
    onDelete,
    isVisible = true,
    editable = false,
}: {
    note: NoteDto;
    index: number;
    notesLength: number;
    onDelete?: (id?: string) => void;
    isVisible?: boolean;
    editable?: boolean;
}) => (
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
                    {note.data}
                </Text>

                {editable && onDelete && (
                    <Box
                        data-test-id={DATA_TEST_IDS.NOTE_DELETE_BUTTON}
                        cursor='pointer'
                        onClick={() => onDelete(note._id)}
                    >
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
