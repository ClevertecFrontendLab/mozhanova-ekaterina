import { Box, Button, Flex, FormLabel, Input, Switch } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PlusIcon } from '~/components/ui/icons/GreenPlusIcon';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { allergens } from '~/mocks/allergens';
import { ApplicationState } from '~/store/configure-store';

import { SelectOptions } from '../SelectOptions';

export const SelectAllergens = ({
    selected,
    setSelected,
}: {
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const [switchAllergens, setSwitchAllergens] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const { allergens: selectedAllergens } = useSelector(
        (state: ApplicationState) => state.recipe.filters,
    );

    useEffect(() => {
        if (!switchAllergens && selected.length > 0) {
            setSelected([]);
        }
    }, [switchAllergens, selected, setSelected]);

    useEffect(() => {
        if (selectedAllergens.length > 0) {
            setSwitchAllergens(true);
            setSelected(selectedAllergens);
        }
    }, [selectedAllergens, setSelected]);

    return (
        <Flex alignItems='center' gap={4} mt='18px' justifyContent='center'>
            <Flex pl='8px' gap='12px' alignItems='center'>
                <FormLabel fontWeight='500' m='0' htmlFor='allergens' whiteSpace='nowrap'>
                    Исключить мои аллергены
                </FormLabel>
                <Switch
                    data-test-id={DATA_TEST_IDS.ALLERGENS_SWITCHER}
                    isChecked={switchAllergens}
                    onChange={(e) => setSwitchAllergens(e.target.checked)}
                    id='allergens'
                />
            </Flex>

            <Box w='269px'>
                <SelectOptions
                    setSelected={setSelected}
                    selected={selected}
                    placeholder='Выберите из списка...'
                    options={allergens.map((allergen) => Object.keys(allergen)[0])}
                    isDisabled={!switchAllergens}
                    testSubject='allergens'
                    dataButton='allergens-menu-button'
                    dataList='allergens-menu'
                >
                    <Flex p='8px 14px 8px 24px' gap='14px' alignItems='center'>
                        <Input
                            data-test-id={DATA_TEST_IDS.ADD_OTHER_ALLERGEN}
                            variant='select'
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
                            data-test-id={DATA_TEST_IDS.ADD_ALLERGEN_BUTTON}
                            size='xs'
                            p={0}
                            bg='transparent'
                            _hover={{ bg: 'neutral.50' }}
                            onClick={() => setSelected([...selected, inputValue])}
                        >
                            <PlusIcon />
                        </Button>
                    </Flex>
                </SelectOptions>
            </Box>
        </Flex>
    );
};
