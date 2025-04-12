import { Box, ChevronDownIcon, Flex, Image } from '@chakra-ui/icons';
import { useState } from 'react';

type Props = {
    title: string;
    iconSrc: string;
    subCategories?: { id: string; label: string }[];
};

export function NavigationItem({ title, iconSrc, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Box as='li' w='230px' data-test-id={title === 'Веганская кухня' ? 'vegan-cuisine' : null}>
            <Flex
                gap='12px'
                padding='12px 8px'
                alignItems='center'
                justifyContent='space-between'
                fontWeight='500'
                cursor='pointer'
                onClick={() => setIsOpen((prev) => !prev)}
                _active={{ backgroundColor: 'primary.50' }}
            >
                <Flex gap='12px' whiteSpace='nowrap' _hover={{ fontWeight: '700' }}>
                    <Image width='24px' height='24px' src={iconSrc} alt='menu_item_icon' />
                    <span>{title}</span>
                </Flex>
                <ChevronDownIcon width='16px' height='16px' />
            </Flex>

            {children && (
                <Box role='group' as='ul' paddingLeft='33px' display={isOpen ? 'block' : 'none'}>
                    {children.map((child, i) => (
                        <Flex
                            key={i}
                            as='li'
                            padding='6px 0'
                            cursor='pointer'
                            whiteSpace='nowrap'
                            _hover={{
                                fontWeight: '700',
                                '& .divider': { width: '8px', transform: 'translateX(-100%)' },
                            }}
                        >
                            <Box
                                className='divider'
                                marginRight='12px'
                                width='1px'
                                height='24px'
                                bg='primary.200'
                                transition='all 0.3s ease-in-out'
                            ></Box>
                            {child}
                        </Flex>
                    ))}
                </Box>
            )}
        </Box>
    );
}
