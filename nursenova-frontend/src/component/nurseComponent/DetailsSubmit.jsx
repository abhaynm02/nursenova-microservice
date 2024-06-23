import React, { useEffect, useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { details } from '../../api/nurse';
import { toast } from 'react-toastify';


const DetailsSubmit = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username,setUserName]=useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [languages, setLanguages] = useState([]);
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location=useLocation();

  useEffect(() => {
    if (location.state) {
      const { userName, firstName, lastName } = location.state;

      if (userName) {
        setUserName(userName);
      }
      if (firstName) {
        setFirstName(firstName);
      }
      if (lastName) {
        setLastName(lastName);
      }
    }
  }, [location.state]);

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLanguages([...languages, value]);
    } else {
      setLanguages(languages.filter((language) => language !== value));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("hello")
      if (validate()) {
        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify({
          firstName: firstname,
          lastName: lastname,
          username: username,
          age: age,
          gender: gender,
          languages: languages,
          experience: experience,
          education: education,
          address: address,
          pin: pin,
          phone: phone
        })], { type: "application/json" }));
        formData.append('profile', profilePicture);
        formData.append('certificate', certificate);
        console.log("hello")
        const response = await details(formData);
        console.log(response);
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = 'Firstname is required';
    if (!lastname.trim()) newErrors.lastname = 'Lastname is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone))
      newErrors.phone = 'Phone number is invalid';
    if (!age.trim()) newErrors.age = 'Age is required';
    if (!gender.trim()) newErrors.gender = 'Gender is required';
    if (languages.length === 0) newErrors.languages = 'At least one language is required';
    if (!experience.trim()) newErrors.experience = 'Experience is required';
    if (!education.trim()) newErrors.education = 'Education is required';
    if (!profilePicture) newErrors.profilePicture = 'Profile picture is required';
    if (!certificate) newErrors.certificate = 'Certificate is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!pin.trim()) newErrors.pin = 'Pin code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="mx-auto flex justify-center items-center min-h-screen w-full bg-center bg-cover relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/Nurse-applying-for-job.jpg')", opacity: 0.5 }}
      ></div>
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-20 z-10 w-full">
        <form onSubmit={handleSubmit} className="max-w-[800px] w-full mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center py-6">Submit Details</h2>
          <p className="text-center text-gray-600 mb-8">Please enter your details below</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Firstname</label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                className={`border p-3 rounded-md ${errors.firstname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="text"
                value={firstname}
                readOnly
               
              />
              {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Lastname</label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                className={`border p-3 rounded-md ${errors.lastname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="text"
                placeholder="Doe"
                value={lastname}
                readOnly
              />
              {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Phone Number</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                className={`border p-3 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="text"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Age</label>
              <input
                onChange={(e) => setAge(e.target.value)}
                className={`border p-3 rounded-md ${errors.age ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="text"
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Gender</label>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <input
                    onChange={(e) => setGender('MALE')}
                    className="mr-2"
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={gender === 'MALE'}
                  />
                  <label>Male</label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={(e) => setGender('FEMALE')}
                    className="mr-2"
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={gender === 'FEMALE'}
                  />
                  <label>Female</label>
                </div>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Languages Spoken</label>
              <div className="flex flex-wrap">
                {['English', 'Malayalam', 'Kannada', 'Hindi', 'Tamil'].map((language) => (
                  <div key={language} className="flex items-center mr-4 mb-2">
                    <input
                      type="checkbox"
                      value={language}
                      onChange={handleLanguageChange}
                      checked={languages.includes(language)}
                      className="mr-2"
                    />
                    <label>{language}</label>
                  </div>
                ))}
              </div>
              {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Experience</label>
              <input
                onChange={(e) => setExperience(e.target.value)}
                className={`border p-3 rounded-md ${errors.experience ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="text"
                placeholder="Enter your experience"
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Education</label>
              <input
                onChange={(e) => setEducation(e.target.value)}
                className={`border p-3 rounded-md ${errors.education ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="text"
                placeholder="Enter your education"
              />
              {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Profile Picture</label>
              <input
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className={`border p-3 rounded-md ${errors.profilePicture ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="file"
                accept="image/*"
              />
              {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Certificate</label>
              <input
                onChange={(e) => setCertificate(e.target.files[0])}
                className={`border p-3 rounded-md ${errors.certificate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="file"
                accept="image/*"
              />
              {errors.certificate && <p className="text-red-500 text-sm mt-1">{errors.certificate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                className={`border p-3 rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="text"
                placeholder="Enter your address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Pin Code</label>
              <input
                onChange={(e) => setPin(e.target.value)}
                className={`border p-3 rounded-md ${errors.pin ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="text"
                placeholder="Enter your pin code"
              />
              {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="border font-bold text-white py-3 px-8 bg-green-500 hover:bg-green-600 rounded-xl transition duration-300 text-lg shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsSubmit;
