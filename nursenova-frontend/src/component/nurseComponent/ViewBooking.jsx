import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  cancelBooking,
  updateBookingstatus,
  viewBookingDetails,
} from "../../api/nurse";
import ChatModal from "../Chat";
import { MessageCircle } from "lucide-react";
import WebSocketService from "../../service/WebSocketService";

const ViewBooking = () => {
  const [data, setData] = useState({
    slotDtos: [],
    totalAmount: 0,
    status: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookingId } = useParams();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await viewBookingDetails(bookingId);
        setData(response.data);
        WebSocketService.connect(response.data.nurseId);
        WebSocketService.addMessageHandler(handleMessage);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setError("Failed to load booking details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      WebSocketService.removeMessageHandler(handleMessage);
      WebSocketService.disconnect();
    };
  }, [bookingId]);

  const handleMessage = (message) => {
         console.log(message);
         setUnreadCount(prevCount => prevCount + 1);
  };


  const isCurrentDate = (date) => {
    const today = new Date().toISOString().split("T")[0];
    return date === today;
  };

  const canChangeStatus =
    data.slotDtos && !data.slotDtos.some((slot) => isCurrentDate(slot.date));

  const handleStatusChange = async (bookingId, newStatus) => {
    if (canChangeStatus) {
      try {
        const response = await updateBookingstatus(bookingId, newStatus);
        console.log(response);
        // await updateBookingStatus(bookingId, newStatus);
        setData((prevData) => ({ ...prevData, status: newStatus }));
      } catch (error) {
        console.error("Error updating booking status:", error);
        setError("Failed to update booking status. Please try again.");
      }
    }
  };
  const handleNewMessage = () => {
    if (!isOpen) {
      setUnreadCount((prevCount) => {
        const newCount = prevCount + 1;
        console.log("New unread count:", newCount); // Add this line
        return newCount;
      });
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const CancelBooking = async (bookingId) => {
    if (canChangeStatus) {
      try {
        const response = await cancelBooking(bookingId);
      } catch (error) {}
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            {data.serviceName}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                Patient Information
              </h2>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {data.patientFullName}
              </p>
              <p>
                <span className="font-medium">Age:</span> {data.age}
              </p>
              <p>
                <span className="font-medium">Gender:</span> {data.gender}
              </p>
              <p>
                <span className="font-medium">Address:</span> {data.address}
              </p>
              <p>
                <span className="font-medium">PIN:</span> {data.pin}
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                Booking Details
              </h2>
              <p>
                <span className="font-medium">Booking ID:</span>{" "}
                {data.bookingId}
              </p>
              <p>
                <span className="font-medium">Duty Type:</span> {data.dutyType}
              </p>
              <p>
                <span className="font-medium">Total Days:</span>{" "}
                {data.totalDays}
              </p>
              <p>
                <span className="font-medium">Total Amount:</span> ₹
                {data.totalAmount?.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                    data.status === "REQUESTED"
                      ? "bg-yellow-200 text-yellow-800"
                      : data.status === "CONFIRMED"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {data.status}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
              Medical Details
            </h2>
            <p>{data.medicalDetails}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
              Scheduled Dates
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
              {data.slotDtos &&
                data.slotDtos
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((slot) => (
                    <div
                      key={slot.id}
                      className="bg-blue-100 rounded-lg p-2 text-center"
                    >
                      <p className="font-medium text-sm sm:text-base">
                        {new Date(slot.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {isCurrentDate(slot.date) ? "Today" : ""}
                      </p>
                    </div>
                  ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            {data.status === "REQUESTED" && (
              <button
                onClick={() => handleStatusChange(data.bookingId, "CONFIRMED")}
                disabled={!canChangeStatus}
                className={`px-4 py-2 rounded-lg text-white font-medium ${
                  canChangeStatus
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                } transition-colors duration-300`}
              >
                Accept
              </button>
            )}
            {data.status === "REQUESTED" && (
              <button
                onClick={() => handleStatusChange(data.bookingId, "CANCELLED")}
                disabled={!canChangeStatus}
                className={`px-4 py-2 rounded-lg text-white font-medium ${
                  canChangeStatus
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                } transition-colors duration-300`}
              >
                Cancel
              </button>
            )}
            {data.status === "CONFIRMED" && (
              <button
                onClick={() => CancelBooking(data.bookingId)}
                className={`px-4 py-2 rounded-lg text-white font-medium ${
                  canChangeStatus
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                } transition-colors duration-300`}
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleOpenChat}
              className="relative flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
            >
              <MessageCircle size={20} />
              <span>Open Chat</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            </button>
          </div>
          {console.log("in view booking ", data.nurseId, data.userId)}

          <ChatModal
            senderId={data.nurseId}
            recipientId={data.userId}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          ></ChatModal>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;
