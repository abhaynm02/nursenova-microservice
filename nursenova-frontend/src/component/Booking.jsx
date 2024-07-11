import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkoutDetails } from "../api/user";
import {
  User,
  Calendar,
  FileText,
  Home,
  MapPin,
  DollarSign,
  CreditCard,
  Clock,
  BookOpen,
  Globe,
} from "lucide-react";

const Booking = () => {
  // ... (keep all the existing state and effect hooks)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    details: "",
    firstName: "",
    lastName: "",
    address: "",
    pin: "",
  });

  const [nurseId, setNurseId] = useState("");
  const [serviceId, setServiceId] = useState();
  const [slots, setSlots] = useState([]);
  const [nurseData, setNurseData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    age: 32,
    gender: "Female",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    experience: "5 years in intensive care",
    education: "BSN from State University",
    languageDtos: [{ language: "English" }, { language: "Spanish" }],
    serviceName: "Home care",
    servicePrice: 0,
    totalAmount: 0,
    duty: "",
  });

  const [errors, setErrors] = useState({});
  const [isValidate, setIsValidate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.email);
  

  useEffect(() => {
    const fetchData = async (nurseId, serviceId, totalDays) => {
      try {
        const response = await checkoutDetails(nurseId, serviceId, totalDays);
        setNurseData(response.data);
      } catch (error) {
        console.error("Error fetching checkout details:", error);
      }
    };

    if (
      location.state?.slots &&
      location.state?.nurseId &&
      location.state?.selectService
    ) {
      setSlots(location.state.slots);
      setNurseId(location.state.nurseId);
      setServiceId(location.state.selectService);
      fetchData(
        location.state.nurseId,
        location.state.selectService,
        location.state.slots.length
      );
    }
  }, [location.state]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || parseInt(formData.age) <= 0)
      newErrors.age = "Please enter a valid age";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.details.trim()) newErrors.details = "Details are required";
    if (!formData.pin.trim()) newErrors.pin = "PIN code is required";
    else if (!/^\d{5}$/.test(formData.pin))
      newErrors.pin = "Please enter a valid 5-digit PIN code";

    setErrors(newErrors);
    setIsValidate(Object.keys(newErrors).length === 0);
  };

  const handlePaymentSuccess = () => {
    const data = {
      userId:userId,
      nurseId: nurseId,
      serviceId:serviceId,
      serviceName: nurseData.serviceName,
      servicePrice: nurseData.servicePrice,
      totalAmount: nurseData.totalAmount,
      totalDays: slots.length,
      dutyType: nurseData.duty,
      patientFullName: formData.name,
      age: formData.age,
      gender: formData.gender,
      medicalDetails: formData.details,
     firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      pin: formData.pin,
      paymentId: "",
      slotDtos: slots,
    };
   console.log(data)
   navigate('/checkout',{ state: {data:data}});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12 animate-fade-in-down">
          Book Your Personalized Care
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <FormSection title="Patient Information" icon={User}>
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={(value) => handleInputChange("name", value)}
              error={errors.name}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Age"
                name="age"
                value={formData.age}
                onChange={(value) => handleInputChange("age", value)}
                error={errors.age}
              />
              <InputField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={(value) => handleInputChange("gender", value)}
                error={errors.gender}
              />
            </div>
            <InputField
              label="Medical Details"
              name="details"
              value={formData.details}
              onChange={(value) => handleInputChange("details", value)}
              multiline
              error={errors.details}
            />
          </FormSection>

          <FormSection title="Booking Address" icon={Home}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={(value) => handleInputChange("firstName", value)}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={(value) => handleInputChange("lastName", value)}
                error={errors.lastName}
              />
            </div>
            <InputField
              label="Street Address"
              name="address"
              value={formData.address}
              onChange={(value) => handleInputChange("address", value)}
              multiline
              error={errors.address}
            />
            <InputField
              label="PIN Code"
              name="pin"
              value={formData.pin}
              onChange={(value) => handleInputChange("pin", value)}
              error={errors.pin}
            />
          </FormSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ServiceDetails nurseData={nurseData} slots={slots} />
          <NurseDetails nurseData={nurseData} />
        </div>

        <PaymentSummary
          nurseData={nurseData}
          slots={slots}
          isValidate={isValidate}
          onPayment={handlePaymentSuccess}
        />
      </div>
    </div>
  );
};

const FormSection = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
    <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
      <Icon className="mr-2" size={28} />
      {title}
    </h2>
    {children}
  </div>
);

const InputField = ({ label, value, onChange, multiline, error, name }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {multiline ? (
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows="3"
        className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
    )}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const ServiceDetails = ({ nurseData, slots }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
    <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
      <Calendar className="mr-2" size={28} />
      Service Details
    </h2>
    <div className="space-y-4">
      <DetailItem
        icon={FileText}
        label="Service"
        value={nurseData.serviceName}
      />
      <DetailItem
        icon={DollarSign}
        label="Price"
        value={`$${nurseData.servicePrice}`}
      />
      <DetailItem icon={Clock} label="Duty Type" value={nurseData.duty} />
    </div>
    <h3 className="font-semibold mt-6 mb-3 text-lg text-blue-800">
      Selected Dates:
    </h3>
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => (
        <div
          key={slot.id}
          className="bg-blue-100 p-2 rounded text-center text-blue-800 font-medium"
        >
          {format(new Date(slot.date), "MMM d, yyyy")}
        </div>
      ))}
    </div>
  </div>
);

const NurseDetails = ({ nurseData }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
    <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
      <User className="mr-2" size={28} />
      Nurse Details
    </h2>
    <div className="space-y-4">
      <DetailItem
        icon={User}
        label="Name"
        value={`${nurseData.firstName} ${nurseData.lastName}`}
      />
      <DetailItem icon={Calendar} label="Age" value={nurseData.age} />
      <DetailItem icon={User} label="Gender" value={nurseData.gender} />
      <DetailItem
        icon={Clock}
        label="Experience"
        value={nurseData.experience}
      />
      <DetailItem
        icon={BookOpen}
        label="Education"
        value={nurseData.education}
      />
    </div>
    <div className="mt-6">
      <h3 className="font-semibold mb-2 text-lg text-blue-800 flex items-center">
        <Globe className="mr-2" size={20} />
        Languages
      </h3>
      <div className="flex flex-wrap gap-2">
        {nurseData.languageDtos.map((lang, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {lang.language}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const PaymentSummary = ({ nurseData, slots, isValidate, onPayment }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
    <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
      <DollarSign className="mr-2" size={28} />
      Payment Summary
    </h2>
    <div className="space-y-4 mb-6">
      <DetailItem
        icon={DollarSign}
        label="Service Price"
        value={`$${nurseData.servicePrice}`}
      />
      <DetailItem icon={Calendar} label="Total Days" value={slots.length} />
      <DetailItem
        icon={CreditCard}
        label="Total Amount"
        value={`$${nurseData.totalAmount}`}
        highlight
      />
    </div>
    <button
      onClick={onPayment}
      disabled={!isValidate}
      className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition duration-300 ${
        isValidate
          ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      Proceed to Payment
    </button>
    {!isValidate && (
      <p className="text-red-500 text-sm mt-2">
        Please complete all fields before proceeding to payment.
      </p>
    )}
  </div>
);

const DetailItem = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center text-gray-600">
      <Icon className="w-5 h-5 mr-2" />
      <span>{label}</span>
    </div>
    <span
      className={`font-semibold ${
        highlight ? "text-lg text-blue-600" : "text-gray-800"
      }`}
    >
      {value}
    </span>
  </div>
);

export default Booking;
