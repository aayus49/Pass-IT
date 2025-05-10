import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from './StatCard';
import UpcomingLessons from './UpcomingLessons';
import StudentProgress from './StudentProgress';
import { Users, UserRound, CalendarClock, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { students, instructors, lessons } = useAppContext();
  
  const upcomingLessons = lessons.filter(
    lesson => lesson.status === 'Confirmed' && new Date(lesson.date) > new Date()
  );
  
  const calculateCompletionRate = () => {
    const completed = lessons.filter(lesson => lesson.status === 'Completed').length;
    return completed > 0 ? Math.round((completed / lessons.length) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={students.length}
          description="Active students"
          icon={<Users size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatCard
          title="Instructors"
          value={instructors.length}
          description="Available instructors"
          icon={<UserRound size={24} />}
        />
        
        <StatCard
          title="Upcoming Lessons"
          value={upcomingLessons.length}
          description="Next 7 days"
          icon={<CalendarClock size={24} />}
        />
        
        <StatCard
          title="Completion Rate"
          value={`${calculateCompletionRate()}%`}
          description="Last 30 days"
          icon={<Clock size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingLessons lessons={upcomingLessons} />
        </div>
        
        <div>
          <StudentProgress students={students} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;