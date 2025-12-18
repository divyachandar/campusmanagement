import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import {
  Add,
  Edit,
  Search,
  Visibility,
} from '@mui/icons-material';
import { Student } from '@/types';

const mockStudents: Student[] = [
  {
    id: '1',
    studentId: 'STU-2024-001',
    name: 'John Doe',
    email: 'john.doe@college.edu',
    phone: '+1234567890',
    dateOfBirth: '2000-05-15',
    address: '123 Main St, City',
    campusId: '1',
    departmentId: '1',
    courseId: '1',
    batch: '2024',
    admissionDate: '2024-01-15',
    status: 'active',
    guardianName: 'Jane Doe',
    guardianPhone: '+1234567891',
    guardianEmail: 'jane.doe@example.com',
  },
  {
    id: '2',
    studentId: 'STU-2024-002',
    name: 'Jane Smith',
    email: 'jane.smith@college.edu',
    phone: '+1234567892',
    dateOfBirth: '2001-03-20',
    address: '456 Oak Ave, City',
    campusId: '1',
    departmentId: '2',
    courseId: '2',
    batch: '2024',
    admissionDate: '2024-01-16',
    status: 'active',
  },
];

export const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Student Management</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add Student
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by name, student ID, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>Course {student.courseId}</TableCell>
                <TableCell>{student.batch}</TableCell>
                <TableCell>
                  <Chip
                    label={student.status}
                    color={student.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleView(student)}>
                    <Visibility />
                  </IconButton>
                  <IconButton size="small">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Student ID</Typography>
                <Typography variant="body1">{selectedStudent.studentId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Name</Typography>
                <Typography variant="body1">{selectedStudent.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Email</Typography>
                <Typography variant="body1">{selectedStudent.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Phone</Typography>
                <Typography variant="body1">{selectedStudent.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Date of Birth</Typography>
                <Typography variant="body1">
                  {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Admission Date</Typography>
                <Typography variant="body1">
                  {new Date(selectedStudent.admissionDate).toLocaleDateString()}
                </Typography>
              </Grid>
              {selectedStudent.guardianName && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Guardian Name</Typography>
                    <Typography variant="body1">{selectedStudent.guardianName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Guardian Phone</Typography>
                    <Typography variant="body1">{selectedStudent.guardianPhone}</Typography>
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


