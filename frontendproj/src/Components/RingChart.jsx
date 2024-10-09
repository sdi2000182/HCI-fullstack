import { React, useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { ArcElement } from 'chart.js';
import Chart from 'chart.js/auto';

import {jwtDecode} from 'jwt-decode';
Chart.register(ArcElement);

const RingChart = () => {
    const [chartData, setChartData] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/passed_not/${jwtDecode(localStorage.getItem('token')).sub.User_ID}`);
            const result = response.data;

            const data = {
                labels: ['Περασμένα Μαθήματα', 'Κομμένα Μαθήματα', 'Μαθήματα χωρίς βαθμούς'],
                datasets: [
                    {
                        data: [result.passed_grades_count, result.not_passed_grades_count, result.enrolled_classes_without_grades_count],
                        backgroundColor: ['green', 'red', 'grey'],
                    },
                ],
            };
            setChartData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const options = {
        cutoutPercentage: 70,
        maintainAspectRatio: false,
    };

    const chartContainerStyle = {
        width: '300px',
        height: '300px',
        position: 'relative',
    };

    return (
        <div style={chartContainerStyle}>
            <style>
                {`
                .chart-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    pointer-events: none; /* Disable pointer events */
                }
                `}
            </style>
            <div className="chart-container">
                {chartData.datasets && <Doughnut data={chartData} options={options} />}
            </div>
        </div>
    );
};

export default RingChart;