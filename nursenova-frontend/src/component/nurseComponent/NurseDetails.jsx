import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getNurseDetails, updateProfilePicture } from "../../api/nurse";
import { toast } from "react-toastify";

const NurseDetails = () => {
  const [nurseData, setNurseData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    age: 32,
    gender: "Female",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    experience: "5 years in intensive care",
    education: "BSN from State University",
    languages: [{ language: "English" }, { language: "Spanish" }],
    isVerified: true,
    profileImageLink: "https://via.placeholder.com/150",
    certificateImageLink:
      "https://via.placeholder.com/300x200?text=Nursing+Certificate",
  });
  const username = useSelector((state) => state.auth.email);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dataFetch,setDataFetch]=useState(false);

  useEffect(() => {
    const fetchData = async (username) => {
      try {
        const response = await getNurseDetails(username);
        console.log(response);
        setNurseData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (username) {
      fetchData(username);
    }
  }, [username,dataFetch]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpload = async () => {
   
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("profile", selectedFile);

    try {
   
        const response = await updateProfilePicture(username, formData);
        if (response) {
          toast.success("profile updated successfully")
          setDataFetch(!dataFetch);
          setSelectedFile(null);
          setImagePreview(null)
        }
    } catch (error) {
      console.error("Error updating profile image:", error);
    
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-300 rounded-xl shadow-md overflow-hidden md:max-w-screen-2xl px-4 md:px-0 ">
      <div className="p-8 ">
        <h2 className="uppercase tracking-wide text-lg text-indigo-500 font-semibold mb-4">
          Details
        </h2>

        <div className="flex items-center mb-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden mr-6">
              <img
                src={imagePreview || nurseData.profileImageLink}
                alt="Profile"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className=" w-32 h-32 absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <label
                htmlFor="profileImage"
                className="cursor-pointer text-white text-sm font-semibold"
              >
                Change Photo
              </label>
              <input
                type="file"
                id="profileImage"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>
          </div>

          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">
              {nurseData.firstName} {nurseData.lastName}
            </h2>
            <p className="text-gray-600">
              Age: {nurseData.age} | Gender: {nurseData.gender}
            </p>
            <p className="text-gray-600">Phone: {nurseData.phone}</p>
            <p className="text-gray-600">Address: {nurseData.address}</p>
            <p className="text-gray-600">Work location: {nurseData.location}</p>

            {selectedFile && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">
                  Selected: {selectedFile.name}
                </p>
                <button
                  onClick={handleUpload}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Upload New Image
                </button>
              </div>
            )}
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
                <li key={`${language.language}-${index}`}>
                  {language.language}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">Verification</h3>
              <p>Verified: {nurseData.verified ? "Yes" : "No"}</p>
            </div>
            {nurseData.certificateImageLink && (
              <img
                src={nurseData.certificateImageLink}
                alt="Certificate"
                className="mt-4 w-full h-auto rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseDetails;
