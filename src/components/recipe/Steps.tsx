import { Box, Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';

export function Steps({
    steps,
}: {
    steps: { stepNumber: number; description: string; image: string }[];
}) {
    return (
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
}

function StepCard({ step }: { step: { stepNumber: number; description: string; image: string } }) {
    return (
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
                    src={step.image}
                    maxW={{
                        base: '158px',
                        md: '100%',
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
}
