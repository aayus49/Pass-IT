import React, { useState, useEffect } from 'react';
import { Lesson } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { X } from 'lucide-react';

interface LessonFormProps {
  lessonId: string | null;
  onClose: () => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ lessonId, onClose }) => {
  const { students, instructors, lessons, addLesson, updateLesson } = useAppContext();
  
  const initialFormState = {
    type: 'Introductory' as const,
    duration: 1,
    fee: 30,
    instructorId: '',
    studentId: '',
    date: '',
    time: '',
    status: 'Confirmed' as const,
    paymentStatus: 'Unpaid' as const,
  };
  
  const [formData, setFormData] = useState<Omit<Lesson, 'id'>>(initialFormState);
  
  useEffect(() => {
    if (lessonId) {
      const lesson = lessons.find(l => l.id === lessonId);
      if (lesson) {
        setFormData({
          type: lesson.type,
          duration: lesson.duration,
          fee: lesson.fee,
          instructorId: lesson.instructorId,
          studentId: lesson.studentId,
          date: lesson.date,
          time: lesson.time,
          status: lesson.status,
          paymentStatus: lesson.paymentStatus,
        });
      }
    } else if (instructors.length > 0) {
      setFormData({
        ...initialFormState,
        instructorId: instructors[0].id,
      });
    }
  }, [lessonId, lessons, instructors]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'type') {
      // Adjust fee based on lesson type
      let newFee = formData.fee;
      let newDuration = formData.duration;
      
      switch (value) {
        case 'Introductory':
          newFee = 30;
          newDuration = 1;
          break;
        case 'Standard':
          newFee = 30;
          newDuration = formData.duration;
          break;
        case 'Pass Plus':
          newFee = 40;
          newDuration = 2;
          break;
        case 'Test':
          newFee = 50;
          newDuration = 3;
          break;
      }
      
      setFormData({
        ...formData,
        [name]: value,
        fee: newFee,
        duration: newDuration,
      });
    } else if (name === 'duration') {
      // Adjust fee based on duration
      const duration = parseInt(value, 10);
      let baseFee = 30;
      
      switch (formData.type) {
        case 'Introductory':
          baseFee = 30;
          break;
        case 'Standard':
          baseFee = 30;
          break;
        case 'Pass Plus':
          baseFee = 40;
          break;
        case 'Test':
          baseFee = 50;
          break;
      }
      
      setFormData({
        ...formData,
        duration,
        fee: baseFee * duration,
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'duration' || name === 'fee' 
          ? parseInt(value, 10) 
          : value,
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lessonId) {
      updateLesson({
        ...formData,
        id: lessonId,
      });
    } else {
      addLesson(formData);
    }
    
    onClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {lessonId ? 'Edit Lesson' : 'Book New Lesson'}
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
              Student
            </label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor
            </label>
            <select
              name="instructorId"
              value={formData.instructorId}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Instructor</option>
              {instructors.map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Introductory">Introductory</option>
              <option value="Standard">Standard</option>
              <option value="Pass Plus">Pass Plus</option>
              <option value="Test">Test</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (hours)
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fee (£)
            </label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
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
              required
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          
          {lessonId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
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
            {lessonId ? 'Update Lesson' : 'Book Lesson'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;