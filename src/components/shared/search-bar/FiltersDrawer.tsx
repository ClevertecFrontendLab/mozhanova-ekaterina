import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormLabel,
    Heading,
    Input,
    Switch,
    Tag,
    TagCloseButton,
    TagLabel,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { PlusIcon } from '~/components/ui/icons/PlusIcon';
import { UiButton } from '~/components/ui/UiButton';
import { AppRoutes } from '~/config';
import { allergens } from '~/mocks/allergens';
import { authors } from '~/mocks/authors';
import { garnish } from '~/mocks/garnish';
import { meat } from '~/mocks/meat';
import { ApplicationState } from '~/store/configure-store';
import {
    cleanFilters,
    setAllergensFilter,
    setAuthorsFilter,
    setCategoryFilter,
    setGarnishFilter,
    setMeatFilter,
    setSubCategoryFilter,
} from '~/store/recipe-slice';
import { selectCategories, selectFilters, selectSubCategoriesByTitles } from '~/store/selectors';

import { SelectOptions } from '../SelectOptions';

export const FiltersDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const categories = useSelector(selectCategories);

    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedMeat, setSelectedMeat] = useState<string[]>([]);
    const [selectedGarnish, setSelectedGarnish] = useState<string[]>([]);

    const [allergenInput, setAllergenInput] = useState('');
    const [switchAllergens, setSwitchAllergens] = useState(
        filters.allergens.length > 0 ? true : false,
    );
    const selectedCategoriesIds = useSelector((state: ApplicationState) =>
        selectSubCategoriesByTitles(state, selectedCategory),
    );
    const navigate = useNavigate();

    const handleClean = () => {
        dispatch(cleanFilters());
        setSelectedCategory([]);
        setSelectedAllergens([]);
        setSelectedAuthors([]);
        setSelectedMeat([]);
        setSelectedGarnish([]);
    };

    const handleApply = () => {
        dispatch(cleanFilters());
        dispatch(setAllergensFilter(selectedAllergens));
        dispatch(setSubCategoryFilter(selectedCategoriesIds));
        dispatch(setCategoryFilter(selectedCategory));
        dispatch(setAuthorsFilter(selectedAuthors));
        dispatch(setMeatFilter(selectedMeat));
        dispatch(setGarnishFilter(selectedGarnish));
        onClose();
        navigate(AppRoutes.SEARCH);
        setSelectedCategory([]);
        setSelectedAllergens([]);
        setSelectedAuthors([]);
        setSelectedMeat([]);
        setSelectedGarnish([]);
    };

    const isDisabled = () =>
        selectedCategory.length === 0 &&
        selectedAllergens.length === 0 &&
        selectedAuthors.length === 0 &&
        selectedMeat.length === 0 &&
        selectedGarnish.length === 0;

    useEffect(() => {
        setSelectedAllergens(filters.allergens);
        if (filters.allergens.length > 0) {
            setSwitchAllergens(true);
        } else {
            setSwitchAllergens(false);
        }
    }, [filters.allergens]);

    useEffect(() => {
        setSelectedAuthors(filters.authors);
    }, [filters.authors]);

    useEffect(() => {
        setSelectedMeat(filters.meat);
    }, [filters.meat]);

    useEffect(() => {
        setSelectedGarnish(filters.garnish);
    }, [filters.garnish]);

    return (
        <Drawer
            size={{
                base: 'xs',
                md: 'custom',
            }}
            variant='filter'
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent data-test-id='filter-drawer'>
                <DrawerCloseButton data-test-id='close-filter-drawer' />
                <DrawerHeader>Фильтр</DrawerHeader>
                <DrawerBody>
                    <VStack spacing={{ base: 4, md: 6 }} align='start'>
                        <SelectOptions
                            dataButton='filter-menu-button-категория'
                            selected={selectedCategory}
                            setSelected={setSelectedCategory}
                            placeholder='Категория'
                            options={categories.map((item) => item.title)}
                            tagsCloseBtn={false}
                        />
                        <SelectOptions
                            selected={selectedAuthors}
                            setSelected={setSelectedAuthors}
                            placeholder='Поиск по автору'
                            options={authors}
                            tagsCloseBtn={false}
                        >
                            <Checkbox
                                p='6px 16px'
                                _odd={{ bg: 'neutral.20' }}
                                variant='select'
                                key='Только новые авторы'
                                value='Только новые авторы'
                                bg='neutral.0 !important'
                            >
                                Только новые авторы
                            </Checkbox>
                        </SelectOptions>
                        <VStack align='start' spacing={3}>
                            <Heading fontSize='md' fontWeight={500}>
                                Тип мяса:
                            </Heading>
                            <CheckboxGroup
                                value={selectedMeat}
                                onChange={(value: string[]) => setSelectedMeat(value)}
                            >
                                {meat.map((item) => (
                                    <Checkbox variant='select' value={item} key={item}>
                                        {item}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </VStack>
                        <VStack align='start' spacing={3}>
                            <Heading fontSize='md' fontWeight={500}>
                                Тип гарнира:
                            </Heading>
                            <CheckboxGroup
                                value={selectedGarnish}
                                onChange={(value: string[]) => setSelectedGarnish(value)}
                            >
                                {garnish.map((item) => (
                                    <Checkbox
                                        data-test-id={
                                            item.label === 'Картошка' && 'checkbox-картошка'
                                        }
                                        variant='select'
                                        value={item.label}
                                        key={item.id}
                                    >
                                        {item.label}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </VStack>
                        <Box w='100%'>
                            <Flex gap={3} p='6px 8px' mb={2}>
                                <FormLabel
                                    fontWeight='500'
                                    m='0'
                                    htmlFor='allergens'
                                    whiteSpace='nowrap'
                                >
                                    Исключить мои аллергены
                                </FormLabel>
                                <Switch
                                    data-test-id='allergens-switcher-filter'
                                    isChecked={switchAllergens}
                                    onChange={() => {
                                        setSwitchAllergens(!switchAllergens);
                                        setSelectedAllergens([]);
                                    }}
                                    id='allergens'
                                />
                            </Flex>
                            <Box>
                                <SelectOptions
                                    tagsCloseBtn={false}
                                    isDisabled={!switchAllergens}
                                    selected={selectedAllergens}
                                    setSelected={setSelectedAllergens}
                                    placeholder='Выберите из списка аллергенов...'
                                    options={allergens.map((allergen) => Object.keys(allergen)[0])}
                                    dataButton='allergens-menu-button-filter'
                                    testSubject='allergens'
                                >
                                    <Flex p='8px 14px 8px 24px' gap='14px' alignItems='center'>
                                        <Input
                                            data-test-id='add-other-allergen'
                                            variant='select'
                                            value={allergenInput}
                                            onChange={(e) => setAllergenInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    setSelectedAllergens([
                                                        ...selectedAllergens,
                                                        allergenInput,
                                                    ]);
                                                    setAllergenInput('');
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
                                            onClick={() =>
                                                setSelectedAllergens([
                                                    ...selectedAllergens,
                                                    allergenInput,
                                                ])
                                            }
                                        >
                                            <PlusIcon />
                                        </Button>
                                    </Flex>
                                </SelectOptions>
                            </Box>
                        </Box>
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <VStack align='start' spacing={8}>
                        <Flex gap={4} wrap='wrap'>
                            {selectedCategory.length > 0 &&
                                selectedCategory.map((item) => (
                                    <Tag
                                        data-test-id='filter-tag'
                                        size='md'
                                        key={item}
                                        variant='outline'
                                        bg='primary.50'
                                    >
                                        <TagLabel>{item}</TagLabel>
                                        <TagCloseButton
                                            onClick={() =>
                                                setSelectedCategory([
                                                    ...selectedCategory.filter((i) => i !== item),
                                                ])
                                            }
                                        />
                                    </Tag>
                                ))}
                            {selectedAuthors.length > 0 &&
                                selectedAuthors.map((item) => (
                                    <Tag
                                        data-test-id='filter-tag'
                                        size='md'
                                        key={item}
                                        variant='outline'
                                        bg='primary.50'
                                    >
                                        <TagLabel>{item}</TagLabel>
                                        <TagCloseButton
                                            onClick={() =>
                                                setSelectedAuthors([
                                                    ...selectedAuthors.filter((i) => i !== item),
                                                ])
                                            }
                                        />
                                    </Tag>
                                ))}
                            {selectedMeat.length > 0 &&
                                selectedMeat.map((item) => (
                                    <Tag
                                        data-test-id='filter-tag'
                                        size='md'
                                        key={item}
                                        variant='outline'
                                        bg='primary.50'
                                    >
                                        <TagLabel>{item}</TagLabel>
                                        <TagCloseButton
                                            onClick={() =>
                                                setSelectedMeat([
                                                    ...selectedMeat.filter((i) => i !== item),
                                                ])
                                            }
                                        />
                                    </Tag>
                                ))}
                            {selectedGarnish.length > 0 &&
                                selectedGarnish.map((item) => (
                                    <Tag
                                        data-test-id='filter-tag'
                                        size='md'
                                        key={item}
                                        variant='outline'
                                        bg='primary.50'
                                    >
                                        <TagLabel>{item}</TagLabel>
                                        <TagCloseButton
                                            onClick={() =>
                                                setSelectedGarnish([
                                                    ...selectedGarnish.filter((i) => i !== item),
                                                ])
                                            }
                                        />
                                    </Tag>
                                ))}
                            {selectedAllergens.length > 0 &&
                                selectedAllergens.map((item) => (
                                    <Tag
                                        data-test-id='filter-tag'
                                        size='md'
                                        key={item}
                                        variant='outline'
                                        bg='primary.50'
                                    >
                                        <TagLabel>{item}</TagLabel>
                                        <TagCloseButton
                                            onClick={() =>
                                                setSelectedAllergens([
                                                    ...selectedAllergens.filter((i) => i !== item),
                                                ])
                                            }
                                        />
                                    </Tag>
                                ))}
                        </Flex>
                        <Flex justifyContent='flex-end' gap={2}>
                            <UiButton
                                data-test-id='clear-filter-button'
                                size={{ base: 'sm', md: 'lg' }}
                                variant='outline'
                                onClick={handleClean}
                                text='Очистить фильтр'
                            />
                            <UiButton
                                data-test-id='find-recipe-button'
                                size={{ base: 'sm', md: 'lg' }}
                                variant='solid'
                                onClick={handleApply}
                                text='Найти рецепт'
                                isDisabled={isDisabled()}
                            />
                        </Flex>
                    </VStack>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
