import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  GraduationCap, 
  Settings,
  FileText,
  Car
} from 'lucide-react';

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CalendarDays, label: 'Schedule', path: '/schedule' },
    { icon: Users, label: 'Instructors', path: '/instructors' },
    { icon: GraduationCap, label: 'Students', path: '/students' },
    { icon: FileText, label: 'Reports', path: '/reports' },
  ];

  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-4 border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <Car size={32} />
          <span className="text-lg font-bold">Pass IT</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-700">
        <Link
          to="/settings"
          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            isActive('/settings')
              ? 'bg-blue-700 text-white'
              : 'text-blue-100 hover:bg-blue-700'
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}