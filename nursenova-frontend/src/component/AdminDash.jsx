
import { FaUsers, FaCalendarAlt, FaChartLine, FaCog } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDash = () => {
  const name = useSelector((state) => state.auth.email);
  const role =useSelector((state)=>state.auth.role);
  const navigate =useNavigate();


  const dashboardItems = [
    { icon: FaUsers, title: 'User Management', description: 'Add, edit, or remove users' },
    { icon: FaCalendarAlt, title: 'Appointments', description: 'View and manage schedules' },
    { icon: FaChartLine, title: 'Analytics', description: 'Track site performance' },
    { icon: FaCog, title: 'Settings', description: 'Configure site options' },
  ];

  return (
    <div className="pt-16 w-full min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-80"></div>
      
      <img
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/Nurse-applying-for-job.jpg"
        alt="Nurse helping patient at home"
      />
      
      <div className="relative z-20 container mx-auto px-4 py-10 flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-center text-shadow">
          Welcome to Admin Dashboard
        </h1>
        
        <p className="text-xl mb-12 text-center text-gray-300">
          Manage your site with ease and efficiency.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {dashboardItems.map(({ icon: Icon, title, description }, index) => (
            <div 
              key={index}
              className="bg-black bg-opacity-50 rounded-lg p-6 flex flex-col items-center text-center hover:bg-opacity-70 transition-opacity duration-300"
            >
              <Icon className="text-4xl mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-6 bg-black bg-opacity-50 rounded-lg max-w-3xl w-full">
          <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Total Users</p>
              <p className="text-3xl font-bold">1,234</p>
            </div>
            <div>
              <p className="text-gray-400">Active Sessions</p>
              <p className="text-3xl font-bold">56</p>
            </div>
            <div>
              <p className="text-gray-400">Today's Appointments</p>
              <p className="text-3xl font-bold">23</p>
            </div>
            <div>
              <p className="text-gray-400">Server Load</p>
              <p className="text-3xl font-bold">42%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;