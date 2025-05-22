import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useToast } from '~/hooks/use-toast';
import { Limit } from '~/query/constants/limits';
import { useGetRecipesByCategoryQuery } from '~/query/recipe-api';
import { ApplicationState } from '~/store/configure-store';
import { selectCurrentRootCategory, selectFilters } from '~/store/selectors';

import { UiCardGrid } from './ui/UiCardGrid';

export const RecipesTabs = () => {
    const [isLargerThanLG] = useBreakpoint('lg');
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();
    const { category, subCategory } = useParams();
    const { showError } = useToast();
    const filters = useSelector(selectFilters);

    const currentCategory = useSelector((state: ApplicationState) =>
        selectCurrentRootCategory(state, category as string),
    );
    const currentSubCategory = useMemo(() => {
        if (currentCategory)
            return (
                currentCategory.subCategories?.find(
                    (category) => category.category === subCategory,
                ) || null
            );
    }, [currentCategory, subCategory]);

    const handleTabChange = (index: number) => {
        const selectedCategory = currentCategory?.subCategories[index];
        if (!selectedCategory) return;
        navigate(`/${category}/${selectedCategory.category}`);
    };

    const { currentData, isError } = useGetRecipesByCategoryQuery(
        {
            categoryId: currentSubCategory?._id || '',
            limit: Limit.DEFAULT,
            ...(filters.searchString && { searchString: filters.searchString }),
            ...(filters.allergens.length > 0 && { allergens: filters.allergens }),
        },
        {
            skip: !currentSubCategory,
        },
    );

    useEffect(() => {
        if (!currentCategory) return;
        const activeIndex = currentCategory.subCategories.findIndex(
            (category) => category.category === subCategory,
        );
        setTabIndex(activeIndex);
    }, [currentCategory, subCategory]);

    useEffect(() => {
        if (isError) {
            showError({ title: 'Ошибка сервера', description: 'Попробуйте попозже' });
            navigate(-1);
        }
    }, [isError, showError, navigate]);

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
                {currentCategory &&
                    Array.isArray(currentCategory.subCategories) &&
                    currentCategory.subCategories.map((category, i) => (
                        <Tab
                            data-test-id={`tab-${category.category}-${i}`}
                            whiteSpace='nowrap'
                            key={category._id}
                        >
                            {category.title}
                        </Tab>
                    ))}
            </TabList>
            <TabPanels>
                {currentCategory &&
                    Array.isArray(currentCategory.subCategories) &&
                    currentCategory.subCategories.map((category) => (
                        <TabPanel key={category._id}>
                            {category.category === subCategory && (
                                <UiCardGrid data={currentData?.data} />
                            )}
                        </TabPanel>
                    ))}
            </TabPanels>
        </Tabs>
    );
};
