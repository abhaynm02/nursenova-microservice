import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getNurseMonthlyStats } from '../../api/nurse';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NurseBookingChart = ({ nurseId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    console.log('Component mounted, fetching data...');
    fetchData();
  }, [nurseId]);

  const fetchData = async () => {
    try {
      const response = await getNurseMonthlyStats(nurseId);
      console.log('API Response:', response.data);
      
      processData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processData = (data) => {
    const labels = data.map(item => `${item.year}-${item.month.toString().padStart(2, '0')}`);
    const bookingCounts = data.map(item => item.bookingCount);
    
    console.log('Labels:', labels);
    console.log('Booking Counts:', bookingCounts);

    setChartData(prevData => ({
      ...prevData,
      labels,
      datasets: [
        {
          label: 'Number of Bookings',
          data: bookingCounts,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    }));
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Bookings',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Bookings',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  console.log('Rendering chart with data:', chartData);

  return (
    <div className="w-full h-full">
      {chartData.labels.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default NurseBookingChart;