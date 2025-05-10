import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student, Instructor, Lesson, Report } from '../types';
import { 
  mockStudents, 
  mockInstructors, 
  mockLessons 
} from '../data/mockData';

interface AppContextType {
  students: Student[];
  instructors: Instructor[];
  lessons: Lesson[];
  reports: Report[];
  activeView: string;
  setActiveView: (view: string) => void;
  addStudent: (student: Omit<Student, 'id' | 'lessonHistory'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  addInstructor: (instructor: Omit<Instructor, 'id' | 'students' | 'completedLessons'>) => void;
  updateInstructor: (instructor: Instructor) => void;
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  updateLesson: (lesson: Lesson) => void;
  cancelLesson: (id: string) => void;
  generateReport: (type: 'Daily' | 'Weekly' | 'Monthly', instructorId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [instructors, setInstructors] = useState<Instructor[]>(mockInstructors);
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [reports, setReports] = useState<Report[]>([]);
  const [activeView, setActiveView] = useState('dashboard');

  const addStudent = (student: Omit<Student, 'id' | 'lessonHistory'>) => {
    const newStudent: Student = {
      ...student,
      id: `student-${Date.now()}`,
      lessonHistory: [],
    };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const addInstructor = (instructor: Omit<Instructor, 'id' | 'students' | 'completedLessons'>) => {
    const newInstructor: Instructor = {
      ...instructor,
      id: `instructor-${Date.now()}`,
      students: [],
      completedLessons: 0,
    };
    setInstructors([...instructors, newInstructor]);
  };

  const updateInstructor = (updatedInstructor: Instructor) => {
    setInstructors(instructors.map(instructor => 
      instructor.id === updatedInstructor.id ? updatedInstructor : instructor
    ));
  };

  const addLesson = (lesson: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...lesson,
      id: `lesson-${Date.now()}`,
    };
    setLessons([...lessons, newLesson]);
  };

  const updateLesson = (updatedLesson: Lesson) => {
    setLessons(lessons.map(lesson => 
      lesson.id === updatedLesson.id ? updatedLesson : lesson
    ));
  };

  const cancelLesson = (id: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, status: 'Cancelled' } : lesson
    ));
  };

  const generateReport = (type: 'Daily' | 'Weekly' | 'Monthly', instructorId?: string) => {
    // In a real app, this would generate actual reports
    const newReport: Report = {
      id: `report-${Date.now()}`,
      type,
      date: new Date().toISOString(),
      instructorId,
      data: {
        lessons: lessons.filter(lesson => 
          !instructorId || lesson.instructorId === instructorId
        ),
      },
    };
    setReports([...reports, newReport]);
  };

  const value = {
    students,
    instructors,
    lessons,
    reports,
    activeView,
    setActiveView,
    addStudent,
    updateStudent,
    deleteStudent,
    addInstructor,
    updateInstructor,
    addLesson,
    updateLesson,
    cancelLesson,
    generateReport,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};