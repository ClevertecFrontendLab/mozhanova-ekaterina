import { Box, Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';

export const Steps = ({
    steps = [],
}: {
    steps: { stepNumber: number; description: string; image?: string }[];
}) => (
    <Flex
        gap={{
            base: 5,
        }}
        direction='column'
    >
        <Heading fontSize='2xl'>Шаги приготовления</Heading>

        <Flex direction='column' gap={{ base: 5 }}>
            {steps.map((step) => (
                <StepCard key={step.stepNumber} step={step} />
            ))}
        </Flex>
    </Flex>
);

const StepCard = ({
    step,
}: {
    step: { stepNumber: number; description: string; image?: string };
}) => (
    <Card
        direction='row'
        borderRadius='8px'
        overflow='hidden'
        borderColor='border.light'
        borderWidth='1px'
        shadow='none'
    >
        {step.image && (
            <Image
                src={`https://training-api.clevertec.ru${step.image}`}
                maxW={{
                    base: '158px',
                    md: '346px',
                }}
            />
        )}
        <CardBody
            fontSize='sm'
            p={{
                base: '8px 8px 4px',
                md: '20px 24px',
            }}
        >
            <Box p='2px 8px' mb={{ base: 3, md: 4 }} bg='neutral.20' w='fit-content'>
                Шаг {step.stepNumber}
            </Box>
            <Text>{step.description}</Text>
        </CardBody>
    </Card>
);
