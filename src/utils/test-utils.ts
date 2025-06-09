import { DATA_TEST_IDS } from '~/constants/test-ids';

export const getBreadcrumbTestId = (path: string, currentBloggerId?: string) => {
    if (path === 'blogs') return DATA_TEST_IDS.BLOGGER_USER_BREADCRUMB_SECTION;
    if (path === currentBloggerId) return DATA_TEST_IDS.BLOGGER_USER_BREADCRUMB_NAME;
    return '';
};

export const getOptionTestId = (option: string, i: number, testSubject: string) => {
    switch (option) {
        case 'Картошка':
            return 'checkbox-картошка';
        case 'Веганская кухня':
            return 'checkbox-веганская кухня';
        default:
            return testSubject === 'allergens' ? `allergen-${i}` : '';
    }
};
