import React, { useState } from 'react';
import { format, startOfWeek, addDays, parse } from 'date-fns';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import type { Instructor, Student, Booking, LessonType } from '../types';

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<string>('all');
  const weekStart = startOfWeek(selectedDate);

  // Mock data
  const [instructors] = useState<Instructor[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      type: 'full-time',
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      villages: ['Northampton', 'Kettering', 'Wellingborough'],
      phone: '+44 7700 900077',
      email: 'sarah.wilson@passit.com'
    },
    {
      id: '2',
      name: 'John Smith',
      type: 'part-time',
      availability: ['Monday', 'Wednesday', 'Friday'],
      villages: ['Northampton', 'Daventry'],
      phone: '+44 7700 900078',
      email: 'john.smith@passit.com'
    }
  ]);

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+44 7700 900088',
      village: 'Northampton',
      progress: 'Test Ready',
      lessonsCompleted: 20
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+44 7700 900089',
      village: 'Kettering',
      progress: 'Intermediate',
      lessonsCompleted: 12
    }
  ]);

  const lessonTypes: LessonType[] = [
    {
      id: '1',
      name: 'Introductory',
      duration: 60,
      price: 30,
      description: 'First driving lesson'
    },
    {
      id: '2',
      name: 'Standard',
      duration: 120,
      price: 55,
      description: 'Regular driving lesson'
    },
    {
      id: '3',
      name: 'Pass Plus',
      duration: 180,
      price: 80,
      description: 'Advanced driving course'
    },
    {
      id: '4',
      name: 'Driving Test',
      duration: 180,
      price: 120,
      description: 'Practical driving test preparation'
    }
  ];

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      studentId: '1',
      instructorId: '1',
      lessonType: 'Standard',
      date: '2024-03-20',
      time: '09:00',
      location: 'Northampton',
      status: 'scheduled'
    }
  ]);

  // New booking form state
  const [newBooking, setNewBooking] = useState({
    studentId: '',
    instructorId: '',
    lessonType: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    location: '',
    notes: ''
  });

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    return `${hour}:00`;
  });

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleNewBooking = () => {
    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      ...newBooking,
      status: 'scheduled'
    };
    setBookings([...bookings, booking]);
    setShowBookingModal(false);
    setNewBooking({
      studentId: '',
      instructorId: '',
      lessonType: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '09:00',
      location: '',
      notes: ''
    });
  };

  const getBookingForSlot = (day: Date, time: string) => {
    return bookings.find(booking => 
      booking.date === format(day, 'yyyy-MM-dd') && 
      booking.time === time &&
      (selectedInstructor === 'all' || booking.instructorId === selectedInstructor)
    );
  };

  const getStudentName = (studentId: string) => {
    return students.find(s => s.id === studentId)?.name || 'Unknown Student';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setShowBookingModal(true)}
            >
              New Booking
            </button>
            <select 
              className="border rounded-lg px-3 py-2"
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
            >
              <option value="all">All Instructors</option>
              {instructors.map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Calendar size={20} />
            </button>
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 text-sm font-medium text-gray-500">Time</div>
          {weekDays.map((day) => (
            <div key={day.toString()} className="p-4 text-sm font-medium text-gray-900 text-center">
              {format(day, 'EEE dd/MM')}
            </div>
          ))}
        </div>

        <div className="divide-y">
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8">
              <div className="p-4 text-sm text-gray-500">{time}</div>
              {weekDays.map((day) => {
                const booking = getBookingForSlot(day, time);
                return (
                  <div
                    key={`${day}-${time}`}
                    className="p-2 border-l relative min-h-[80px] group hover:bg-gray-50"
                  >
                    {booking && (
                      <div className="absolute inset-1 bg-blue-50 border border-blue-200 rounded p-2 text-xs">
                        <div className="font-medium text-blue-900">
                          {getStudentName(booking.studentId)}
                        </div>
                        <div className="flex items-center text-blue-700 mt-1">
                          <Clock size={12} className="mr-1" />
                          <span>{booking.lessonType}</span>
                        </div>
                        <div className="flex items-center text-blue-700 mt-1">
                          <MapPin size={12} className="mr-1" />
                          <span>{booking.location}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Booking</h2>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={newBooking.studentId}
                  onChange={(e) => setNewBooking({...newBooking, studentId: e.target.value})}
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
                  className="w-full border rounded-lg px-3 py-2"
                  value={newBooking.instructorId}
                  onChange={(e) => setNewBooking({...newBooking, instructorId: e.target.value})}
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
                  className="w-full border rounded-lg px-3 py-2"
                  value={newBooking.lessonType}
                  onChange={(e) => setNewBooking({...newBooking, lessonType: e.target.value})}
                >
                  <option value="">Select Lesson Type</option>
                  {lessonTypes.map(type => (
                    <option key={type.id} value={type.name}>
                      {type.name} (£{type.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={newBooking.time}
                    onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newBooking.location}
                  onChange={(e) => setNewBooking({...newBooking, location: e.target.value})}
                  placeholder="Enter pickup location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2"
                  rows={3}
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking({...newBooking, notes: e.target.value})}
                  placeholder="Add any additional notes..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewBooking}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}