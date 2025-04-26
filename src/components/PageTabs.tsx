import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { categories } from '~/mocks/categories';
import { setCategoryFilter, setSubCategoryFilter } from '~/store/recipe-slice';
import { selectFilteredRecipes } from '~/store/selectors';

import UiCardGrid from './ui/UiCardGrid';

export function PageTabs() {
    const [isLargerThanLG] = useMediaQuery('(min-width: 1441px)');
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const filteredRecipes = useSelector(selectFilteredRecipes);

    const currentCategory = params.category as string;
    const currentSubCategory = params.subCategory as string;
    const subCategories = categories.find(
        (category) => category.id === currentCategory,
    )!.subCategories;
    const activeIndex = subCategories.findIndex((category) => category.id === currentSubCategory);

    const handleTabChange = (index: number) => {
        const selectedCategory = subCategories[index];
        navigate(`/${currentCategory}/${selectedCategory.id}`);
    };

    useEffect(() => {
        setTabIndex(activeIndex || 0);
        dispatch(setCategoryFilter([currentCategory]));
        dispatch(setSubCategoryFilter([currentSubCategory]));
    }, [currentSubCategory, currentCategory, dispatch, activeIndex]);

    return (
        <Tabs
            variant='line'
            align={isLargerThanLG ? 'center' : 'start'}
            index={tabIndex}
            onChange={handleTabChange}
        >
            <TabList
                w='fit-content'
                maxW='100%'
                overflowX={{
                    base: 'auto',
                    md: 'unset',
                }}
                overflowY={{
                    base: 'hidden',
                    md: 'unset',
                }}
                flexWrap={{
                    base: 'nowrap',
                    lg: 'wrap',
                }}
            >
                {subCategories.map((category, i) => (
                    <Tab
                        data-test-id={`tab-${category.id}-${i}`}
                        whiteSpace='nowrap'
                        key={category.id}
                    >
                        {category.label}
                    </Tab>
                ))}
            </TabList>
            {filteredRecipes.length > 0 ? (
                <>
                    <TabPanels>
                        {subCategories.map((category) => (
                            <TabPanel key={category.id}>
                                {category.id === currentSubCategory && (
                                    <UiCardGrid data={filteredRecipes} />
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </>
            ) : (
                <Flex p={4}>Ничего не нашлось</Flex>
            )}
        </Tabs>
    );
}
