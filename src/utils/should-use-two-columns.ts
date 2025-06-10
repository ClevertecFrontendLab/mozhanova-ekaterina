export const shouldUseTwoColumns = (arrLength: number, index: number) => {
    if (arrLength % 3 === 0) {
        return false;
    }
    if (arrLength === 4) {
        return true;
    }
    if (arrLength - (arrLength % 3) > index) {
        return false;
    }
    return true;
};
