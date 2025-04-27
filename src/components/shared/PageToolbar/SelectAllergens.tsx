import { Box, Button, Flex, FormLabel, Input, Switch } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { PlusIcon } from '~/components/ui/icons/PlusIcon';
import { allergens } from '~/mocks/allergens';
import { setAllergensFilter } from '~/store/recipe-slice';

import { SelectOptions } from './SelectOptions';

export function SelectAllergens() {
    const [selected, setSelected] = useState<string[]>([]);
    const [switchAllergens, setSwitchAllergens] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAllergensFilter(selected));
    }, [selected, dispatch]);

    useEffect(() => {
        !switchAllergens && setSelected([]);
    }, [switchAllergens]);

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
                </SelectOptions>
            </Box>
        </Flex>
    );
}
