export type UserRole = 'super_admin' | 'admin' | 'staff' | 'student' | 'parent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  campusId?: string;
  departmentId?: string;
}

export interface Campus {
  id: string;
  name: string;
  address: string;
  code: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  campusId: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  campusId: string;
  departmentId: string;
  courseId: string;
  batch: string;
  admissionDate: string;
  status: 'active' | 'inactive' | 'graduated';
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  studentName: string;
  email: string;
  phone: string;
  courseId: string;
  campusId: string;
  status: 'applied' | 'verified' | 'shortlisted' | 'admitted' | 'rejected';
  appliedDate: string;
  documents: string[];
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  remarks?: string;
}

export interface Exam {
  id: string;
  name: string;
  type: 'term' | 'semester' | 'internal' | 'external';
  startDate: string;
  endDate: string;
  courseId: string;
  subjects: ExamSubject[];
}

export interface ExamSubject {
  id: string;
  subjectId: string;
  subjectName: string;
  examDate: string;
  maxMarks: number;
}

export interface Result {
  id: string;
  studentId: string;
  examId: string;
  subjectId: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  percentage: number;
}

export interface FeeStructure {
  id: string;
  courseId: string;
  feeType: 'tuition' | 'admission' | 'library' | 'transport' | 'hostel' | 'exam';
  amount: number;
  dueDate: string;
  academicYear: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  feeStructureId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'online' | 'cash' | 'cheque' | 'bank_transfer';
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  receiptNumber: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  duration: number;
  departmentId: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  courseId: string;
  credits: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}


