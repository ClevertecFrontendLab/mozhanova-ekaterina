export const getBgByName = (name: string) =>
    name ? `hsl(${(name.charCodeAt(0) * 137) % 360}, 70%, 60%)` : 'black';
