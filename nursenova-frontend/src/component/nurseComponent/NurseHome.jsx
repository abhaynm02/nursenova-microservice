import React, { useState, useEffect, useRef } from "react";
import NurseBookingChart from "./NurseBookingChart";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { getDashboardData } from "../../api/nurse";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
import WebSocketService from "../../service/WebSocketService";
import { toast } from "react-toastify";

const NurseHome = () => {
  const nurseId = useSelector((state) => state.auth.email);
  const [dashboardData, setDashboardData] = useState(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardData(nurseId);
        setDashboardData(response.data);
        WebSocketService.connect(nurseId);
        WebSocketService.addMessageHandler(handleMessage);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
    return () => {
      WebSocketService.removeMessageHandler(handleMessage);
      WebSocketService.disconnect();
    };
  }, [nurseId]);

  const handleMessage = (message) => {
  toast.success(`You have a new message from ${message.senderId}`, {
      duration: 4000,
      icon: '💬',
    });
    console.log(message);
};


  useEffect(() => {
    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
    };
  }, []);

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const bookingStatusData = {
    labels: ["Completed", "Ongoing", "Upcoming","cancelld"],
    datasets: [
      {
        data: [
          dashboardData.completedBookings,
          dashboardData.ongoingBookings,
          dashboardData.upcomingBookings,
          dashboardData.cancelBookings,
        ],
        backgroundColor: ["#10B981", "#F59E0B", "#3B82F6","#6366F1"],
      },
    ],
  };

  const earningsByMonthData = {
    labels: dashboardData.earningsByMonth.map((item) => item.month),
    datasets: [
      {
        label: "Earnings",
        data: dashboardData.earningsByMonth.map((item) => item.earnings),
        backgroundColor: "#6366F1",
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Nurse Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-800">{dashboardData.totalBookings}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Total Earnings</p>
                <p className="text-2xl font-bold text-green-800">${dashboardData.totalEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Booking Status</h2>
            <div className="h-64">
              <Pie
                data={bookingStatusData}
                ref={pieChartRef}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Earnings by Month</h2>
            <div className="h-64">
              <Bar
                data={earningsByMonthData}
                ref={barChartRef}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Booking Chart</h2>
            <div className="h-96">
              <NurseBookingChart nurseId={nurseId} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Bookings by Service</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.bookingsByService.map((item) => (
                <li key={item.serviceName} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-600">{item.serviceName}</span>
                  <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm font-medium">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseHome;