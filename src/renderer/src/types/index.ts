export interface Student {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  progress: number;
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
  instructor?: Instructor;
  lessonHistory: Lesson[];
  nextTest?: {
    type: 'Theory' | 'Practical';
    date: string;
  };
}

export interface Instructor {
  id: string;
  name: string;
  phone: string;
  email: string;
  availableHours: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  students: Student[];
  completedLessons: number;
}

export interface Lesson {
  id: string;
  type: 'Introductory' | 'Standard' | 'Pass Plus' | 'Test';
  duration: number;
  fee: number;
  instructorId: string;
  studentId: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Cancelled' | 'Completed';
  paymentStatus: 'Paid' | 'Unpaid';
}

export interface Report {
  id: string;
  type: 'Daily' | 'Weekly' | 'Monthly';
  date: string;
  instructorId?: string;
  data: any;
}