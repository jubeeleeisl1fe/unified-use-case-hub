
import StudentRegistration from '../components/StudentRegistration';
import StudentList from '../components/StudentList';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#1a365d]">
          Student Management System
        </h1>
        <div className="max-w-2xl mx-auto">
          <StudentRegistration />
          <StudentList />
        </div>
      </div>
    </div>
  );
};

export default Index;
