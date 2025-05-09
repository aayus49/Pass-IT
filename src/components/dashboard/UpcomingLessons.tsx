import React from 'react';
import { Lesson } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { CalendarClock, User, Clock, Banknote } from 'lucide-react';

interface UpcomingLessonsProps {
  lessons: Lesson[];
}

const UpcomingLessons: React.FC<UpcomingLessonsProps> = ({ lessons }) => {
  const { students, instructors } = useAppContext();
  
  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };
  
  const getInstructorName = (instructorId: string) => {
    const instructor = instructors.find(i => i.id === instructorId);
    return instructor ? instructor.name : 'Unknown Instructor';
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Lessons</h2>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
            View All
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {lessons.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No upcoming lessons scheduled
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lessons.slice(0, 5).map((lesson) => (
                <tr key={lesson.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarClock size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          {formatDate(lesson.date)}
                        </div>
                        <div className="text-xs text-gray-500">{lesson.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {getStudentName(lesson.studentId)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {getInstructorName(lesson.instructorId)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <div>
                        <span className="text-sm text-gray-700">{lesson.type}</span>
                        <div className="text-xs text-gray-500">{lesson.duration}h</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Banknote size={16} className="text-gray-400 mr-2" />
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full
                          ${lesson.paymentStatus === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        {lesson.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-900 font-medium text-sm">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UpcomingLessons;