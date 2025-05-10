import React from 'react';
import { 
  Users, UserRound, CalendarClock, 
  BarChart3, Home, LogOut 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const SidebarItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, text, active, onClick }) => {
  return (
    <li 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
        ${active 
          ? 'bg-blue-100 text-blue-700' 
          : 'hover:bg-gray-100 text-gray-700'
        }`}
    >
      <div className={active ? 'text-blue-700' : 'text-gray-500'}>
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useAppContext();

  const menuItems = [
    { id: 'dashboard', text: 'Dashboard', icon: <Home size={20} /> },
    { id: 'students', text: 'Students', icon: <Users size={20} /> },
    { id: 'instructors', text: 'Instructors', icon: <UserRound size={20} /> },
    { id: 'lessons', text: 'Lessons', icon: <CalendarClock size={20} /> },
    { id: 'reports', text: 'Reports', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="w-64 border-r bg-white h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Pass IT
        </h1>
        <p className="text-sm text-gray-500">Driving School Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              text={item.text}
              active={activeView === item.id}
              onClick={() => setActiveView(item.id)}
            />
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 w-full p-3 rounded-lg hover:bg-gray-100 transition-all">
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;