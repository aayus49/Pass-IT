import React, { useState } from 'react';
import { Users, MapPin, Calendar, Phone, Mail, Star, X, Plus } from 'lucide-react';
import type { Instructor } from '../types';

export function Instructors() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterArea, setFilterArea] = useState('all');

  const [instructors, setInstructors] = useState<Instructor[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      type: 'full-time',
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      villages: ['Northampton', 'Kettering', 'Wellingborough'],
      phone: '+44 7700 900077',
      email: 'sarah.wilson@passit.com',
      rating: 4.8
    },
    {
      id: '2',
      name: 'John Smith',
      type: 'part-time',
      availability: ['Monday', 'Wednesday', 'Friday'],
      villages: ['Northampton', 'Daventry'],
      phone: '+44 7700 900078',
      email: 'john.smith@passit.com',
      rating: 4.5
    }
  ]);

  const [newInstructor, setNewInstructor] = useState<Partial<Instructor>>({
    type: 'full-time',
    availability: [],
    villages: []
  });

  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const availableVillages = ['Northampton', 'Kettering', 'Wellingborough', 'Daventry', 'Towcester'];

  const handleAddInstructor = () => {
    if (newInstructor.name && newInstructor.email && newInstructor.phone) {
      const instructor: Instructor = {
        id: Math.random().toString(36).substr(2, 9),
        name: newInstructor.name,
        type: newInstructor.type as 'full-time' | 'part-time',
        availability: newInstructor.availability || [],
        villages: newInstructor.villages || [],
        phone: newInstructor.phone,
        email: newInstructor.email
      };
      setInstructors([...instructors, instructor]);
      setShowAddModal(false);
      setNewInstructor({
        type: 'full-time',
        availability: [],
        villages: []
      });
    }
  };

  const handleEditInstructor = () => {
    if (selectedInstructor) {
      setInstructors(instructors.map(i => 
        i.id === selectedInstructor.id ? selectedInstructor : i
      ));
      setShowEditModal(false);
      setSelectedInstructor(null);
    }
  };

  const filteredInstructors = instructors.filter(instructor => {
    const matchesType = filterType === 'all' || instructor.type === filterType;
    const matchesArea = filterArea === 'all' || instructor.villages.includes(filterArea);
    return matchesType && matchesArea;
  });

  const toggleAvailability = (day: string, isNew: boolean = true) => {
    if (isNew) {
      const availability = newInstructor.availability || [];
      if (availability.includes(day)) {
        setNewInstructor({
          ...newInstructor,
          availability: availability.filter(d => d !== day)
        });
      } else {
        setNewInstructor({
          ...newInstructor,
          availability: [...availability, day]
        });
      }
    } else if (selectedInstructor) {
      const availability = selectedInstructor.availability || [];
      if (availability.includes(day)) {
        setSelectedInstructor({
          ...selectedInstructor,
          availability: availability.filter(d => d !== day)
        });
      } else {
        setSelectedInstructor({
          ...selectedInstructor,
          availability: [...availability, day]
        });
      }
    }
  };

  const toggleVillage = (village: string, isNew: boolean = true) => {
    if (isNew) {
      const villages = newInstructor.villages || [];
      if (villages.includes(village)) {
        setNewInstructor({
          ...newInstructor,
          villages: villages.filter(v => v !== village)
        });
      } else {
        setNewInstructor({
          ...newInstructor,
          villages: [...villages, village]
        });
      }
    } else if (selectedInstructor) {
      const villages = selectedInstructor.villages || [];
      if (villages.includes(village)) {
        setSelectedInstructor({
          ...selectedInstructor,
          villages: villages.filter(v => v !== village)
        });
      } else {
        setSelectedInstructor({
          ...selectedInstructor,
          villages: [...villages, village]
        });
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Instructors</h1>
        <div className="mt-4 flex items-center justify-between">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={20} className="mr-2" />
            Add New Instructor
          </button>
          <div className="flex space-x-2">
            <select 
              className="border rounded-lg px-3 py-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
            </select>
            <select 
              className="border rounded-lg px-3 py-2"
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
            >
              <option value="all">All Areas</option>
              {availableVillages.map(village => (
                <option key={village} value={village}>{village}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstructors.map((instructor) => (
          <div key={instructor.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
                    <span className="text-sm text-gray-500 capitalize">{instructor.type}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {instructor.rating && (
                    <span className="text-sm font-medium text-yellow-600 flex items-center">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      {instructor.rating}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{instructor.villages.join(', ')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{instructor.availability.join(', ')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{instructor.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{instructor.email}</span>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                  View Schedule
                </button>
                <button 
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setSelectedInstructor(instructor);
                    setShowEditModal(true);
                  }}
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Instructor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Instructor</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newInstructor.name || ''}
                  onChange={(e) => setNewInstructor({...newInstructor, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={newInstructor.type}
                  onChange={(e) => setNewInstructor({...newInstructor, type: e.target.value as 'full-time' | 'part-time'})}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableDays.map(day => (
                    <button
                      key={day}
                      onClick={() => toggleAvailability(day)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        newInstructor.availability?.includes(day)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Areas Covered
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableVillages.map(village => (
                    <button
                      key={village}
                      onClick={() => toggleVillage(village)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        newInstructor.villages?.includes(village)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {village}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newInstructor.phone || ''}
                  onChange={(e) => setNewInstructor({...newInstructor, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newInstructor.email || ''}
                  onChange={(e) => setNewInstructor({...newInstructor, email: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddInstructor}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Instructor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Instructor Modal */}
      {showEditModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Instructor</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedInstructor.name}
                  onChange={(e) => setSelectedInstructor({...selectedInstructor, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedInstructor.type}
                  onChange={(e) => setSelectedInstructor({...selectedInstructor, type: e.target.value as 'full-time' | 'part-time'})}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableDays.map(day => (
                    <button
                      key={day}
                      onClick={() => toggleAvailability(day, false)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedInstructor.availability.includes(day)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Areas Covered
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableVillages.map(village => (
                    <button
                      key={village}
                      onClick={() => toggleVillage(village, false)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedInstructor.villages.includes(village)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {village}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedInstructor.phone}
                  onChange={(e) => setSelectedInstructor({...selectedInstructor, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedInstructor.email}
                  onChange={(e) => setSelectedInstructor({...selectedInstructor, email: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditInstructor}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}