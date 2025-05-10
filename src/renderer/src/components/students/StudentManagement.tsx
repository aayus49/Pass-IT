import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  PlusCircle, Edit, Trash2, User, Phone, Mail, MapPin 
} from 'lucide-react';
import StudentForm from './StudentForm';

const StudentManagement: React.FC = () => {
  const { students, deleteStudent } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  
  const handleEdit = (id: string) => {
    setEditingStudent(id);
    setShowForm(true);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };
  
  const closeForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Students</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusCircle size={18} />
          Add Student
        </button>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <StudentForm 
              studentId={editingStudent} 
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
                  Student
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Test
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={18} className="text-blue-700" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin size={12} className="mr-1" />
                          {student.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center mb-1">
                        <Phone size={14} className="text-gray-400 mr-2" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={14} className="text-gray-400 mr-2" />
                        <span>{student.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                      <div
                        className={`h-2.5 rounded-full ${
                          student.progress >= 80 ? 'bg-green-500' : 
                          student.progress >= 50 ? 'bg-blue-500' : 
                          student.progress >= 30 ? 'bg-yellow-500' : 
                          'bg-orange-500'
                        }`}
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">{student.progress}% Complete</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
                        ${student.paymentStatus === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : student.paymentStatus === 'Partial' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {student.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {student.nextTest ? (
                      <div>
                        <div className="text-sm font-medium">{student.nextTest.type}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(student.nextTest.date).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">Not scheduled</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => handleEdit(student.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
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

export default StudentManagement;