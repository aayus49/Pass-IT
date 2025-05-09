import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Header: React.FC = () => {
  const { activeView } = useAppContext();

  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Dashboard';
      case 'students':
        return 'Student Management';
      case 'instructors':
        return 'Instructor Management';
      case 'lessons':
        return 'Lesson Management';
      case 'reports':
        return 'Reports & Analytics';
      default:
        return 'Pass IT Driving School';
    }
  };

  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="relative">
            <Bell size={20} className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-medium">
              JS
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">John Smith</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;