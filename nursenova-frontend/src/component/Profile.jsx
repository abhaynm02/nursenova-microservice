import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../api/user';


const Profile = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const[lastname,setLastname]=useState('');
  const [isEdit, setIsEdit] = useState(false);
  const[errors,setErrors]=useState({});
 
  

  const username = useSelector((state) => state.auth.email);
  useEffect(() => {
    const fetchData = async (username) => {
      try {
        const response = await getProfile(username);
        console.log(response);
        setName(response.data.firstname);
        setLastname(response.data.lastname);
        setPhone(response.data.phone);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (username) {
      setUserName(username);
      fetchData(username);
    }
  }, [username,isEdit]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    const data={
      firstname:name,
      lastname:lastname,
      username:userName,
      phone:phone,
    }
    if(validate()){
      try {
        const response=await updateProfile(data)
        setIsEdit(false);
        
      } catch (error) {

        
      }

      setIsEdit(false);

    }
  }

  const handleEdit = () => {
    setIsEdit(true);
  }

  const handleCancel = () => {
    setIsEdit(false);
  
  }
  const validate=()=>{

    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Firstname is required';
    if (!lastname.trim()) newErrors.lastname = 'lastname is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) newErrors.phone = 'Phone number is invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length==0;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-300 rounded-xl shadow-md overflow-hidden md:max-w-2xl px-4 md:px-0 ">
      <div className="p-8 ">
        <h2 className="uppercase tracking-wide text-lg text-indigo-500 font-semibold mb-4">Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="name" className='text-slate-500 font-bold block mb-1'>FirstName:</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
              className='w-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-400 rounded p-2'
              readOnly={!isEdit}
            />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="lastname" className='text-slate-500 font-bold block mb-1'>LastName:</label>
            <input 
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder='lastname'
              className='w-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-400 rounded p-2'
              readOnly={!isEdit}
            />
              {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="userName" className='text-slate-500 font-bold block mb-1'>Username:</label>
            <input 
              type="text"
              value={userName}
              className='w-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-400 rounded p-2'
              readOnly
            />
          </div>
          <div className="mt-4">
            <label htmlFor="phone" className='text-slate-500 font-bold block mb-1'>Phone:</label>
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Phone'
              className='w-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-400 rounded p-2'
              readOnly={!isEdit}
            />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="flex justify-end mt-6">
            {isEdit ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 mr-3 rounded-md font-bold transition duration-300 bg-red-500 text-white hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-bold transition duration-300 bg-green-500 text-white hover:bg-green-600"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 rounded-md font-bold transition duration-300 bg-green-500 text-white hover:bg-green-600"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile