import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchNurseDetailsByService } from '../api/user';
import LoadingSpinner from './LoadingSpinner';

const UserViewNurse = () => {
    const [showBookingOptions, setShowBookingOptions] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState('');
    const [nurseData, setNurseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { userName, serviceId } = useParams();

    useEffect(() => {
        const fetchData = async (userName, serviceId) => {
            try {
                setLoading(true);
                const response = await fetchNurseDetailsByService(userName, serviceId);
                setNurseData(response.data);
            } catch (error) {
                console.error("Error fetching nurse data:", error);
                setError("Failed to load nurse data. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchData(userName, serviceId);
    }, [userName, serviceId]);

    const handleDurationSelect = (duration) => {
        setSelectedDuration(duration);
    };

    if (loading) return <LoadingSpinner></LoadingSpinner>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!nurseData) return <div className="text-center py-10">No nurse data available.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div className="md:flex md:space-x-6">
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
                        <div className="mt-2">
                            {nurseData.serviceResponse.dutyTypes.map((duty) => (
                                <p key={duty.id} className="text-gray-700">
                                    {duty.dutyType}: ₹{duty.servicePrice}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Book This Nurse</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="mb-3">Select booking duration:</p>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {['One Day', 'One Week', 'One Month'].map((duration) => (
                            <button
                                key={duration}
                                onClick={() => handleDurationSelect(duration)}
                                className={`px-4 py-2 rounded-lg transition duration-300 ${
                                    selectedDuration === duration
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-800 hover:bg-gray-200'
                                }`}
                            >
                                {duration}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            if (selectedDuration) {
                                console.log(`Booking for ${selectedDuration}`);
                                // Add your booking logic here
                            } else {
                                alert("Please select a duration before booking.");
                            }
                        }}
                        className={`w-full py-3 px-4 rounded-lg transition duration-300 ${
                            selectedDuration
                                ? 'bg-green-500 hover:bg-green-600 text-white font-bold'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!selectedDuration}
                    >
                        {selectedDuration ? `Book for ${selectedDuration}` : 'Select a duration to book'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserViewNurse