export const getRecipesWord = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'новых рецептов';
    }

    switch (lastDigit) {
        case 1:
            return 'новый рецепт';
        case 2:
        case 3:
        case 4:
            return 'новых рецепта';
        default:
            return 'новых рецептов';
    }
};

export const getSubscribersText = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${count} подписчиков`;
    }

    switch (lastDigit) {
        case 1:
            return `${count} подписчик`;
        case 2:
        case 3:
        case 4:
            return `${count} подписчика`;
        default:
            return `${count} подписчиков`;
    }
};

export const getLikesText = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${count} лайков`;
    }

    switch (lastDigit) {
        case 1:
            return `${count} лайк`;
        case 2:
        case 3:
        case 4:
            return `${count} лайка`;
        default:
            return `${count} лайков`;
    }
};

export const getBookmarksText = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${count} сохранений`;
    }

    switch (lastDigit) {
        case 1:
            return `${count} сохранение`;
        case 2:
        case 3:
        case 4:
            return `${count} сохранения`;
        default:
            return `${count} сохранений`;
    }
};

export const getRecommendationsText = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${count} рекомендованных рецептов`;
    }

    switch (lastDigit) {
        case 1:
            return `${count} рекомендованный рецепт`;
        case 2:
        case 3:
        case 4:
            return `${count} рекомендованных рецепта`;
        default:
            return `${count} рекомендованных рецептов`;
    }
};
