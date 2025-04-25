import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuList,
    Tag,
    TagCloseButton,
    TagLabel,
    useDisclosure,
} from '@chakra-ui/react';

import { PlusIcon } from '~/components/ui/icons/PlusIcon';

type Props = {
    options: string[];
    placeholder: string;
    selected: string[];
    children?: React.ReactNode;
    showSelected?: boolean;
    inputValue?: string;
    isDisabled?: boolean;
    readOnly?: boolean;
    test?: string;
    setInputValue?: (value: string) => void;
    setSelected: (value: string[]) => void;
};

export function SelectOptions({
    selected,
    setSelected,
    options,
    placeholder,
    children,
    showSelected = false,
    inputValue,
    setInputValue,
    isDisabled = false,
    readOnly = false,
    test,
}: Props) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const handleRemove = (value: string) => {
        setSelected(selected.filter((item) => item !== value));
    };

    return (
        <Menu variant='select' isOpen={isOpen} onClose={onClose}>
            {showSelected ? (
                <MenuButton
                    data-test-id={test === 'allergens' && 'allergens-menu-button'}
                    as={Button}
                    rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={onToggle}
                    textAlign='left'
                    minH='40px'
                    h='fit-content'
                    p='8px 16px'
                    width='100%'
                    fontWeight={400}
                    borderWidth='1px'
                    borderColor='border.light'
                    bg='neutral.0'
                    color='neutral.300'
                    _hover={{ bg: 'neutral.0' }}
                    _active={{ bg: 'neutral.0', borderColor: 'primary.300' }}
                    _focus={{ borderColor: 'primary.300', bg: 'neutral.0' }}
                >
                    {selected.length > 0 ? (
                        <Flex gap={2} flexWrap='wrap'>
                            {selected.map((value) => (
                                <Tag
                                    css={{
                                        pointerEvents: 'auto',
                                        '& > *': {
                                            pointerEvents: 'auto',
                                        },
                                    }}
                                    key={value}
                                    variant='outline'
                                >
                                    <TagLabel>{value}</TagLabel>
                                    <TagCloseButton as='div' onClick={() => handleRemove(value)} />
                                </Tag>
                            ))}
                        </Flex>
                    ) : (
                        placeholder
                    )}
                </MenuButton>
            ) : (
                <MenuButton
                    data-test-id='allergens-menu-button-filter'
                    w='100%'
                    css={{
                        pointerEvents: 'auto',
                        '& > *': {
                            pointerEvents: 'auto',
                        },
                    }}
                    onClick={onToggle}
                >
                    <InputGroup>
                        <Input
                            data-test-id='add-other-allergen'
                            readOnly={readOnly}
                            disabled={isDisabled}
                            variant='select'
                            value={inputValue}
                            onChange={(e) => setInputValue!(e.target.value)}
                            placeholder={placeholder}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && setSelected([...selected, inputValue!.trim()])
                            }
                        />
                        <InputRightElement data-test-id='add-allergen-button'>
                            <PlusIcon
                                onClick={() =>
                                    selected.length > 0 &&
                                    setSelected([...selected, inputValue!.trim()])
                                }
                                size='15px'
                            />
                        </InputRightElement>
                    </InputGroup>
                </MenuButton>
            )}

            <MenuList
                zIndex={2}
                overflow='hidden'
                data-test-id={test === 'allergens' && 'allergens-menu'}
            >
                <CheckboxGroup value={selected} onChange={(value: string[]) => setSelected(value)}>
                    <Box overflowY='auto'>
                        {options.map((option, i) => (
                            <Checkbox
                                data-test-id={
                                    option === 'Веганская кухня'
                                        ? 'checkbox-веганская кухня'
                                        : test === 'allergens' && `allergen-${i}`
                                }
                                p='6px 16px'
                                _odd={{ bg: 'neutral.20' }}
                                variant='select'
                                key={option}
                                value={option}
                            >
                                {option}
                            </Checkbox>
                        ))}
                        {children}
                    </Box>
                </CheckboxGroup>
            </MenuList>
        </Menu>
    );
}
