import React, { useState,useEffect } from 'react';
import Modal from './Modal';
import{allServices,addService,findServiceById, editService, blockOrUnblockService } from '../api/admin'
import { toast } from 'react-toastify';
import { ArrowDown, ArrowUp, ArrowUpDown, PlusIcon, Search } from 'lucide-react';
import PageNavigationBar from './PageNavigationBar';
import LoadingSpinner from './LoadingSpinner';



const AdminServices = () => {
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [edit,setEdit]=useState(false);
  const [serviceId,setServiceId]=useState();
  const [dataFeatch,setDataFeatch]=useState(false);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(0);
 const [pageSize, setPageSize] = useState(8);
 const[searchKey,setSearchKey]=useState('');
 const [priceFilter, setPriceFilter] = useState('');
 const [sort, setSort] = useState({ key: '' });
 const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await allServices(currentPage - 1, pageSize,searchKey,sort.key);
        setServices(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching services:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchServices();
   
  },[currentPage, pageSize,dataFeatch,searchKey,sort])
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!serviceName.trim()) {
      formErrors.serviceName = "Service name is required";
      isValid = false;
    }

    if (!basePrice.trim()) {
      formErrors.basePrice = "Base price is required";
      isValid = false;
    } else if (isNaN(parseFloat(basePrice))) {
      formErrors.basePrice = "Base price must be a number";
      isValid = false;
    }

    if (!description.trim()) {
      formErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const formSubmit = async(e)=> {
    e.preventDefault();
    if (validateForm()) {
      const data={
        id:serviceId,
        serviceName:serviceName,
        basePrice:basePrice,
        description:description,
      }
      try {
        if(edit){
          const response = await editService(data);
          toast.success(response);
          setEdit(false);
          setShowModal(false);
          setDataFeatch(!dataFeatch)
          setServiceName('');
          setBasePrice('');
          setDescription('');

        }else{
          const response = await addService(data)
          toast.success(response.data)
          setDataFeatch(!dataFeatch)
          setShowModal(false);
          setServiceName('');
          setBasePrice('');
          setDescription('');

        }
       
        
      } catch (error) {
        console.log(error);
      }

    
    }
  };

  const handleEdit =async(id)=>{
        try {
          const response = await findServiceById(id)
          setServiceName(response.data.serviceName);
          setBasePrice(`${response.data.basePrice}`);
          setDescription(response.data.description);
          setServiceId(response.data.id)
          setEdit(true);
          setShowModal(true);
        } catch (error) {
          console.log(error);
          
        }
  };

  const handleClose =()=>{
    setShowModal(false);
    setEdit(false);
    setServiceName('');
    setBasePrice('');
   setDescription('');

  }
 
  const search = (e)=>{
    setSearchKey(e.target.value)
  }
  const blockService =async(id,status)=>{
       try {
        const data={
           id:id,
           status:!status
        }
        const response =await blockOrUnblockService(data);
        setDataFeatch(!dataFeatch)
        toast.success(status?"service blocked successfully":"service unBlock successfully")
       } catch (error) {
        console.log(error);
       }
  }


  const handleSort = () => {
    setSort(prevSort => ({
      key: prevSort.key === 'asc' ? 'des' : prevSort.key === 'des' ? '' : 'asc'
    }));
  };
  if(loading) return <LoadingSpinner></LoadingSpinner>;
  
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-center font-bold text-3xl md:text-4xl mb-8">Services</h1>
    <div className=" flex gap-2 w-full justify-between mb-4">
  <button
    onClick={() => setShowModal(true)}
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
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  
  </div>
</div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left text-sm font-semibold tracking-wide">Name</th>
            <th className="p-3 text-left text-sm font-semibold tracking-wide">Description</th>
            <th className="p-3 text-left text-sm font-semibold tracking-wide">
            <div className="flex items-center cursor-pointer" onClick={handleSort}>
              Base Price
              <span className="ml-2">
                {sort.key === 'asc' ? <ArrowUp size={16} /> : 
                 sort.key === 'des' ? <ArrowDown size={16} /> : 
                 <ArrowUpDown size={16} />}
              </span>
            </div>
          </th>
            <th className="p-3 text-center text-sm font-semibold tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr
              key={service.id}
              className={`border-b ${service.status ? '' : 'bg-red-100'} hover:bg-gray-100 transition duration-300`}
            >
              <td className="p-3">{service.serviceName}</td>
              <td className="p-3">{service.description}</td>
              <td className="p-3">${service.basePrice}</td>
              <td className="p-3">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(service.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md shadow-md transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => blockService(service.id, service.status)}
                    className={`${
                      service.status
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white px-4 py-1 rounded-md shadow-md transition duration-300`}
                  >
                    {service.status ? 'Block' : 'Unblock'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <PageNavigationBar currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
      <Modal isVisible={showModal} onClose={() => {handleClose()

      }}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
          <form onSubmit={formSubmit} className="space-y-4">
            <div>
              <label htmlFor="serviceName" className="block font-semibold mb-1">
                Service Name:
              </label>
              <input
                id="serviceName"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="text"
              />
              {errors.serviceName && <p className="text-red-500 text-sm mt-1">{errors.serviceName}</p>}
            </div>
            <div>
              <label htmlFor="basePrice" className="block font-semibold mb-1">
                Base Price:
              </label>
              <input
                id="basePrice"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="text"
              />
              {errors.basePrice && <p className="text-red-500 text-sm mt-1">{errors.basePrice}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block font-semibold mb-1">
                Description:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {handleClose()}}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {edit?"Edit service":"Add Service"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AdminServices;