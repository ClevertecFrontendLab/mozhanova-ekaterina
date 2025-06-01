import { Box, Card, CardBody, Flex, Tag, Textarea } from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';

import { NewRecipe, Step } from '~/types';

import { TrashIcon } from '../ui/icons/TrashIcon';
import { StepImageControl } from './StepImageControl';

type Props = {
    index: number;
    step: Step;
    error: boolean;
    control: Control<NewRecipe>;
    removeStep: VoidFunction;
};

export const StepCard = ({ index, control, step, removeStep, error }: Props) => (
    <Card
        boxShadow='none'
        maxH={{ base: 'auto', sm: '180px' }}
        direction={{ base: 'column', sm: 'row' }}
    >
        <Controller
            control={control}
            name={`steps.${index}.image`}
            render={({ field }) => (
                <StepImageControl
                    index={index}
                    error={error}
                    w={{ base: '100%', sm: '346px' }}
                    value={field.value}
                    onChange={(image: string) => field.onChange(image)}
                />
            )}
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
            <Controller
                control={control}
                name={`steps.${index}.description`}
                render={({ field }) => (
                    <Textarea
                        data-test-id={`recipe-steps-description-${index}`}
                        // onBlur={() =>
                        //     handleUpdate({ ...step, description: description.trim() })
                        // }
                        h='104px'
                        isInvalid={!!error}
                        _focus={
                            error
                                ? { borderColor: 'error.400' }
                                : { borderColor: 'border.light', boxShadow: 'none' }
                        }
                        css={{
                            '&[aria-invalid=true]': { boxShadow: 'none' },
                        }}
                        borderColor='border.light'
                        placeholder='Шаг'
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                    >
                        {step.description}
                    </Textarea>
                )}
            />
        </CardBody>
    </Card>
);
