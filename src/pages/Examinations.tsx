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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
} from '@mui/icons-material';
import { Exam } from '@/types';
import { format } from 'date-fns';

const mockExams: Exam[] = [
  {
    id: '1',
    name: 'Mid-Term Examination 2024',
    type: 'term',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    courseId: '1',
    subjects: [
      {
        id: '1',
        subjectId: 'SUB-001',
        subjectName: 'Mathematics',
        examDate: '2024-03-01',
        maxMarks: 100,
      },
      {
        id: '2',
        subjectId: 'SUB-002',
        subjectName: 'Physics',
        examDate: '2024-03-03',
        maxMarks: 100,
      },
    ],
  },
  {
    id: '2',
    name: 'Final Examination 2024',
    type: 'semester',
    startDate: '2024-05-01',
    endDate: '2024-05-20',
    courseId: '1',
    subjects: [],
  },
];

const examTypeColors: Record<string, 'default' | 'primary' | 'secondary' | 'success'> = {
  term: 'primary',
  semester: 'success',
  internal: 'default',
  external: 'secondary',
};

export const Examinations: React.FC = () => {
  const [exams] = useState<Exam[]>(mockExams);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const handleAdd = () => {
    setSelectedExam(null);
    setOpenDialog(true);
  };

  const handleEdit = (exam: Exam) => {
    setSelectedExam(exam);
    setOpenDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Examination Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Schedule Exam
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exam Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Subjects</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.name}</TableCell>
                <TableCell>
                  <Chip
                    label={exam.type}
                    color={examTypeColors[exam.type]}
                    size="small"
                  />
                </TableCell>
                <TableCell>{format(new Date(exam.startDate), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{format(new Date(exam.endDate), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{exam.subjects.length} subjects</TableCell>
                <TableCell>
                  <Chip
                    label={new Date(exam.endDate) > new Date() ? 'Upcoming' : 'Completed'}
                    color={new Date(exam.endDate) > new Date() ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(exam)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedExam ? 'Edit Examination' : 'Schedule New Examination'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Exam Name"
                defaultValue={selectedExam?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Exam Type"
                defaultValue={selectedExam?.type || 'term'}
              >
                <MenuItem value="term">Term</MenuItem>
                <MenuItem value="semester">Semester</MenuItem>
                <MenuItem value="internal">Internal</MenuItem>
                <MenuItem value="external">External</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Course"
                defaultValue={selectedExam?.courseId || '1'}
              >
                <MenuItem value="1">Engineering</MenuItem>
                <MenuItem value="2">Arts</MenuItem>
                <MenuItem value="3">Science</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                defaultValue={selectedExam?.startDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                defaultValue={selectedExam?.endDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


