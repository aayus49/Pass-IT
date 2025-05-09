import React, { useState, useEffect } from 'react';
import { Student } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { X } from 'lucide-react';

interface StudentFormProps {
  studentId: string | null;
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ studentId, onClose }) => {
  const { students, instructors, addStudent, updateStudent } = useAppContext();
  
  const initialFormState = {
    name: '',
    address: '',
    phone: '',
    email: '',
    progress: 0,
    paymentStatus: 'Unpaid' as const,
    nextTest: undefined,
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [hasNextTest, setHasNextTest] = useState(false);
  const [nextTestType, setNextTestType] = useState<'Theory' | 'Practical'>('Theory');
  const [nextTestDate, setNextTestDate] = useState('');
  
  useEffect(() => {
    if (studentId) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        setFormData({
          name: student.name,
          address: student.address,
          phone: student.phone,
          email: student.email,
          progress: student.progress,
          paymentStatus: student.paymentStatus,
          nextTest: student.nextTest,
        });
        
        setHasNextTest(!!student.nextTest);
        if (student.nextTest) {
          setNextTestType(student.nextTest.type);
          setNextTestDate(student.nextTest.date);
        }
      }
    }
  }, [studentId, students]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'progress' ? parseInt(value, 10) : value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const studentData = {
      ...formData,
      nextTest: hasNextTest 
        ? { type: nextTestType, date: nextTestDate } 
        : undefined,
    };
    
    if (studentId) {
      const studentToUpdate = students.find(s => s.id === studentId);
      if (studentToUpdate) {
        updateStudent({
          ...studentToUpdate,
          ...studentData,
        });
      }
    } else {
      addStudent(studentData);
    }
    
    onClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {studentId ? 'Edit Student' : 'Add New Student'}
        </h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Progress (%)
            </label>
            <input
              type="number"
              name="progress"
              min="0"
              max="100"
              value={formData.progress}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status
            </label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasNextTest"
              checked={hasNextTest}
              onChange={(e) => setHasNextTest(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hasNextTest" className="ml-2 text-sm font-medium text-gray-700">
              Has upcoming test?
            </label>
          </div>
          
          {hasNextTest && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Type
                </label>
                <select
                  value={nextTestType}
                  onChange={(e) => setNextTestType(e.target.value as 'Theory' | 'Practical')}
                  className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Theory">Theory</option>
                  <option value="Practical">Practical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Date
                </label>
                <input
                  type="date"
                  value={nextTestDate}
                  onChange={(e) => setNextTestDate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={hasNextTest}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {studentId ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;