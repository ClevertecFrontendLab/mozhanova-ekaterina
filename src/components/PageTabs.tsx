import {
    Flex,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { UiButton } from '~/components/ui/UiButton';
import { UiCard } from '~/components/ui/UiCard';
import { categories } from '~/mocks/categories';
import { data } from '~/mocks/recipes';

export function PageTabs() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const [isLargerThanLG] = useMediaQuery('(min-width: 1441px)');

    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();
    const params = useParams();

    const currentCategory = params.category;
    const currentSubCategory = params.subCategory;
    const subCategories = categories.find(
        (category) => category.id === currentCategory,
    )!.subCategories;

    const handleTabChange = (index: number) => {
        const selectedCategory = subCategories[index];
        navigate(`/${currentCategory}/${selectedCategory.id}`);
    };

    useEffect(() => {
        const activeIndex = subCategories.findIndex(
            (category) => category.id === currentSubCategory,
        );
        setTabIndex(activeIndex || 0);
    }, [currentSubCategory, subCategories]);

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
                {subCategories.map((category) => (
                    <Tab whiteSpace='nowrap' key={category.id}>
                        {category.label}
                    </Tab>
                ))}
            </TabList>

            <TabPanels>
                {subCategories.map((category) => (
                    <TabPanel key={category.id}>
                        <SimpleGrid
                            rowGap={4}
                            columnGap={6}
                            pt={6}
                            columns={{
                                base: 1,
                                sm: 2,
                                md: 1,
                                lg: 2,
                            }}
                        >
                            {data.slice(0, 8).map((recipe) => (
                                <UiCard
                                    key={recipe.id}
                                    data={recipe}
                                    direction='row'
                                    infoPosition='top'
                                    controls
                                    categoryBgColor='secondary.100'
                                    size={isLargerThanMD ? 'lg' : 'sm'}
                                />
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                ))}
            </TabPanels>
            <Flex justifyContent='center' mt='16px' mb='40px'>
                <UiButton size='md' text='Загрузить еще' variant='primary' />
            </Flex>
        </Tabs>
    );
}
