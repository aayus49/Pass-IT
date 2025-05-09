export interface Instructor {
  id: string;
  name: string;
  type: 'full-time' | 'part-time';
  availability: string[];
  villages: string[];
  phone: string;
  email: string;
  rating?: number;
  profileImage?: string;
}

export interface LessonType {
  id: string;
  name: 'Introductory' | 'Standard' | 'Pass Plus' | 'Driving Test';
  duration: number;
  price: number;
  description: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  village: string;
  progress: 'Beginner' | 'Intermediate' | 'Advanced' | 'Test Ready';
  lessonsCompleted: number;
  nextLesson?: string;
  notes?: string;
}

export interface Booking {
  id: string;
  studentId: string;
  instructorId: string;
  lessonType: string;
  date: string;
  time: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Village {
  id: string;
  name: string;
  postcode: string;
}