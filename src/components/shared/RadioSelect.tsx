import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Radio,
    RadioGroup,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

type Props = {
    index: number;
    selected: string;
    placeholder: string;
    options: string[];
    error: boolean;
    setSelected: (value: string) => void;
};

export const RadioSelect = ({
    index,
    selected,
    options,
    placeholder,
    setSelected,
    error,
}: Props) => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    return (
        <Menu variant='select' isOpen={isOpen} onClose={onClose}>
            <MenuButton
                data-test-id={`recipe-ingredients-measureUnit-${index}`}
                textAlign='left'
                w='100%'
                onClick={onToggle}
                as={Button}
                borderWidth='1px'
                fontWeight={400}
                bg='neutral.0'
                borderColor={error ? 'error.400' : 'border.light'}
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                _hover={{ bg: 'neutral.0' }}
                _active={{ bg: 'neutral.0', borderColor: 'primary.300' }}
                _focus={{ borderColor: 'primary.300', bg: 'neutral.0', boxShadow: 'none' }}
            >
                {selected ? (
                    <Text>{selected}</Text>
                ) : (
                    <Text color='text.secondary'>{placeholder}</Text>
                )}
            </MenuButton>
            <MenuList overflowY='scroll' zIndex={10}>
                <RadioGroup onChange={setSelected} value={selected}>
                    {options.map((option) => (
                        <MenuItem key={option} _hover={{ bg: 'primary.50' }}>
                            <Radio value={option}>{option}</Radio>
                        </MenuItem>
                    ))}
                </RadioGroup>
            </MenuList>
        </Menu>
    );
};
