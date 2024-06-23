import React, { useState, useEffect } from 'react'

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
        languages: [
            { language: "English" },
            { language: "Spanish" }
        ],
        isVerified: true,
        profileImageLink: "https://via.placeholder.com/150",
        certificateImageLink: "https://via.placeholder.com/300x200?text=Nursing+Certificate"
    });

    useEffect(() => {
        // This is where you would normally fetch the data from an API
        // For now, we're using the dummy data set in the initial state
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 bg-gray-300 rounded-xl shadow-md overflow-hidden md:max-w-2xl px-4 md:px-0 ">
            <div className="p-8 ">
                <h2 className="uppercase tracking-wide text-lg text-indigo-500 font-semibold mb-4">Details</h2>
                
                <div className="flex flex-col md:flex-row items-center mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden mr-6">
                        <img
                            src={nurseData.profileImageLink}
                            alt="Profile"
                            className="w-full h-full object-cover"
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
                            <p>Verified: {nurseData.isVerified ? 'Yes' : 'No'}</p>
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
    )
}

export default NurseDetails