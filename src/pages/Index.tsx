
import React from 'react';
import PayrollManagement from '../components/PayrollManagement';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#1a365d]">
          Payroll Management System
        </h1>
        <div className="max-w-7xl mx-auto">
          <PayrollManagement />
        </div>
      </div>
    </div>
  );
};

export default Index;
