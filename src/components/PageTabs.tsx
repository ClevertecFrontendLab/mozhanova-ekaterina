import { Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { data_vegan } from '~/constants';

import { UiCard } from './ui/UiCard';

type Props = {
    tabs: string[];
};

export function PageTabs({ tabs }: Props) {
    return (
        <Tabs variant='line' align='center'>
            <TabList w='fit-content'>
                {tabs.map((tab, i) => (
                    <Tab key={i}>{tab}</Tab>
                ))}
            </TabList>

            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <Grid
                        templateColumns='repeat(2, 1fr)'
                        templateRows='repeat(4, 1fr)'
                        rowGap='16px'
                        columnGap='24px'
                        pt='24px'
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
                            />
                        ))}
                    </Grid>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
