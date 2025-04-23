
import { useState } from 'react';
import PayrollManagement from '../components/PayrollManagement';
import StudentRegistration from '../components/StudentRegistration';
import StudentList from '../components/StudentList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#1a365d]">
          Management System
        </h1>
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="payroll" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="payroll">Payroll Management</TabsTrigger>
              <TabsTrigger value="students">Student Management</TabsTrigger>
            </TabsList>
            <TabsContent value="payroll">
              <PayrollManagement />
            </TabsContent>
            <TabsContent value="students">
              <div className="grid md:grid-cols-2 gap-6">
                <StudentRegistration />
                <StudentList />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
