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
    TagCloseButton,
    TagLabel,
    useDisclosure,
} from '@chakra-ui/react';

type Props = {
    options: string[];
    placeholder: string;
    selected: string[];
    children?: React.ReactNode;
    isDisabled?: boolean;
    dataButton?: string;
    dataList?: string;
    testSubject?: string;
    tagsCloseBtn?: boolean;
    setSelected: (value: string[]) => void;
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
    testSubject,
    tagsCloseBtn = true,
}: Props) => {
    const { isOpen, onToggle, onClose } = useDisclosure();
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
                                {tagsCloseBtn && (
                                    <TagCloseButton
                                        as='div'
                                        onClick={() =>
                                            setSelected(selected.filter((item) => item !== value))
                                        }
                                    />
                                )}
                            </Tag>
                        ))}
                    </Flex>
                ) : (
                    placeholder
                )}
            </MenuButton>

            <MenuList zIndex={10} overflow='hidden' data-test-id={dataList}>
                <CheckboxGroup value={selected} onChange={(value: string[]) => setSelected(value)}>
                    <Box overflowY='auto'>
                        {options.map((option, i) => (
                            <Checkbox
                                data-test-id={defineDataTestId(option, i, testSubject as string)}
                                p='6px 16px'
                                _odd={{ bg: 'neutral.20' }}
                                variant='select'
                                key={option}
                                value={option}
                            >
                                {option}
                            </Checkbox>
                        ))}
                        {isOpen && children}
                    </Box>
                </CheckboxGroup>
            </MenuList>
        </Menu>
    );
};

function defineDataTestId(option: string, i: number, testSubject: string) {
    switch (option) {
        case 'Картошка':
            return 'checkbox-картошка';
        case 'Веганская кухня':
            return 'checkbox-веганская кухня';
        default:
            return testSubject === 'allergens' ? `allergen-${i}` : '';
    }
}
