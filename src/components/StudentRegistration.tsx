
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import StudentController from '../controllers/StudentController';

const StudentRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    StudentController.addStudent({ name, email });
    toast({
      title: "Success",
      description: "Student registered successfully",
    });
    setName('');
    setEmail('');
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Register Student
        </Button>
      </form>
    </Card>
  );
};

export default StudentRegistration;
