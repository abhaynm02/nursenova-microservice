import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Lock, Wallet, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/AuthSlice';

const UserSideBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menuItems = [
        { icon: User, text: 'Profile', link: '/profile' },
        { icon: Lock, text: 'Change Password', link: '/profile/change-password' },
        { icon: Wallet, text: 'Wallet', link: '/profile/wallet' },
        { icon: LogOut, text: 'Logout', onClick: () => {
            dispatch(logOut())
            navigate('/login'); 
        } },
    ];

    return (
        <div className={`${isOpen ? 'w-64 ' : 'w-20'} transition-all duration-300 h-screen bg-gray-800 text-gray-100 relative`}>
            <button
                className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 bg-gray-600 text-gray-100 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 ${!isOpen && 'rotate-180'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
            <div className="p-5 pt-20">
                <ul className="space-y-4">
                    {menuItems.map((item, index) => {
                        const isActive = item.link && location.pathname === item.link;
                        return (
                            <li key={index}>
                                {item.link ? (
                                    <Link 
                                        to={item.link} 
                                        className={`flex items-center p-3 rounded-lg transition-colors duration-200
                                            ${isActive 
                                                ? 'bg-blue-600 text-white' 
                                                : 'hover:bg-gray-700'
                                            }`}
                                    >
                                        <item.icon className={`${isOpen ? 'mr-4' : 'mx-auto'}`} size={24} />
                                        <span className={`${!isOpen && 'hidden'} font-medium`}>{item.text}</span>
                                    </Link>
                                ) : (
                                    <button 
                                        onClick={item.onClick} 
                                        className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 w-full text-left"
                                    >
                                        <item.icon className={`${isOpen ? 'mr-4' : 'mx-auto'}`} size={24} />
                                        <span className={`${!isOpen && 'hidden'} font-medium`}>{item.text}</span>
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default UserSideBar;