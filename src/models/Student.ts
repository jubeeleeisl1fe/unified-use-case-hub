
export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
}

export interface Grade {
  studentId: string;
  courseId: string;
  grade: number;
}
