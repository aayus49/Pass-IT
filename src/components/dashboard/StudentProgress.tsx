import React from 'react';
import { Student } from '../../types';

interface StudentProgressProps {
  students: Student[];
}

const StudentProgress: React.FC<StudentProgressProps> = ({ students }) => {
  const sortedStudents = [...students]
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Student Progress</h2>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
            View All
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {sortedStudents.length === 0 ? (
          <div className="text-center text-gray-500">
            No student data available
          </div>
        ) : (
          <div className="space-y-5">
            {sortedStudents.map((student) => (
              <div key={student.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{student.name}</span>
                  <span className="text-sm font-medium text-gray-700">{student.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${getProgressColor(student.progress)}`}
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1.5 text-xs text-gray-500">
                  <span>{student.nextTest ? `Next: ${student.nextTest.type} Test` : 'No test scheduled'}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full
                      ${student.paymentStatus === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : student.paymentStatus === 'Partial' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {student.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProgress;