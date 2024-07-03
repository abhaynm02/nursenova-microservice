import React, { useState, useMemo } from 'react';
import { MapPin, X, Search } from 'lucide-react';

const AvailableLocations = ({ isOpen, locations = [], selectLocation, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = useMemo(() => {
    return locations.filter(location =>
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [locations, searchTerm]);

  if (!isOpen) return null;

  const handleLocationClick = (location) => {
    selectLocation(location);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Available Locations</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 flex-grow overflow-hidden flex flex-col">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          {filteredLocations.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No locations found</p>
          ) : (
            <ul className="space-y-2 overflow-y-auto flex-grow">
              {filteredLocations.map((location, index) => (
                <li 
                  key={index}
                  className="flex items-center p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-200"
                  onClick={() => handleLocationClick(location)}
                >
                  <MapPin className="text-blue-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-800 truncate">{location}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableLocations;