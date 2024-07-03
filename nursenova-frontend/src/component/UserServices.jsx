import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { availableLocation, showServices } from '../api/user';
import AvailableLocations from './AvailableLocations';

const UserServices = () => {
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const[serviceId,setSerivceId]=useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await showServices();
        console.log('Services:', response.data);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services');
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const showLocations = async (serviceId) => {
    setIsLoading(true);
    try {
      const response = await availableLocation();
      console.log('Available locations:', response.data);
      console.log(serviceId)
      setLocations(response.data);
      setSerivceId(serviceId);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setError('Failed to load locations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    console.log('Selected location:', location);
    navigate(`/nurses/service/${location}/${serviceId}`);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center font-bold text-4xl mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.serviceName}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-green-600 font-bold mb-4">Base Price: ${service.basePrice}</p>
            <button onClick={()=>showLocations(service.id)} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
              View Locations
            </button>
          </div>
        ))}
      </div>
      <AvailableLocations 
        isOpen={isOpen} 
        locations={locations}
        selectLocation={handleLocationSelect}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UserServices;