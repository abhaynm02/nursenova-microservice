import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate=useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Nursing Service</h1>
          <p className="text-xl">Compassionate Care, Professional Excellence</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Mission Statement */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold text-teal-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At the heart of our service is a commitment to providing exceptional home healthcare. 
            We believe that everyone deserves access to high-quality nursing care in the comfort of their own home. 
            Our mission is to bridge the gap between hospital care and home recovery, ensuring a seamless and 
            comfortable healing experience for all our patients.
          </p>
        </section>

        {/* Services Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-teal-600 mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-teal-500">
              <h3 className="text-xl font-semibold mb-2 text-teal-700">Home Nursing Care</h3>
              <p className="text-gray-600">Expert nursing care delivered in the comfort and privacy of your home, tailored to your specific health needs.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-teal-500">
              <h3 className="text-xl font-semibold mb-2 text-teal-700">Nurse Recruitment</h3>
              <p className="text-gray-600">Connect with qualified and compassionate nurses for your healthcare facility or personal care needs.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-teal-500">
              <h3 className="text-xl font-semibold mb-2 text-teal-700">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance ensures you have access to care whenever you need it, day or night.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-teal-500">
              <h3 className="text-xl font-semibold mb-2 text-teal-700">Specialized Care Programs</h3>
              <p className="text-gray-600">Customized care programs for specific conditions, ensuring you receive the most appropriate and effective treatment.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-teal-50 rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-teal-600 mb-6">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-4 text-gray-700">
            <li>Highly qualified and experienced nursing professionals</li>
            <li>Personalized care plans tailored to individual needs</li>
            <li>Stringent quality control and continuous training programs</li>
            <li>Seamless coordination with your primary healthcare providers</li>
            <li>State-of-the-art medical equipment and supplies</li>
            <li>Compassionate approach focused on patient comfort and recovery</li>
          </ul>
        </section>
      </main>

      {/* Call to Action */}
      <section className="bg-teal-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Difference</h2>
          <p className="text-xl mb-8">Let us provide you with the care you deserve.</p>
          <div className="space-x-4">
            <button
             onClick={()=>navigate('/services')}
            className="bg-white text-teal-600 py-2 px-6 rounded-full font-semibold text-lg hover:bg-teal-100 transition duration-300">
              Book a Nurse
            </button>
            <button className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-white hover:text-teal-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
