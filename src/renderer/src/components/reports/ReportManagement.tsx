import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { BarChart2, Calendar, Clock, Download, Filter } from 'lucide-react';

const ReportManagement: React.FC = () => {
  const { lessons, instructors, generateReport } = useAppContext();
  const [reportType, setReportType] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [instructorId, setInstructorId] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  
  const filteredLessons = lessons.filter(lesson => {
    const lessonDate = new Date(lesson.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    
    const dateInRange = lessonDate >= start && lessonDate <= end;
    const matchesInstructor = !instructorId || lesson.instructorId === instructorId;
    
    return dateInRange && matchesInstructor;
  });
  
  const calculateRevenue = () => {
    return filteredLessons.reduce((total, lesson) => {
      return total + (lesson.paymentStatus === 'Paid' ? lesson.fee : 0);
    }, 0);
  };
  
  const calculatePendingRevenue = () => {
    return filteredLessons.reduce((total, lesson) => {
      return total + (lesson.paymentStatus === 'Unpaid' ? lesson.fee : 0);
    }, 0);
  };
  
  const calculateTotalHours = () => {
    return filteredLessons.reduce((total, lesson) => {
      return total + lesson.duration;
    }, 0);
  };
  
  const handleGenerateReport = () => {
    generateReport(reportType, instructorId || undefined);
    alert(`${reportType} report generated successfully!`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Reports & Analytics</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Generate Report</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor (Optional)
            </label>
            <select
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Instructors</option>
              {instructors.map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleGenerateReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download size={18} />
            Generate Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Revenue</h3>
            <div className="p-2 bg-green-100 rounded-full text-green-700">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">£{calculateRevenue()}</p>
          <p className="text-sm text-gray-500 mt-2">Collected payments</p>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-sm font-medium text-red-600">£{calculatePendingRevenue()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Teaching Hours</h3>
            <div className="p-2 bg-blue-100 rounded-full text-blue-700">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{calculateTotalHours()}</p>
          <p className="text-sm text-gray-500 mt-2">Total hours in selected period</p>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Lessons</p>
              <p className="text-sm font-medium text-gray-800">{filteredLessons.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Lessons by Type</h3>
            <div className="p-2 bg-purple-100 rounded-full text-purple-700">
              <BarChart2 size={20} />
            </div>
          </div>
          
          <div className="space-y-3">
            {(['Introductory', 'Standard', 'Pass Plus', 'Test'] as const).map(type => {
              const count = filteredLessons.filter(l => l.type === type).length;
              const percentage = filteredLessons.length 
                ? Math.round((count / filteredLessons.length) * 100) 
                : 0;
              
              return (
                <div key={type}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{type}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        type === 'Introductory' ? 'bg-blue-500' :
                        type === 'Standard' ? 'bg-green-500' :
                        type === 'Pass Plus' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-medium text-gray-800">Lesson Details</h3>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm text-gray-500">
              {filteredLessons.length} lessons in selected period
            </span>
          </div>
        </div>
        
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
                  Duration
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          {new Date(lesson.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">{lesson.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{/* Student name would be here */}</td>
                  <td className="px-6 py-4">{/* Instructor name would be here */}</td>
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
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <span>{lesson.duration}h</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">£{lesson.fee}</span>
                    </div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportManagement;

// Custom DollarSign component since we can't import it directly
const DollarSign: React.FC<{ size: number }> = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);