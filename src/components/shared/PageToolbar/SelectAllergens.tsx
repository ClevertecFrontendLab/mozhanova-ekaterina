import { Box, Button, Flex, FormLabel, Input, Switch } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PlusIcon } from '~/components/ui/icons/PlusIcon';
import { allergens } from '~/mocks/allergens';
import { RecipesState, setAllergensFilter } from '~/store/recipe-slice';

import { SelectOptions } from './SelectOptions';

export function SelectAllergens() {
    const allergensQuery = useSelector(
        (state: { recipe: RecipesState }) => state.recipe.filters.allergens,
    );
    const [selected, setSelected] = useState<string[]>([]);
    const [switchAllergens, setSwitchAllergens] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (switchAllergens) {
            dispatch(setAllergensFilter(selected));
        } else if (!switchAllergens) {
            dispatch(setAllergensFilter([]));
        }
    }, [selected, switchAllergens, dispatch]);

    useEffect(() => {
        if (allergensQuery.length > 0) {
            setSelected(allergensQuery);
            setSwitchAllergens(true);
        }
    }, [allergensQuery]);

    return (
        <Flex alignItems='center' gap={4} mt='18px' justifyContent='space-between'>
            <Flex pl='8px' gap='12px' alignItems='center'>
                <FormLabel fontWeight='500' m='0' htmlFor='allergens' whiteSpace='nowrap'>
                    Исключить мои аллергены
                </FormLabel>
                <Switch
                    data-test-id='allergens-switcher'
                    isChecked={switchAllergens}
                    onChange={(e) => setSwitchAllergens(e.target.checked)}
                    id='allergens'
                />
            </Flex>

            <Box w='269px'>
                <SelectOptions
                    test='allergens'
                    setSelected={setSelected}
                    selected={selected}
                    placeholder='Выберите из списка...'
                    options={allergens.map((allergen) => Object.keys(allergen)[0])}
                    showSelected
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                >
                    <Flex p='8px 14px 8px 24px' gap='14px' alignItems='center'>
                        <Input
                            data-test-id='add-other-allergen'
                            variant='custom'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setSelected([...selected, inputValue]);
                                    setInputValue('');
                                }
                            }}
                            size='sm'
                            placeholder='Другой аллерген'
                        />
                        <Button
                            data-test-id='add-allergen-button'
                            size='xs'
                            p={0}
                            bg='transparent'
                            _hover={{ bg: 'neutral.50' }}
                        >
                            <PlusIcon />
                        </Button>
                    </Flex>
                </SelectOptions>
            </Box>
        </Flex>
    );
}
