import { Box, ChevronDownIcon, ChevronUpIcon, Flex, Image } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { TCategory } from '~/types';

type Props = {
    category: TCategory;
};

export function NavigationItem({ category }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams();

    const currentCategory = params.category;
    const currentSubCategory = params.subCategory;

    useEffect(() => {
        currentCategory === category.id ? setIsOpen(true) : setIsOpen(false);
    }, [currentCategory, category.id]);

    return (
        <Box
            as='li'
            w={{
                base: 'unset',
                md: '230px',
            }}
        >
            <Flex
                gap='12px'
                padding='12px 8px'
                alignItems='center'
                justifyContent='space-between'
                fontWeight='500'
                cursor='pointer'
                bgColor={currentCategory === category.id ? 'primary.50' : 'transparent'}
            >
                <Flex gap='12px' whiteSpace='nowrap' _hover={{ fontWeight: '700' }}>
                    <Image width='24px' height='24px' src={category.iconSrc} alt='menu_item_icon' />
                    <Link to={`/${category.id}/${category.subCategories[0].id}`}>
                        {category.label}
                    </Link>
                </Flex>
                {isOpen ? (
                    <ChevronUpIcon
                        onClick={() => setIsOpen((prev) => !prev)}
                        width='16px'
                        height='16px'
                    />
                ) : (
                    <ChevronDownIcon
                        onClick={() => setIsOpen((prev) => !prev)}
                        width='16px'
                        height='16px'
                    />
                )}
            </Flex>

            <Box role='group' as='ul' paddingLeft='33px' display={isOpen ? 'block' : 'none'}>
                {category.subCategories.map((item) => (
                    <Flex
                        key={item.id}
                        as='li'
                        padding='6px 0'
                        cursor='pointer'
                        whiteSpace='nowrap'
                        _hover={{
                            fontWeight: '700',
                            '& .divider': { width: '8px', transform: 'translateX(-100%)' },
                        }}
                        aria-current={item.id === currentSubCategory ? 'page' : undefined}
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
                        <Link to={`/${category.id}/${item.id}`}>{item.label}</Link>
                    </Flex>
                ))}
            </Box>
        </Box>
    );
}
