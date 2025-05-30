import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import { useAppSelector } from '~/store/hooks';
import {
    selectSubcategories,
    selectSubCategoriesByTitles,
    selectSubCategoriesTitlesByIds,
} from '~/store/selectors';
import { NewRecipe } from '~/types';

import { SelectOptions } from '../shared/SelectOptions';

type Props = {
    error: boolean;
    control: Control<NewRecipe>;
};

export const TagsControl = ({ error, control }: Props) => {
    const {
        field: { value, onChange },
    } = useController({
        control,
        name: 'categoriesIds',
    });
    const selectedCategoriesTitles = useAppSelector((state: ApplicationState) =>
        selectSubCategoriesTitlesByIds(state, value),
    );
    const [selected, setSelected] = useState<string[]>(selectedCategoriesTitles);
    const categories = useSelector(selectSubcategories);
    const options = [...new Set(categories.map((category) => category.title))];
    const selectedCategoriesIds = useSelector((state: ApplicationState) =>
        selectSubCategoriesByTitles(state, selected),
    );

    useEffect(() => {
        onChange(selectedCategoriesIds);
    }, [selectedCategoriesIds]);

    return (
        <Flex gap={6} mb={2} align='center' w='100%' justify='space-between'>
            <Text
                whiteSpace={{ base: 'normal', lg: 'nowrap' }}
                fontWeight={600}
                fontSize={{ base: 'sm', md: 'md' }}
            >
                Выберите не менее 3-х тегов
            </Text>
            <SelectOptions
                placeholder='Выберите из списка...'
                options={options}
                selected={selected}
                setSelected={setSelected}
                tagsCloseBtn={false}
                error={error}
                dataButton='recipe-categories'
            />
        </Flex>
    );
};
