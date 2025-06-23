import { Box } from '@chakra-ui/react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { StatisticData } from '~/types';

const colorSchemes = {
    green: {
        gradient: (
            <defs>
                <linearGradient
                    id='gradient_green'
                    x1='0.042938'
                    y1='-146.433'
                    x2='0.042938'
                    y2='98.0831'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stop-color='#C4FF61' />
                    <stop offset='1' stop-color='#C4FF61' stop-opacity='0.01' />
                </linearGradient>
            </defs>
        ),
        stroke: '#2db100',
        id: 'gradient_green',
    },
    purple: {
        gradient: (
            <defs>
                <linearGradient
                    id='gradient_purple'
                    x1='0.548828'
                    y1='0.166016'
                    x2='0.548828'
                    y2='204.166'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stop-color='#8C54FF' />
                    <stop offset='1' stop-color='#8C54FF' stop-opacity='0.01' />
                </linearGradient>
            </defs>
        ),
        stroke: '#8C54FF',
        id: 'gradient_purple',
    },
};

type Props = {
    data: StatisticData[];
    colorScheme?: keyof typeof colorSchemes;
};

export const UiChart = ({ data, colorScheme = 'green' }: Props) => (
    <Box maxW='1090px' h='304px' overflow='hidden'>
        <AreaChart
            width={1090}
            height={304}
            data={data}
            margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            {colorSchemes[colorScheme].gradient}
            <CartesianGrid strokeDasharray='4 4' />
            <XAxis
                axisLine={{ stroke: '#ffffd3' }}
                tick={{ fill: '#000', fontSize: 14 }}
                dataKey='date'
                fontSize='14px'
                tickMargin={8}
            />
            <YAxis
                axisLine={{ stroke: '#ffffd3' }}
                tick={{ fill: '#000', fontSize: 14 }}
                fontSize='14px'
                tickMargin={16}
            />
            <Area
                fill={`url(#${colorSchemes[colorScheme].id})`}
                type='monotone'
                dataKey='count'
                stroke={colorSchemes[colorScheme].stroke}
                strokeWidth='2px'
            />
        </AreaChart>
    </Box>
);
