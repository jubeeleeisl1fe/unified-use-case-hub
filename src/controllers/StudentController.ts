
import { Student } from '../models/Student';
import DatabaseService from '../services/DatabaseService';

// Observer Pattern for state management
class StudentController {
  private observers: ((students: Student[]) => void)[] = [];

  public subscribe(observer: (students: Student[]) => void) {
    this.observers.push(observer);
  }

  private notify(students: Student[]) {
    this.observers.forEach(observer => observer(students));
  }

  public getStudents(): Student[] {
    return DatabaseService.getData('students') || [];
  }

  public addStudent(student: Omit<Student, 'id' | 'enrolledCourses'>): void {
    const students = this.getStudents();
    const newStudent: Student = {
      id: Math.random().toString(36).substr(2, 9),
      enrolledCourses: [],
      ...student
    };
    
    students.push(newStudent);
    DatabaseService.saveData('students', students);
    this.notify(students);
  }

  public enrollInCourse(studentId: string, courseId: string): void {
    const students = this.getStudents();
    const student = students.find(s => s.id === studentId);
    if (student && !student.enrolledCourses.includes(courseId)) {
      student.enrolledCourses.push(courseId);
      DatabaseService.saveData('students', students);
      this.notify(students);
    }
  }
}

export default new StudentController();
