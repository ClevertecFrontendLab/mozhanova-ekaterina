import { Text } from '@chakra-ui/react';
import { JSX } from 'react';

export const highlightMatches = (str: string, substr: string) => {
    const result: JSX.Element[] = [];
    const lowerStr = str.toLowerCase();
    const lowerSub = substr.toLowerCase();
    let lastIndex = 0;
    let index = lowerStr.indexOf(lowerSub);
    while (index !== -1) {
        if (index > lastIndex) {
            result.push(
                <Text as='span' key={`text-${lastIndex}`}>
                    {str.slice(lastIndex, index)}
                </Text>,
            );
        }

        result.push(
            <Text as='span' key={`match-${index}`} color='text.primary'>
                {str.slice(index, index + substr.length)}
            </Text>,
        );

        lastIndex = index + substr.length;
        index = lowerStr.indexOf(lowerSub, lastIndex);
    }

    if (lastIndex < str.length) {
        result.push(
            <Text as='span' key={`text-${lastIndex}`}>
                {str.slice(lastIndex)}
            </Text>,
        );
    }

    return <>{result}</>;
};
