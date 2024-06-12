import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { showServices } from '../api/user';



const UserServices = () => {
    const [services, setServices] = useState([]);

    useEffect(()=>{
        const featchServices =async()=>{
            try {
                const response = await showServices();
                console.log(response)
                setServices(response.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        featchServices();
    },[]);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-center font-bold text-4xl mb-8">Our Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.serviceName}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <p className="text-green-600 font-bold mb-4">Base Price: ${service.basePrice}</p>
                        <Link to={`/services/${service.id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
                            View
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserServices;
