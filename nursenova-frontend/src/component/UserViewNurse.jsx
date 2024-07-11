import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNurseDetailsByService, findAvailableSlotForBooking } from "../api/user";
import LoadingSpinner from "./LoadingSpinner";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay, parse, isAfter, isBefore } from 'date-fns';
import { toast } from "react-toastify";

const UserViewNurse = () => {
  const [nurseData, setNurseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const[slots,setSlots]=useState();
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectDuty, setSelectDuty] = useState(null);


  const { userName, serviceId } = useParams();
  const navigate=useNavigate();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  useEffect(() => {
    const fetchNurseDetails = async (userName, serviceId) => {
      try {
        const response = await fetchNurseDetailsByService(userName, serviceId);
        setNurseData(response.data);
      } catch (error) {
        console.error("Error fetching nurse details:", error);
        setError("Failed to load nurse details. Please try again.");
      }
    };
  
    const fetchAvailableSlots = async (userName) => {
      try {
        const slotResponse = await findAvailableSlotForBooking(userName);
        console.log(slotResponse.data);
        setSlots(slotResponse.data)
      } catch (error) {
        console.error("Error fetching available slots:", error);
        setError("Failed to load available slots. Please try again.");
      }
    };
  
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchNurseDetails(userName, serviceId),
          fetchAvailableSlots(userName),
        ]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [userName, serviceId]);
  

  const handleDutySelect = (duty) => {
    setSelectDuty(duty);
    console.log(selectDuty.id);
    console.log(duty);
  };

  const getSlotForDate = (date) => {
    return slots.find(slot => isSameDay(new Date(slot.date), date));
  };

  const handleSlotSelect = (slot) => {
    if (slot.available) {
      if (selectedSlots.find(s => s.id === slot.id)) {
        setSelectedSlots(selectedSlots.filter(s => s.id !== slot.id));
      } else {
        setSelectedSlots([...selectedSlots, slot]);
      }
    }
  };

  const removeSelectedSlot = (slotId) => {
    setSelectedSlots(selectedSlots.filter(s => s.id !== slotId));
  };
  const handleBooking =()=>{
     if(selectDuty!=null){
      navigate('/booking',{ state: {nurseId:nurseData.userName,slots:selectedSlots,selectService:selectDuty.id}});

    }else{
       toast.error("please select a duty type ")

     }
  

  }


  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!nurseData)
    return <div className="text-center py-10">No nurse data available.</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg">
    <div className="md:flex md:space-x-6">
      {/* Left column */}
      <div className="md:w-1/3">
        <img
          className="w-full h-64 object-cover object-top rounded-lg shadow-md"
          src={nurseData.profileImageLink}
          alt={`${nurseData.firstName} ${nurseData.lastName}`}
        />
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Contact Info</h3>
          <p><span className="font-medium">Email:</span> {nurseData.userName}</p>
          <p><span className="font-medium">Phone:</span> {nurseData.phone}</p>
          <p><span className="font-medium">Address:</span> {nurseData.address}</p>
        </div>
      </div>

      {/* Right column */}
      <div className="md:w-2/3 mt-6 md:mt-0">
        <h1 className="text-3xl font-bold text-gray-900">{`${nurseData.firstName} ${nurseData.lastName}`}</h1>
        <p className="text-gray-600 mt-2">{nurseData.age} years old • {nurseData.gender}</p>
        
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Experience</h3>
          <p className="text-gray-700">{nurseData.experience}</p>
        </div>
        
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Education</h3>
          <p className="text-gray-700">{nurseData.education}</p>
        </div>
        
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Languages</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {nurseData.languageDtos.map((lang) => (
              <span key={lang.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {lang.language}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold text-lg">Service Details</h3>
          <p className="text-indigo-600 font-medium">{nurseData.serviceResponse.serviceName}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {nurseData.serviceResponse.dutyTypes.map((duty) => (
              <button
                key={duty.id}
                className={`
                  rounded-lg px-3 py-1 text-sm font-medium
                  ${selectDuty && duty.id === selectDuty.id
                    ? "bg-green-500 text-white"
                    : "bg-orange-300 text-orange-800 hover:bg-orange-400"
                  }
                `}
                onClick={() => handleDutySelect(duty)}
              >
                {duty.dutyType}: ₹{duty.servicePrice}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Calendar section */}
    <div className="mt-8 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Book This Nurse</h3>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center bg-gray-200 font-bold">{day}</div>
        ))}
        {monthDays.map(day => {
          const slot = getSlotForDate(day);
          const isSelected = selectedSlots.find(s => s.id === slot?.id);
          return (
            <div
              key={day.toISOString()}
              className={`
                p-2 border text-center cursor-pointer
                ${!isSameMonth(day, currentDate) ? 'text-gray-400' : ''}
                ${isToday(day) ? 'bg-blue-100' : ''}
                ${isSelected ? 'bg-indigo-200 hover:bg-indigo-300' : 
                  slot ? (slot.available ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200') : 'hover:bg-gray-100'}
              `}
              onClick={() => slot && handleSlotSelect(slot)}
            >
              {format(day, 'd')}
              {slot && (
                <div className={`text-xs ${isSelected ? 'text-indigo-600' : slot.available ? 'text-green-600' : 'text-red-600'}`}>
                  {isSelected ? 'Selected' : slot.available ? 'Available' : 'Booked'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>

    {/* Selected slots section */}
    {selectedSlots.length > 0 && (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Selected Slots</h3>
        <div className="flex flex-wrap gap-2">
          {selectedSlots.map(slot => (
            <div key={slot.id} className="bg-indigo-100 rounded-lg p-2 flex items-center">
              <span className="mr-2">{format(new Date(slot.date), 'MMM d, yyyy')}</span>
              <button
                onClick={() => removeSelectedSlot(slot.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Book button */}
    {selectedSlots.length > 0 && (
      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={()=>handleBooking()}
        >
          Book Selected Slots
        </button>
      </div>
    )}
  </div>
  );
};

export default UserViewNurse;
