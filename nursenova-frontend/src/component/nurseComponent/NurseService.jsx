import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addService,
  blcokServices,
  fetchServices,
  findServiceById,
  showServices,
} from "../../api/nurse";
import NurseModal from "./NurseModal";
import { useSelector } from "react-redux";
import NurseServiceTable from "./NurseServiceTable";
import PageNavigationBar from "../PageNavigationBar";
import { Search } from "lucide-react";
import EditServiceModal from "./EditServiceModal";
import LoadingSpinner from "../LoadingSpinner";

const NurseService = () => {
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [edit, setEdit] = useState(false);
  const [serviceId, setServiceId] = useState();
  const [dataFeatch, setDataFeatch] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const nurseId = useSelector((state) => state.auth.email);
  const [error, setError] = useState(false);
  const [valide, setValid] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editSerivce, setEditService] = useState({});

  const [selectDuty, setSelectDuty] = useState([]);
  const [dutyPrices, setDutyPrices] = useState({});
  const [selectServices, setSelectServices] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(true);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const search = (e) => {
    setSearchKey(e.target.value);
  };

  const handleChangeDuty = (e) => {
    const { name, checked } = e.target;
    setError(false);

    if (checked) {
      setSelectDuty((prevDuties) => [...prevDuties, name]);
    } else {
      setSelectDuty((prevDuties) => prevDuties.filter((duty) => duty !== name));
      setDutyPrices((prevPrices) => {
        const newPrices = { ...prevPrices };
        delete newPrices[name];
        return newPrices;
      });
    }
  };

  const validatePrice = (name, value) => {
    const price = parseFloat(value);
    const basePriceValue = parseFloat(basePrice);

    if (isNaN(price) || price < basePriceValue) {
      setValid(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Price must be a number and greater than or equal to the base price (${basePrice})`,
      }));
    } else {
      setValid(true);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setDutyPrices((prevPrices) => ({ ...prevPrices, [name]: value }));
    validatePrice(name, value);
  };

  useEffect(() => {
    const fetchService = async (nurse) => {
      try {
        setLoading(true)
        const response = await fetchServices(
          nurse,
          currentPage - 1,
          pageSize,
          searchKey
        );
        console.log(response);
        setSelectServices(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching services:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchService(nurseId);
  }, [dataFeatch, pageSize, currentPage, searchKey]);

  const validateForm = () => {
    if (selectDuty.length == 0) {
      setError(true);
      return false;
    }

    setError(false);
    return true;
  };

  const formSubmit = async (e) => {
    console.log(dutyPrices);

    e.preventDefault();
    if (validateForm() && valide) {
      try {
        const data = {
          nurseId: nurseId,
          serviceName: serviceName,
          serviceId: serviceId,
          dutyType: Object.fromEntries(
            Object.entries(dutyPrices).map(([key, value]) => [
              key,
              parseInt(value),
            ])
          ),
        };

        const response = await addService(data);
        if (response) {
          toast.success("service added succefully ");
          setDataFeatch(!dataFeatch);
          setSelectModal(false);
          setServiceName("");
          setBasePrice("");
          setDescription("");
          setDutyPrices({});
          setSelectDuty([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const blockService = async (id, status) => {
    try {
      const response = await blcokServices(id, !status);

      setDataFeatch(!dataFeatch);
      toast.success(
        status ? "service blocked successfully" : "service unBlock successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const showServicesForSelecting = async () => {
    try {
      const response = await showServices();
      console.log(response);
      setServices(response.data);

      setShowModal(true);
    } catch (error) {}
  };
  const selectModalClose = () => {
    setSelectModal(!selectModal);
    setDutyPrices({});
    setSelectDuty([]);
  };
  const editModalClose = () => {
    setEditModal(false);
  };
  const editModalOpen = (service) => {
    console.log(service);
    setEditService(service);
    setEditModal(true);
  };
  const editService = async (serviceId) => {
    try {
      console.log(serviceId);
      const response = await findServiceById(serviceId);
      console.log(response);
      editModalOpen(response.data);
      console.log(editSerivce.dutyTypes[0].dutyType);
    } catch (error) {}
  };
  const handleServiceUpdate = (updateService) => {
    console.log(updateService);
    editModalClose();
  };

  const selectService = (service) => {
    console.log(service);
    setServiceName(service.serviceName);
    setServiceId(service.id);
    setBasePrice(service.basePrice);
    setDescription(service.description);
    selectModalClose(!selectModal);
    handleClose();
  };

  if(loading)return <LoadingSpinner></LoadingSpinner>;
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center font-bold text-3xl md:text-4xl mb-8">
        Services
      </h1>
      <div className=" flex gap-2 w-full justify-between mb-4">
        <button
          onClick={() => showServicesForSelecting()}
          className="bg-green-400 hover:bg-green-500 text-white font-semibold py-1 px-4 rounded-md shadow-md transition duration-300"
        >
          Add Service
        </button>
        <div className="flex gap-2">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              className="uppercase w-full border bg-gray-100 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              placeholder="Search..."
              value={searchKey}
              onChange={search}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
      </div>
      <NurseServiceTable
        services={selectServices}
        blockService={blockService}
        handleEdit={editService}
      />
      <PageNavigationBar
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <EditServiceModal
        isOpen={editModal}
        onClose={editModalClose}
        service={editSerivce}
        onUpdate={handleServiceUpdate}
        datafetch={setDataFeatch}
      ></EditServiceModal>

      {/* modal for showing available services  */}

      <NurseModal
        isVisible={showModal}
        onClose={() => {
          handleClose();
        }}
      >
        <div className="bg-white  rounded-lg shadow-xl overflow-hidden">
          <h2 className="text-2xl font-bold text-center py-4 bg-blue-600 text-white">
            Available Services
          </h2>
          <div className="p-4 max-h-[50vh] overflow-y-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {service.serviceName}
                    </h3>
                    <p className="text-gray-600">${service.basePrice}</p>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => {
                      selectService(service);
                    }}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </NurseModal>

      <NurseModal
        isVisible={selectModal}
        onClose={() => {
          selectModalClose();
        }}
      >
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">
            {"Add New Service"}
          </h2>
          <form onSubmit={formSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Service Name
              </label>
              <input
                id="serviceName"
                value={serviceName}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                type="text"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="basePrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Base Price
              </label>
              <input
                id="basePrice"
                value={basePrice}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                type="text"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Duty Types
              </label>
              {error && (
                <p className="text-xs text-red-500 mt-1">
                  Please select a duty type{" "}
                </p>
              )}
              {["FULL_DAY", "HALF_DAY", "NIGHT"].map((duty) => (
                <div key={duty} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={duty}
                    checked={selectDuty.includes(duty)}
                    onChange={handleChangeDuty}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor={duty} className="text-sm text-gray-700">
                    {duty.replace("_", " ")}
                  </label>
                  {selectDuty.includes(duty) && (
                    <div className="flex-grow">
                      <input
                        type="number"
                        name={duty}
                        placeholder="Enter price"
                        value={dutyPrices[duty] || ""}
                        onChange={handlePriceChange}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      />
                      {errors[duty] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[duty]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                readOnly
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={selectModalClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              >
                {"Add Service"}
              </button>
            </div>
          </form>
        </div>
      </NurseModal>
    </div>
  );
};

export default NurseService;
