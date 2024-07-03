import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { deleteDuty } from "../../api/nurse";

const EditServiceModal = ({ isOpen, onClose, service, onUpdate,datafetch }) => {
  const [dutyTypes, setDutyTypes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (service && service.dutyTypes) {
      setDutyTypes(service.dutyTypes);
    } else {
      setDutyTypes([]);
    }
  }, [service]);

  const handlePriceChange = (id, newPrice) => {
    setDutyTypes((prevTypes) =>
      prevTypes.map((duty) =>
        duty.id === id ? { ...duty, servicePrice: Number(newPrice) } : duty
      )
    );
  };

  const handleDeleteDuty = (id) => {
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
        console.log(id);
        try {
          const response = await deleteDuty(id);
          datafetch(true);
          setDutyTypes((prevTypes) => prevTypes.filter((duty) => duty.id !== id));
          Swal.fire("Deleted!", "The duty has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "There was a problem deleting the duty.", "error");
          console.error(error);
        }
      }
    });
  };
  

  const handleAddDuty = (dutyType) => {
    if (!dutyTypes.some((duty) => duty.dutyType === dutyType)) {
      setDutyTypes((prevTypes) => [
        ...prevTypes,
        { dutyType, servicePrice: 0 },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dutyTypes.length === 0) {
      setError("Please add at least one duty type");
      return;
    }
    onUpdate({ ...service, dutyTypes });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name
            </label>
            <input
              value={service.serviceName}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              type="text"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             BasePrice 
            </label>
            <input
              value={service.id}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              type="text"
              readOnly
            />
          </div>


          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Duty Types
            </label>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            {dutyTypes.map((duty) => (
              <div
                key={duty.id || duty.dutyType}
                className="flex items-center space-x-2"
              >
                <span className="text-sm text-gray-700 w-24">
                  {duty.dutyType.replace("_", " ")}
                </span>
                <input
                  type="number"
                  value={duty.servicePrice}
                  onChange={(e) => handlePriceChange(duty.id, e.target.value)}
                  className="flex-grow p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter price"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteDuty(duty.id)}
                  className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Duty Type
            </label>
            <div className="flex space-x-2">
              <select
                onChange={(e) => handleAddDuty(e.target.value)}
                className="flex-grow p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              >
                <option value="">Select duty type</option>
                {["FULL_DAY", "HALF_DAY", "NIGHT"].map((duty) => (
                  <option
                    key={duty}
                    value={duty}
                    disabled={dutyTypes.some((d) => d.dutyType === duty)}
                  >
                    {duty.replace("_", " ")}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() =>
                  handleAddDuty(document.querySelector("select").value)
                }
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              Update Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;
