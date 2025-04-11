import {
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useMediaQuery,
} from '@chakra-ui/react';

import { data_vegan } from '~/constants';

import { UiCard } from './ui/UiCard';

type Props = {
    tabs: string[];
};

export function PageTabs({ tabs }: Props) {
    const [isLargerThanMD] = useMediaQuery('(min-width: 768px)');

    return (
        <Tabs variant='line' align='center'>
            <TabList w='fit-content' maxW='100%' overflowX='scroll' overflowY='hidden'>
                {tabs.map((tab, i) => (
                    <Tab whiteSpace='nowrap' key={i}>
                        {tab}
                    </Tab>
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
            </TabPanels>
        </Tabs>
    );
}
