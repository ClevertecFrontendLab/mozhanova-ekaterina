import { Box, ChevronDownIcon, ChevronUpIcon, Flex, Image } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

type Props = {
    title: string;
    iconSrc: string;
    currentCategory: string;
    subCategories?: { id: string; label: string }[];
};

export function NavigationItem({ title, iconSrc, currentCategory, subCategories }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const currentSubCategory = location.pathname.split('/').pop() ?? '';
    const currentPage = location.pathname.split('/').filter((x) => x)[0] ?? '';

    useEffect(() => {
        currentPage === currentCategory ? setIsOpen(true) : setIsOpen(false);
    }, [currentPage, currentCategory]);
    return (
        <Box as='li' w='230px' data-test-id={title === 'Веганская кухня' ? 'vegan-cuisine' : null}>
            <Link to='/vegan-cuisine/vegan-main-course'>
                <Flex
                    gap='12px'
                    padding='12px 8px'
                    alignItems='center'
                    justifyContent='space-between'
                    fontWeight='500'
                    cursor='pointer'
                    onClick={() => setIsOpen((prev) => !prev)}
                    bgColor={currentPage === currentCategory ? 'primary.50' : 'transparent'}
                >
                    <Flex gap='12px' whiteSpace='nowrap' _hover={{ fontWeight: '700' }}>
                        <Image width='24px' height='24px' src={iconSrc} alt='menu_item_icon' />
                        <span>{title}</span>
                    </Flex>
                    {isOpen ? (
                        <ChevronUpIcon width='16px' height='16px' />
                    ) : (
                        <ChevronDownIcon width='16px' height='16px' />
                    )}
                </Flex>
            </Link>

            {subCategories && (
                <Box role='group' as='ul' paddingLeft='33px' display={isOpen ? 'block' : 'none'}>
                    {subCategories.map((child) => (
                        <Flex
                            key={child.id}
                            as='li'
                            padding='6px 0'
                            cursor='pointer'
                            whiteSpace='nowrap'
                            _hover={{
                                fontWeight: '700',
                                '& .divider': { width: '8px', transform: 'translateX(-100%)' },
                            }}
                            aria-current={child.id === currentSubCategory ? 'page' : undefined}
                            _activeLink={{
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
                            <Link to={`/vegan-cuisine/${child.id}`}>{child.label}</Link>
                        </Flex>
                    ))}
                </Box>
            )}
        </Box>
    );
}
