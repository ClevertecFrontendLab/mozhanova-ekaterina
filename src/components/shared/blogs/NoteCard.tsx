import { Card, CardBody, Text } from '@chakra-ui/react';

import { Note } from '~/types';

export const NoteCard = ({ note }: { note: Note }) => (
    <Card>
        <CardBody display='grid' gap={4} fontSize='14px'>
            <Text color='text.primary'>{note.date}</Text>
            <Text>{note.text}</Text>
        </CardBody>
    </Card>
);
