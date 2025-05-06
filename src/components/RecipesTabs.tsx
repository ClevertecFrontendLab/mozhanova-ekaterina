import { Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { useToast } from '~/hooks/use-toast';
import { useGetRecipesByCategoryQuery } from '~/query/recipe-api';
import { ApplicationState } from '~/store/configure-store';
import { selectCurrentRootCategory, selectFilters } from '~/store/selectors';

import UiCardGrid from './ui/UiCardGrid';

export function RecipesTabs() {
    const [isLargerThanLG] = useMediaQuery('(min-width: 1441px)');
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();
    const { category, subCategory } = useParams();
    const { showError } = useToast();
    const filters = useSelector(selectFilters);

    const currentCategory = useSelector((state: ApplicationState) =>
        selectCurrentRootCategory(state, category as string),
    );
    const currentSubCategory =
        currentCategory?.subCategories?.find((c) => c.category === subCategory) ?? null;

    const handleTabChange = (index: number) => {
        const selectedCategory = currentCategory?.subCategories[index];
        if (!selectedCategory) return;
        navigate(`/${category}/${selectedCategory.category}`);
    };

    const { currentData, isLoading, isError } = useGetRecipesByCategoryQuery(
        {
            categoryId: currentSubCategory?._id || '',
            limit: 8,
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
            showError('Ошибка сервера', 'Попробуйте попозже');
            navigate(-1);
        }
    }, [isError, showError, navigate]);

    if (isError || isLoading || !currentCategory) return null;

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
                {currentCategory.subCategories.map((category, i) => (
                    <Tab
                        data-test-id={`tab-${category._id}-${i}`}
                        whiteSpace='nowrap'
                        key={category._id}
                    >
                        {category.title}
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {currentCategory.subCategories.map((category) => (
                    <TabPanel key={category._id}>
                        {category.category === subCategory && (
                            <UiCardGrid data={currentData?.data} />
                        )}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
