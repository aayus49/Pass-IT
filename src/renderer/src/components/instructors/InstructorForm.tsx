import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { X, Plus, Trash2 } from 'lucide-react';

interface InstructorFormProps {
  instructorId: string | null;
  onClose: () => void;
}

interface AvailabilityDay {
  day: string;
  startTime: string;
  endTime: string;
}

const InstructorForm: React.FC<InstructorFormProps> = ({ instructorId, onClose }) => {
  const { instructors, addInstructor, updateInstructor } = useAppContext();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [availability, setAvailability] = useState<AvailabilityDay[]>([
    { day: 'Monday', startTime: '09:00', endTime: '17:00' },
  ]);
  
  useEffect(() => {
    if (instructorId) {
      const instructor = instructors.find(i => i.id === instructorId);
      if (instructor) {
        setName(instructor.name);
        setPhone(instructor.phone);
        setEmail(instructor.email);
        setAvailability(instructor.availableHours);
      }
    }
  }, [instructorId, instructors]);
  
  const handleAddAvailability = () => {
    setAvailability([
      ...availability,
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
    ]);
  };
  
  const handleRemoveAvailability = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };
  
  const handleAvailabilityChange = (index: number, field: keyof AvailabilityDay, value: string) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index] = {
      ...updatedAvailability[index],
      [field]: value,
    };
    setAvailability(updatedAvailability);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const instructorData = {
      name,
      phone,
      email,
      availableHours: availability,
    };
    
    if (instructorId) {
      const instructorToUpdate = instructors.find(i => i.id === instructorId);
      if (instructorToUpdate) {
        updateInstructor({
          ...instructorToUpdate,
          ...instructorData,
        });
      }
    } else {
      addInstructor(instructorData);
    }
    
    onClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {instructorId ? 'Edit Instructor' : 'Add New Instructor'}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <button
              type="button"
              onClick={handleAddAvailability}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} className="mr-1" />
              Add Day
            </button>
          </div>
          
          {availability.map((day, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 items-center">
              <div>
                <select
                  value={day.day}
                  onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                  className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={day.startTime}
                  onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                  className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={day.endTime}
                  onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                  className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                {availability.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAvailability(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
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
            {instructorId ? 'Update Instructor' : 'Add Instructor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstructorForm;