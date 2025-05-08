import { Box, Button, Flex, FormLabel, Input, Switch, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PlusIcon } from '~/components/ui/icons/PlusIcon';
import { allergens } from '~/mocks/allergens';
import { ApplicationState } from '~/store/configure-store';

import { SelectOptions } from '../SelectOptions';

export function SelectAllergens({
    selected,
    setSelected,
}: {
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const [switchAllergens, setSwitchAllergens] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { isOpen, onToggle, onClose } = useDisclosure();

    // const dispatch = useDispatch();
    const { allergens: selectedAllergens } = useSelector(
        (state: ApplicationState) => state.recipe.filters,
    );

    // useEffect(() => {
    //     // dispatch(setAllergensFilter(selected));
    //     // if (selected.length > 0) onSearch && onSearch(true);
    // }, [selected]);

    useEffect(() => {
        if (!switchAllergens && selected.length > 0) {
            // dispatch(setAllergensFilter([]));
            setSelected([]);
            // onSearch && onSearch(true);
        }
    }, [switchAllergens, selected, setSelected]);

    useEffect(() => {
        if (selectedAllergens.length > 0) {
            setSwitchAllergens(true);
            setSelected(selectedAllergens);
        } else {
            !isOpen && setSwitchAllergens(false);
        }
    }, [selectedAllergens, isOpen, setSelected]);

    // useEffect(() => {
    //     () => dispatch(setAllergensFilter([]));
    // }, [dispatch]);

    return (
        <Flex alignItems='center' gap={4} mt='18px' justifyContent='center'>
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
                    isOpen={isOpen}
                    onClose={onClose}
                    onToggle={onToggle}
                    setSelected={setSelected}
                    selected={selected}
                    placeholder='Выберите из списка...'
                    options={allergens.map((allergen) => Object.keys(allergen)[0])}
                    isDisabled={!switchAllergens}
                    testSubject='allergens'
                    dataButton='allergens-menu-button'
                    dataList='allergens-menu'
                >
                    {isOpen && (
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
                                onClick={() => setSelected([...selected, inputValue])}
                            >
                                <PlusIcon />
                            </Button>
                        </Flex>
                    )}
                </SelectOptions>
            </Box>
        </Flex>
    );
}
