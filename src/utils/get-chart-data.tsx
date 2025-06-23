import { addWeeks, format } from 'date-fns';

import { StatisticData } from '~/types';

export const getChartData = (data: StatisticData[]): StatisticData[] => {
    const formatDate = (date: string) => format(new Date(date), 'MMM dd');
    const result: StatisticData[] = [];
    let startDate = new Date(data[0].date);
    let count = data[0].count;
    let weekendDate = addWeeks(startDate, 1);

    if (data.length === 1)
        return [
            {
                date: formatDate(startDate.toDateString()),
                count,
            },
        ];

    for (let index = 1; index < data.length; index++) {
        const item = data[index];
        const currentDate = new Date(item.date);

        if (currentDate < weekendDate) {
            count += item.count;
        } else {
            result.push({
                date: formatDate(startDate.toDateString()),
                count,
            });
            if (index === data.length - 1) {
                result.push({
                    date: formatDate(item.date),
                    count: item.count,
                });
            } else {
                startDate = weekendDate;
                count = item.count;
                weekendDate = addWeeks(startDate, 1);
            }
        }
    }

    return result;
};
