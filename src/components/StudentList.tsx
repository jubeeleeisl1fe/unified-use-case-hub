
import React, { useEffect, useState } from 'react';
import { Student } from '../models/Student';
import StudentController from '../controllers/StudentController';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Subscribe to student updates (Observer Pattern)
    StudentController.subscribe(setStudents);
    setStudents(StudentController.getStudents());
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Registered Students</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Enrolled Courses</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.enrolledCourses.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentList;
