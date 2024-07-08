import React, { useEffect, useState } from "react";
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
  const [slots,setSlots]=useState({});
  const[edit,setEdit]=useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const nurseId = useSelector((state) => state.auth.email);

  

  useEffect(()=>{
   const fethcData =async(userName)=>{
             try {
                 const response = await findCreateSlots(userName);
                 console.log(response)
                 setSlots(response.data);
             } catch (error) {
               console.log(error);
             }
   }
   fethcData(nurseId);
  },[nurseId,edit])

  const handleDeleteSloat =(slot)=>{
    console.log(slot);
    if(slot.available){

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
               
               const response =await deleteSlotById(slot.id)
               console.log(response)
               setEdit(!edit);
                Swal.fire("Deleted!", "The duty has been deleted.", "success");
              } catch (error) {
                Swal.fire("Error!", "There was a problem deleting the duty.", "error");
                console.error(error);
              }
            }
          });
    }else{
        Swal.fire("The slot is already booked; you can't delete it. ");
    }
  }

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  const getSlotForDate = (date) => {
    return slots.find(slot => isSameDay(new Date(slot.date), date));
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

  const handleSetSlot = async() => {
    if (validateDates()) {
        try {
            const response =await createSlotForBooking(nurseId,startDate,endDate);
            if(response){
                setEdit(!edit);
                toast.success("slot added successfully");

            }
        } catch (error) {
            
        }
      console.log(`Setting slot from ${startDate} to ${endDate}`);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="date"
            className="border rounded p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={format(new Date(), 'yyyy-MM-dd')}
            max={format(monthEnd, 'yyyy-MM-dd')}
          />
          <input
            type="date"
            className="border rounded p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || format(new Date(), 'yyyy-MM-dd')}
            max={format(monthEnd, 'yyyy-MM-dd')}
          />
          <button
            onClick={handleSetSlot}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Set Slot
          </button>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
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
                  p-2 border text-center cursor-pointer
                  ${!isSameMonth(day, currentDate) ? 'text-gray-400' : ''}
                  ${isToday(day) ? 'bg-blue-100' : ''}
                  ${slot ? (slot.available ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200') : 'hover:bg-gray-100'}
                `}
              >
                {format(day, 'd')}
                {slot && (
                  <div className={`text-xs ${slot.available ? 'text-green-600' : 'text-red-600'}`} onClick={()=>handleDeleteSloat(slot)}>
                    {slot.available ? 'Available' : 'Booked'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SlotModal;