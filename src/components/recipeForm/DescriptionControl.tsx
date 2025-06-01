import { Textarea } from '@chakra-ui/react';

type Props = {
    error: boolean;
};

export const DescriptionControl = ({ error, ...props }: Props) => (
    <Textarea
        data-test-id='recipe-description'
        isInvalid={!!error}
        placeholder='Краткое описание рецепта'
        borderColor='border.light'
        _focus={
            error
                ? { borderColor: 'error.400' }
                : { borderColor: 'border.light', boxShadow: 'none' }
        }
        css={{
            '&[aria-invalid=true]': { boxShadow: 'none' },
        }}
        {...props}
    />
);
