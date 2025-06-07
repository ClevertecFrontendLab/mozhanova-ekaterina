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
