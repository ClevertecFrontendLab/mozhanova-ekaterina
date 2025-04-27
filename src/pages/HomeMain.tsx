import { BlogsSection } from '~/components/shared/blogs/BlogsSection';
import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { Slider } from '~/components/shared/slider/Slider';
import { TheJuiciestSection } from '~/components/shared/TheJuiciestSection';

export function HomeMain() {
    return (
        <>
            <Slider />
            <TheJuiciestSection />
            <BlogsSection />
            <RelevantKitchenBlock
                heading='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
        </>
    );
}
