import { Box, ChevronDownIcon, ChevronUpIcon, Flex, Image, useMediaQuery } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { API_IMAGE_URL } from '~/config';
import { TCategory } from '~/types';
import { routeHelpers } from '~/utils/get-routes';

type Props = {
    category: TCategory;
    setMenuOpen: (value: boolean) => void;
    'data-id'?: string;
};

export const NavigationItem = ({ category, setMenuOpen, ...props }: Props) => {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)', { ssr: false });
    const [isOpen, setIsOpen] = useState(false);
    const { category: currentCategory, subCategory: currentSubCategory } = useParams();

    useEffect(() => {
        currentCategory === category.category ? setIsOpen(true) : setIsOpen(false);
    }, [currentCategory, category.category]);

    return (
        <Box
            bgColor='background.base'
            data-test-id={category.category === 'vegan' ? 'vegan-cuisine' : `${category.category}`}
            as='li'
            {...props}
        >
            <Flex
                gap='12px'
                padding='12px 8px'
                alignItems='center'
                justifyContent='space-between'
                fontWeight='500'
                cursor='pointer'
                bgColor={currentCategory === category.category ? 'primary.50' : 'transparent'}
            >
                <Flex gap='12px' whiteSpace='nowrap' _hover={{ fontWeight: '700' }}>
                    <Image
                        width='24px'
                        height='24px'
                        src={`${API_IMAGE_URL}${category.icon}`}
                        alt='menu_item_icon'
                    />
                    <Link
                        to={routeHelpers.getSubCategoryPath(
                            category.category,
                            category.subCategories[0].category,
                        )}
                    >
                        {category.title}
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
                {category.subCategories.map((subCategory) => (
                    <Flex
                        data-id={subCategory._id}
                        key={`${category._id}-${subCategory._id}`}
                        as='li'
                        padding='6px 0'
                        cursor='pointer'
                        whiteSpace='nowrap'
                        _hover={{
                            fontWeight: '700',
                            '& .divider': { width: '8px', transform: 'translateX(-100%)' },
                        }}
                        aria-current={
                            subCategory.category === currentSubCategory ? 'page' : undefined
                        }
                        _activeLink={{
                            fontWeight: '700',
                            '& .divider': { width: '8px', transform: 'translateX(-100%)' },
                        }}
                        data-test-id={
                            subCategory.category === currentSubCategory &&
                            `${subCategory.category}-active`
                        }
                    >
                        <Box
                            className='divider'
                            marginRight='12px'
                            width='1px'
                            height='24px'
                            bg='primary.200'
                            transition='all 0.3s ease-in-out'
                        ></Box>
                        <Link
                            onClick={() => !isLargerThanMD && setMenuOpen(false)}
                            to={routeHelpers.getSubCategoryPath(
                                category.category,
                                subCategory.category,
                            )}
                        >
                            {subCategory.title}
                        </Link>
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};
