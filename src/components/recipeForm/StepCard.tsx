import { Box, Card, CardBody, Flex, Tag, Textarea } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { Step } from '~/types';

import { TrashIcon } from '../ui/icons/TrashIcon';
import { StepImageControl } from './StepImageControl';

type Props = {
    index: number;
    step: Step;
    error: boolean;
    removeStep: VoidFunction;
    updateStep: (step: Step) => void;
};

export const StepCard = ({ index, step, updateStep, removeStep, error }: Props) => {
    const [description, setDescription] = useState(step.description);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <Card
            boxShadow='none'
            maxH={{ base: 'auto', sm: '180px' }}
            direction={{ base: 'column', sm: 'row' }}
        >
            <StepImageControl
                index={index}
                error={error}
                w={{ base: '100%', sm: '346px' }}
                value={step.image}
                onChange={(image: string) => updateStep({ ...step, image })}
            />
            <CardBody h='fit-content' display='flex' flexDirection='column' gap={4} p={5}>
                <Flex justify='space-between' align='center'>
                    <Tag w='fit-content' bg='neutral.20'>
                        Шаг {step.stepNumber}
                    </Tag>
                    {step.stepNumber !== 1 && (
                        <Box color='text.primary'>
                            <TrashIcon
                                data-test-id={`recipe-steps-remove-button-${index}`}
                                onClick={removeStep}
                                cursor='pointer'
                            />
                        </Box>
                    )}
                </Flex>
                <Textarea
                    data-test-id={`recipe-steps-description-${index}`}
                    onBlur={() => updateStep({ ...step, description: description.trim() })}
                    ref={textareaRef}
                    h='104px'
                    isInvalid={!!error}
                    _focus={{ borderColor: 'border.light', boxShadow: 'none' }}
                    css={{
                        '&[aria-invalid=true]': { boxShadow: 'none' },
                    }}
                    borderColor='border.light'
                    placeholder='Шаг'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                    {step.description}
                </Textarea>
            </CardBody>
        </Card>
    );
};
