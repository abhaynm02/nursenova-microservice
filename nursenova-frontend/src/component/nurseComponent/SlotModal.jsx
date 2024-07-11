import React, { useEffect, useState, useCallback } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay, parse, isAfter, isBefore } from 'date-fns';
import { useSelector } from "react-redux";
import { createSlotForBooking, deleteSlotById, findCreateSlots } from "../../api/nurse";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SlotModal = ({ isVisible, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const nurseId = useSelector((state) => state.auth.email);

  const fetchSlots = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await findCreateSlots(nurseId);
      console.log(response.data)
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.error("Failed to load slots. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [nurseId]);

  useEffect(() => {
    if (isVisible) {
      fetchSlots();
    }
  }, [isVisible, fetchSlots]);

  const handleDeleteSlot = async (slot) => {
    if (!slot.available) {
      toast.warning("Booked slots cannot be deleted.");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteSlotById(slot.id);
        await fetchSlots();
        toast.success("Slot deleted successfully.");
      } catch (error) {
        console.error("Error deleting slot:", error);
        toast.error("Failed to delete slot. Please try again.");
      }
    }
  };

  const validateDates = () => {
    if (!startDate || !endDate) {
      setError('Both start and end dates are required');
      return false;
    }

    const start = parse(startDate, 'yyyy-MM-dd', new Date());
    const end = parse(endDate, 'yyyy-MM-dd', new Date());
    const today = new Date();

    if (isBefore(start, today)) {
      setError('Start date must be today or later');
      return false;
    }

    if (isAfter(end, monthEnd)) {
      setError('End date must be within the current month');
      return false;
    }

    if (isAfter(start, end)) {
      setError('Start date must be before or equal to end date');
      return false;
    }

    setError('');
    return true;
  };

  const handleSetSlot = async () => {
    if (validateDates()) {
      try {
        await createSlotForBooking(nurseId, startDate, endDate);
        await fetchSlots();
        toast.success("Slots added successfully");
        setStartDate('');
        setEndDate('');
      } catch (error) {
        console.error("Error creating slots:", error);
        toast.error("Failed to create slots. Please try again.");
      }
    }
  };

  const getSlotForDate = (date) => {
    return slots.find(slot => isSameDay(new Date(slot.date), date));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl m-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="date"
            className="border rounded p-2 flex-grow"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={format(new Date(), 'yyyy-MM-dd')}
            max={format(monthEnd, 'yyyy-MM-dd')}
          />
          <input
            type="date"
            className="border rounded p-2 flex-grow"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || format(new Date(), 'yyyy-MM-dd')}
            max={format(monthEnd, 'yyyy-MM-dd')}
          />
          <button
            onClick={handleSetSlot}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Set Slot
          </button>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {isLoading ? (
          <div className="text-center py-4">Loading slots...</div>
        ) : (
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center bg-gray-200 font-bold">{day}</div>
            ))}
            {monthDays.map(day => {
              const slot = getSlotForDate(day);
              return (
                <div
                  key={day.toISOString()}
                  className={`
                    p-2 border text-center cursor-pointer transition duration-300
                    ${!isSameMonth(day, currentDate) ? 'text-gray-400' : ''}
                    ${isToday(day) ? 'bg-blue-100' : ''}
                    ${slot ? (slot.available ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200') : 'hover:bg-gray-100'}
                  `}
                  onClick={() => slot && handleDeleteSlot(slot)}
                >
                  {format(day, 'd')}
                  {slot && (
                    <div className={`text-xs mt-1 font-semibold ${slot.available ? 'text-green-600' : 'text-red-600'}`}>
                      {slot.available ? 'Available' : 'Booked'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotModal;