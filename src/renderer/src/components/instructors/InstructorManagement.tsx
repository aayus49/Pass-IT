import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  PlusCircle, Edit, Trash2, UserRound, Phone, Mail, CalendarRange 
} from 'lucide-react';
import InstructorForm from './InstructorForm';

const InstructorManagement: React.FC = () => {
  const { instructors } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<string | null>(null);
  
  const handleEdit = (id: string) => {
    setEditingInstructor(id);
    setShowForm(true);
  };
  
  const handleDelete = (id: string) => {
    // This would be implemented in a real application
    alert('Delete functionality would be implemented in a production app');
  };
  
  const closeForm = () => {
    setShowForm(false);
    setEditingInstructor(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Instructors</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusCircle size={18} />
          Add Instructor
        </button>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <InstructorForm 
              instructorId={editingInstructor} 
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
                  Instructor
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lessons
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {instructors.map((instructor) => (
                <tr key={instructor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserRound size={18} className="text-blue-700" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{instructor.name}</div>
                        <div className="text-xs text-gray-500">Driving Instructor</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center mb-1">
                        <Phone size={14} className="text-gray-400 mr-2" />
                        <span>{instructor.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={14} className="text-gray-400 mr-2" />
                        <span>{instructor.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <CalendarRange size={16} className="text-gray-400 mr-2" />
                      <div>
                        {instructor.availableHours.map((hours, index) => (
                          <div key={index} className="text-xs text-gray-600">
                            <span className="font-medium">{hours.day}:</span> {hours.startTime} - {hours.endTime}
                          </div>
                        )).slice(0, 3)}
                        {instructor.availableHours.length > 3 && (
                          <div className="text-xs text-blue-600 font-medium mt-1 cursor-pointer">
                            +{instructor.availableHours.length - 3} more days
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <span className="text-gray-900 font-medium">{instructor.students.length}</span>
                      <span className="text-gray-500 ml-1">assigned</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <span className="text-gray-900 font-medium">{instructor.completedLessons}</span>
                      <span className="text-gray-500 ml-1">completed</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => handleEdit(instructor.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(instructor.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
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

export default InstructorManagement;