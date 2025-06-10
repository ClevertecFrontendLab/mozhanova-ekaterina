export const getColorBrightness = (name: string) => {
    const hue = (name.charCodeAt(0) * 137) % 360;
    return hue < 180 ? 'black' : 'white';
};
