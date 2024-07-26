import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cancelBooking, viewBookingDetails } from "../api/user";
import ChatModal from "./Chat";
import { MessageCircle } from 'lucide-react';
import WebSocketService from "../service/WebSocketService";

const UserViewBooking = () => {
  const [nurseDto, setNurseDto] = useState({ languages: [] });
  const [viewBooking, setViewBooking] = useState({ slotDtos: [] });
  const [isLoading, setIsLoading] = useState(false);
  const { bookingId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchData = async (bookingId) => {
      setIsLoading(true);
      try {
        const response = await viewBookingDetails(bookingId);
        setNurseDto(response.data.nurseDto);
        setViewBooking(response.data.viewBooking);
        WebSocketService.connect(response.data.viewBooking.userId);
        WebSocketService.addMessageHandler(handleMessage);
        console.log(response.data.viewBooking);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(bookingId);
    return () => {
        WebSocketService.removeMessageHandler(handleMessage);
        WebSocketService.disconnect();
      };
  }, [bookingId, isEdit]);

  const handleMessage = (message) => {
    console.log(message);
    setUnreadCount(prevCount => prevCount + 1);
};


  const isCancellable = () => {
    const startDate = new Date(viewBooking.startDate);
    const currentDate = new Date();
    return startDate > currentDate;
  };

  const handleCancel = async (id) => {
    if (isCancellable()) {
      try {
        const response = await cancelBooking(id);
        if (response) setIsEdit(!isEdit);
      } catch (error) {}
    } else {
      alert("Sorry, you can't cancel on or after the starting date.");
    }
  };

  const handleNewMessage = () => {
    if (!isOpen) {
      setUnreadCount((prevCount) => prevCount + 1);
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Booking Details
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Nurse Details */}
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Nurse Details
          </h2>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={nurseDto.profileImageLink}
              alt={`${nurseDto.firstName} ${nurseDto.lastName}`}
              className="w-24 h-24 rounded-full object-cover object-top border-4 border-blue-200"
            />
            <div>
              <h3 className="text-xl font-semibold">{`${nurseDto.firstName} ${nurseDto.lastName}`}</h3>
              <p className="text-gray-600">{nurseDto.age} years old</p>
            </div>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {nurseDto.userName}
            </p>
            <p>
              <strong>Phone:</strong> {nurseDto.phone}
            </p>
            <p>
              <strong>Address:</strong> {nurseDto.address}
            </p>
            <p>
              <strong>Experience:</strong> {nurseDto.experience}
            </p>
            <p>
              <strong>Education:</strong> {nurseDto.education}
            </p>
            <div>
              <strong>Languages:</strong>
              <ul className="list-disc list-inside">
                {nurseDto.languages.map((lang) => (
                  <li key={lang.id}>{lang.language}</li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={handleOpenChat}
            className="relative flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
          >
            <MessageCircle size={20} />
            <span>Open Chat</span>
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Booking Details */}
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Booking Details
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Booking ID:</strong> {viewBooking.bookingId}
            </p>
            <p>
              <strong>Service:</strong> {viewBooking.serviceName}
            </p>
            <p>
              <strong>Price:</strong> ${viewBooking.servicePrice}
            </p>
            <p>
              <strong>Total Amount:</strong> ${viewBooking.totalAmount}
            </p>
            <p>
              <strong>Duration:</strong> {viewBooking.totalDays} days
            </p>
            <p>
              <strong>Duty Type:</strong> {viewBooking.dutyType}
            </p>
            <p>
              <strong>Patient:</strong> {viewBooking.patientFullName}
            </p>
            <p>
              <strong>Patient Age:</strong> {viewBooking.age}
            </p>
            <p>
              <strong>Patient Gender:</strong> {viewBooking.gender}
            </p>
            <p>
              <strong>Medical Details:</strong> {viewBooking.medicalDetails}
            </p>
            <p>
              <strong>Starting Date:</strong>{" "}
              {new Date(viewBooking.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="font-semibold text-yellow-600">
                {viewBooking.status}
              </span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Booked Dates:</h3>
            <div className="max-h-40 overflow-y-auto">
              <ul className="space-y-1">
                {viewBooking.slotDtos.map((slot) => (
                  <li key={slot.id}>
                    {new Date(slot.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      {viewBooking.status !== "CANCELLED" && (
        <div className="mt-8 text-center">
          <button
            className={`${
              isCancellable()
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-bold py-3 px-6 rounded-full transition duration-300 text-lg`}
            onClick={() => handleCancel(viewBooking.bookingId)}
            disabled={!isCancellable()}
          >
            {isCancellable() ? "Cancel Booking" : "Cannot Cancel"}
          </button>
        </div>
      )}
      <ChatModal
        senderId={viewBooking.userId}
        recipientId={viewBooking.nurseId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      ></ChatModal>
    </div>
  );
};

export default UserViewBooking;
