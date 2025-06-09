import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    Tag,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';

import { getOptionTestId } from '~/utils/test-utils';

import { UiTag } from '../ui/UiTag';

type Props = {
    options: string[];
    placeholder: string;
    selected: string[];
    setSelected: (value: string[]) => void;
    error?: boolean;
    children?: React.ReactNode;
    isDisabled?: boolean;
    dataButton?: string;
    dataList?: string;
    testSubject?: string;
    tagsCloseBtn?: boolean;
    multiSelect?: boolean;
};

export const SelectOptions = ({
    selected,
    setSelected,
    options,
    placeholder,
    children,
    isDisabled = false,
    dataButton,
    dataList,
    testSubject = '',
    tagsCloseBtn = true,
    error,
}: Props) => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const countVisibleTags = useBreakpointValue({ base: 1, md: 2 }) || 2;
    const tagsOverflow = selected.length - countVisibleTags;
    const visibleTags = tagsOverflow > 0 ? selected.slice(0, countVisibleTags) : selected;

    return (
        <Menu
            variant='select'
            isOpen={isOpen}
            onClose={onClose}
            modifiers={[
                {
                    name: 'matchWidth',
                    enabled: true,
                    options: {
                        matchWidth: true,
                    },
                },
            ]}
        >
            <MenuButton
                isDisabled={isDisabled}
                data-test-id={dataButton}
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
                borderColor={error ? 'error.400' : 'border.light'}
                bg='neutral.0'
                color='neutral.300'
                _hover={{ bg: 'neutral.0' }}
                _active={{ bg: 'neutral.0', borderColor: 'primary.300' }}
                _focus={
                    error
                        ? { borderColor: 'error.400' }
                        : { borderColor: 'primary.300', bg: 'neutral.0', boxShadow: 'none' }
                }
            >
                {selected.length > 0 ? (
                    <Flex gap={2}>
                        {visibleTags.map((value) => (
                            <UiTag
                                key={value}
                                isClosable={tagsCloseBtn}
                                selected={selected}
                                setSelected={setSelected}
                                label={value}
                            />
                        ))}
                        {tagsOverflow > 0 && <Tag variant='outline'>+{tagsOverflow}</Tag>}
                    </Flex>
                ) : (
                    placeholder
                )}
            </MenuButton>

            <MenuList zIndex={10} overflowY='scroll' data-test-id={dataList}>
                <CheckboxGroup
                    value={selected}
                    onChange={(value: string[]) => {
                        setSelected(value);
                    }}
                >
                    {isOpen && (
                        <Box maxH='424px'>
                            {options.map((option, i) => (
                                <Checkbox
                                    data-test-id={getOptionTestId(option, i, testSubject)}
                                    p='6px 16px'
                                    _odd={{ bg: 'neutral.20' }}
                                    variant='select'
                                    key={option + i}
                                    value={option}
                                >
                                    {option}
                                </Checkbox>
                            ))}
                            {children}
                        </Box>
                    )}
                </CheckboxGroup>
            </MenuList>
        </Menu>
    );
};
