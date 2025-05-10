import React from 'react';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import StudentManagement from './components/students/StudentManagement';
import InstructorManagement from './components/instructors/InstructorManagement';
import LessonManagement from './components/lessons/LessonManagement';
import ReportManagement from './components/reports/ReportManagement';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

const AppContent: React.FC = () => {
  const { activeView } = useAppContext();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManagement />;
      case 'instructors':
        return <InstructorManagement />;
      case 'lessons':
        return <LessonManagement />;
      case 'reports':
        return <ReportManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout>
      {renderContent()}
    </MainLayout>
  );
};

// Import needed for AppContent component
import { useAppContext } from './context/AppContext';

export default App;