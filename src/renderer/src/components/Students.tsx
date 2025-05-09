import React, { useState } from 'react';
import { Search, Plus, Filter, X } from 'lucide-react';
import type { Student } from '../types';

export function Students() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgress, setFilterProgress] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+44 7700 900088',
      village: 'Northampton',
      progress: 'Test Ready',
      lessonsCompleted: 20,
      notes: 'Ready for test booking'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+44 7700 900089',
      village: 'Kettering',
      progress: 'Intermediate',
      lessonsCompleted: 12,
      notes: 'Needs more practice with parallel parking'
    }
  ]);

  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    progress: 'Beginner',
    lessonsCompleted: 0
  });

  const progressOptions = ['Beginner', 'Intermediate', 'Advanced', 'Test Ready'];
  const locationOptions = ['Northampton', 'Kettering', 'Wellingborough', 'Daventry', 'Towcester'];

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.phone && newStudent.village) {
      const student: Student = {
        id: Math.random().toString(36).substr(2, 9),
        name: newStudent.name,
        email: newStudent.email,
        phone: newStudent.phone,
        village: newStudent.village,
        progress: newStudent.progress as 'Beginner' | 'Intermediate' | 'Advanced' | 'Test Ready',
        lessonsCompleted: newStudent.lessonsCompleted || 0,
        notes: newStudent.notes
      };
      setStudents([...students, student]);
      setShowAddModal(false);
      setNewStudent({
        progress: 'Beginner',
        lessonsCompleted: 0
      });
    }
  };

  const handleEditStudent = () => {
    if (selectedStudent) {
      setStudents(students.map(s => 
        s.id === selectedStudent.id ? selectedStudent : s
      ));
      setShowEditModal(false);
      setSelectedStudent(null);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgress = filterProgress === 'all' || student.progress === filterProgress;
    const matchesLocation = filterLocation === 'all' || student.village === filterLocation;
    return matchesSearch && matchesProgress && matchesLocation;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <select
              className="border rounded-lg px-3 py-2"
              value={filterProgress}
              onChange={(e) => setFilterProgress(e.target.value)}
            >
              <option value="all">All Progress</option>
              {progressOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select
              className="border rounded-lg px-3 py-2"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locationOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={20} className="mr-2" />
              Add Student
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lessons
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Student ID: {student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                    <div className="text-sm text-gray-500">{student.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.village}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.progress === 'Test Ready'
                        ? 'bg-green-100 text-green-800'
                        : student.progress === 'Advanced'
                        ? 'bg-blue-100 text-blue-800'
                        : student.progress === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.progress}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.lessonsCompleted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Student</h2>
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
                  value={newStudent.name || ''}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newStudent.email || ''}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newStudent.phone || ''}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={newStudent.village || ''}
                  onChange={(e) => setNewStudent({...newStudent, village: e.target.value})}
                >
                  <option value="">Select Location</option>
                  {locationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Progress
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={newStudent.progress}
                  onChange={(e) => setNewStudent({...newStudent, progress: e.target.value as Student['progress']})}
                >
                  {progressOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lessons Completed
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newStudent.lessonsCompleted || 0}
                  onChange={(e) => setNewStudent({...newStudent, lessonsCompleted: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2"
                  rows={3}
                  value={newStudent.notes || ''}
                  onChange={(e) => setNewStudent({...newStudent, notes: e.target.value})}
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
                  onClick={handleAddStudent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Student</h2>
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
                  value={selectedStudent.name}
                  onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedStudent.email}
                  onChange={(e) => setSelectedStudent({...selectedStudent, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedStudent.phone}
                  onChange={(e) => setSelectedStudent({...selectedStudent, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedStudent.village}
                  onChange={(e) => setSelectedStudent({...selectedStudent, village: e.target.value})}
                >
                  {locationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Progress
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedStudent.progress}
                  onChange={(e) => setSelectedStudent({...selectedStudent, progress: e.target.value as Student['progress']})}
                >
                  {progressOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lessons Completed
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedStudent.lessonsCompleted}
                  onChange={(e) => setSelectedStudent({...selectedStudent, lessonsCompleted: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2"
                  rows={3}
                  value={selectedStudent.notes || ''}
                  onChange={(e) => setSelectedStudent({...selectedStudent, notes: e.target.value})}
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
                  onClick={handleEditStudent}
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