import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  PlusCircle, Edit, XCircle, Calendar, Clock, User, UserRound, DollarSign 
} from 'lucide-react';
import LessonForm from './LessonForm';

const LessonManagement: React.FC = () => {
  const { lessons, students, instructors, cancelLesson } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);
  
  const handleEdit = (id: string) => {
    setEditingLesson(id);
    setShowForm(true);
  };
  
  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this lesson?')) {
      cancelLesson(id);
    }
  };
  
  const closeForm = () => {
    setShowForm(false);
    setEditingLesson(null);
  };
  
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Lessons</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusCircle size={18} />
          Book Lesson
        </button>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <LessonForm 
              lessonId={editingLesson} 
              onClose={closeForm} 
            />
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
                  Status
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
              {lessons.map((lesson) => (
                <tr 
                  key={lesson.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    lesson.status === 'Cancelled' ? 'bg-gray-50 text-gray-500' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-start">
                      <Calendar size={16} className="text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          {formatDate(lesson.date)}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock size={12} className="mr-1" />
                          {lesson.time} ({lesson.duration}h)
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">{getStudentName(lesson.studentId)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <UserRound size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">{getInstructorName(lesson.instructorId)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full
                        ${
                          lesson.type === 'Introductory' ? 'bg-blue-100 text-blue-800' :
                          lesson.type === 'Standard' ? 'bg-green-100 text-green-800' :
                          lesson.type === 'Pass Plus' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}
                    >
                      {lesson.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full
                        ${
                          lesson.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          lesson.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}
                    >
                      {lesson.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-gray-400 mr-1" />
                      <div>
                        <div className="text-sm font-medium">£{lesson.fee}</div>
                        <div className={`text-xs ${
                          lesson.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {lesson.paymentStatus}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    {lesson.status !== 'Cancelled' && (
                      <>
                        <button
                          onClick={() => handleEdit(lesson.id)}
                          className="text-blue-600 hover:text-blue-900"
                          disabled={lesson.status === 'Completed'}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleCancel(lesson.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={lesson.status === 'Completed'}
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LessonManagement;