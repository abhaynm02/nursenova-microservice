import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  findByUserName } from '../api/admin';
import Modal from './Modal';

const AdminViewStaff = () => {
    const { username } = useParams();
    const [nurseData, setNurseData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const[showModal,setShowModal]=useState(false);
    const[imageLink,setImageLink]=useState('');


    const handleClose =()=>{
        setShowModal(!showModal);
      }

      useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const response = await findByUserName(username);
            console.log(response);
            setNurseData(response.data);
          } catch (error) {
            console.log(error);
            setError(error.message);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
      }, [username]);

      if (isLoading) {
        return <div className="text-center text-xl py-8">Loading...</div>;
      }
    
      if (error) {
        return <div className="text-center text-red-500 py-8">Error: {error}</div>;
      }
    
      if (!nurseData) {
        return <div className="text-center text-gray-500 py-8">No data available</div>;
      }
    

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <div className="flex flex-col md:flex-row items-center mb-6">
      <div className="w-32 h-32 rounded-full overflow-hidden mr-6">
        <img
          src={nurseData.profileImageLink}
          alt="Profile"
          className="w-full h-full object-cover"
          onClick={()=>{handleClose()
            setImageLink(nurseData.profileImageLink)}
          }
        />
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-2">
          {nurseData.firstName} {nurseData.lastName}
        </h2>
        <p className="text-gray-600">Age: {nurseData.age}</p>
        <p className="text-gray-600">Gender: {nurseData.gender}</p>
        <p className="text-gray-600">Phone: {nurseData.phone}</p>
        <p className="text-gray-600">Address: {nurseData.address}</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h3 className="text-lg font-bold mb-2">Experience</h3>
        <p>{nurseData.experience}</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h3 className="text-lg font-bold mb-2">Education</h3>
        <p>{nurseData.education}</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h3 className="text-lg font-bold mb-2">Languages</h3>
        <ul className="list-disc pl-4">
          {nurseData.languages.map((language, index) => (
            <li key={`${language.language}-${index}`}>{language.language}</li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2">Verification</h3>
          <p>Verified: {nurseData.verified ? 'Yes' : 'No'}</p>
        </div>
        {nurseData.certificateImageLink && (
          <img 
          onClick={()=>{handleClose()
            setImageLink(nurseData.certificateImageLink)}
          }
            src={nurseData.certificateImageLink}
            alt="Certificate"
            className="mt-4 w-full h-auto rounded-md"
          />
        )}
      </div>
    </div>
    {/* <div className="flex justify-end">
      <button
        className='px-4 py-2 mr-3 rounded-md font-bold transition duration-300 
           bg-red-500 text-white '
        onClick={()=>handleVerify(nurseData.id,false)}
      >
       Reject 
      </button>
      <button
        className='px-4 py-2 rounded-md font-bold transition duration-300 
           bg-green-500 text-white '
           onClick={()=>handleVerify(nurseData.id,true)}
      >
       Approve
      </button>
    </div> */}
    <Modal isVisible={showModal} onClose={()=>handleClose()}>
   

      <div className="w-full h-auto max-h-screen overflow-auto">
        <img src={imageLink} alt="" className="w-full h-auto" />
    
    </div>
    </Modal>
  </div>
  )
}

export default AdminViewStaff
