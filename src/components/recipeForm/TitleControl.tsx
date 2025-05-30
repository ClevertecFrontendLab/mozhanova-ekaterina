import { FormControl, Input } from '@chakra-ui/react';

type Props = {
    error: boolean;
};

export const TitleControl = ({ error, ...props }: Props) => (
    <FormControl isInvalid={!!error}>
        <Input
            data-test-id='recipe-title'
            borderColor={error ? 'error.400' : 'primary.300'}
            size='lg'
            variant='recipeForm'
            placeholder='Название рецепта'
            {...props}
        />
    </FormControl>
);
