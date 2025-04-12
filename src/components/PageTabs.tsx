import {
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { categories, data_vegan } from '~/constants';

import { UiCard } from './ui/UiCard';

export function PageTabs() {
    const [isLargerThanMD] = useMediaQuery('(min-width: 769px)');
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const currentPage = location.pathname.split('/').filter((x) => x)[0];
    const currentCategory = location.pathname.split('/').pop();
    const subCategories = categories.find((category) => category.id === currentPage)?.subCategories;
    const defaultIndex = subCategories?.findIndex((category) => category.id === currentCategory);

    const handleTabChange = (index: number) => {
        const selectedCategory = subCategories![index];
        navigate(`/vegan-cuisine/${selectedCategory.id}`);
    };

    useEffect(() => {
        const activeIndex = subCategories?.findIndex((category) => category.id === currentCategory);
        setTabIndex(activeIndex || 0);
    }, [currentCategory, subCategories]);

    return (
        <Tabs
            variant='line'
            align={isLargerThanMD ? 'center' : 'start'}
            defaultIndex={defaultIndex}
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
            >
                {subCategories &&
                    subCategories.map((category) => (
                        <Tab whiteSpace='nowrap' key={category.id}>
                            {category.label}
                        </Tab>
                    ))}
            </TabList>

            <TabPanels>
                {subCategories &&
                    subCategories.map((category) => (
                        <TabPanel key={category.id}>
                            <SimpleGrid
                                rowGap={4}
                                columnGap={6}
                                pt={6}
                                columns={{
                                    base: 1,
                                    sm: 2,
                                }}
                            >
                                {data_vegan.map((recipe) => (
                                    <UiCard
                                        key={recipe.id}
                                        title={recipe.title}
                                        text={recipe.description}
                                        imgSrc={recipe.imageSrc}
                                        category={recipe.category}
                                        likes={recipe.likes}
                                        favorites={recipe.favorites}
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
        </Tabs>
    );
}
