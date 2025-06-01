import { Select } from '@chakra-ui/react';

import { MeasureUnit } from '~/types';

type Props = {
    index: number;
    // value: string;
    placeholder: string;
    measureUnits: MeasureUnit[];
    error: boolean;
    // onChange: () => void;
};

export const UiSelect = ({
    index,
    // value,
    measureUnits,
    placeholder,
    // onChange,
    error,
    ...props
}: Props) => (
    <Select
        {...props}
        data-test-id={`recipe-ingredients-measureUnit-${index}`}
        // onChange={onChange}
        // value={value}
        placeholder={placeholder}
        borderColor={error ? 'error.400' : 'border.light'}
        _focus={
            error
                ? { borderColor: 'error.400', boxShadow: 'none' }
                : { borderColor: 'primary.300', boxShadow: 'none' }
        }
        textOverflow='ellipsis'
        whiteSpace='nowrap'
        overflowX='hidden'
    >
        {measureUnits?.map((unit) => (
            <option key={unit._id} value={unit.name}>
                {unit.name}
            </option>
        ))}
        {/* <option value={value}>{value}</option> */}
    </Select>
);
