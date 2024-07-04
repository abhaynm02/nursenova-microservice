import React from 'react';

const NurseCard = ({ nurse,handleSelectNurse }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden m-4 max-w-sm w-full transition-transform duration-300 hover:scale-105 flex flex-col">
      <div 
        className="relative h-64"
      >
          <img
        className="absolute inset-0 w-full h-full object-cover object-top"
        src={`${nurse.profileImageLink}`}
        alt="Nurse Profile picture"
      />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end">
          <h2 className="text-xl font-bold text-white p-4 w-full truncate">
            {`${nurse.firstName} ${nurse.lastName}`}
          </h2>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-600 text-sm">{nurse.gender}</p>
          <p className="text-blue-600 font-semibold text-sm">{nurse.serviceName}</p>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold text-md mb-1">Languages</h3>
          <div className="flex flex-wrap gap-1">
            {nurse.languageDtos.map(lang => (
              <span key={lang.id} className="bg-gray-200 rounded-full px-2 py-1 text-xs">
                {lang.language}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-3 flex-grow">
          <h3 className="font-semibold text-md mb-1">Available Duties</h3>
          <ul className="space-y-1 text-sm">
            {nurse.dutyResponses.map(duty => (
              <li key={duty.id} className="flex justify-between items-center">
                <span>{duty.dutyType}</span>
                <span className="font-semibold">${duty.servicePrice}</span>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={()=>handleSelectNurse(nurse.userName,nurse.serviceId)} className="w-full mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold text-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

export default NurseCard;