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
  TextField,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Download,
  Print,
  Search,
} from '@mui/icons-material';
import { Result } from '@/types';

const mockResults: Result[] = [
  {
    id: '1',
    studentId: 'STU-2024-001',
    examId: '1',
    subjectId: 'SUB-001',
    marksObtained: 85,
    maxMarks: 100,
    grade: 'A',
    percentage: 85,
  },
  {
    id: '2',
    studentId: 'STU-2024-001',
    examId: '1',
    subjectId: 'SUB-002',
    marksObtained: 92,
    maxMarks: 100,
    grade: 'A+',
    percentage: 92,
  },
  {
    id: '3',
    studentId: 'STU-2024-002',
    examId: '1',
    subjectId: 'SUB-001',
    marksObtained: 78,
    maxMarks: 100,
    grade: 'B+',
    percentage: 78,
  },
];

const gradeColors: Record<string, 'success' | 'primary' | 'warning' | 'error'> = {
  'A+': 'success',
  'A': 'success',
  'B+': 'primary',
  'B': 'primary',
  'C+': 'warning',
  'C': 'warning',
  'F': 'error',
};

export const Results: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results] = useState<Result[]>(mockResults);

  const filteredResults = results.filter(
    (result) =>
      result.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateGPA = (studentId: string): number => {
    const studentResults = results.filter(r => r.studentId === studentId);
    if (studentResults.length === 0) return 0;
    const totalPercentage = studentResults.reduce((sum, r) => sum + r.percentage, 0);
    return totalPercentage / studentResults.length / 10; // Convert to GPA scale
  };

  const uniqueStudents = Array.from(new Set(results.map(r => r.studentId)));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Results Management
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="Search by Student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              select
              label="Exam"
              SelectProps={{ native: true }}
              defaultValue="all"
            >
              <option value="all">All Exams</option>
              <option value="1">Mid-Term 2024</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" fullWidth startIcon={<Download />}>
              Export Results
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {uniqueStudents.map((studentId) => {
        const studentResults = filteredResults.filter(r => r.studentId === studentId);
        if (studentResults.length === 0) return null;

        const gpa = calculateGPA(studentId);
        const totalMarks = studentResults.reduce((sum, r) => sum + r.marksObtained, 0);
        const totalMaxMarks = studentResults.reduce((sum, r) => sum + r.maxMarks, 0);
        const overallPercentage = (totalMarks / totalMaxMarks) * 100;

        return (
          <Card key={studentId} sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Student ID: {studentId}</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography variant="body1">
                    <strong>GPA:</strong> {gpa.toFixed(2)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Overall:</strong> {overallPercentage.toFixed(1)}%
                  </Typography>
                  <IconButton size="small">
                    <Print />
                  </IconButton>
                </Box>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell align="right">Marks Obtained</TableCell>
                      <TableCell align="right">Max Marks</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                      <TableCell align="center">Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell>{result.subjectId}</TableCell>
                        <TableCell align="right">{result.marksObtained}</TableCell>
                        <TableCell align="right">{result.maxMarks}</TableCell>
                        <TableCell align="right">{result.percentage}%</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={result.grade}
                            color={gradeColors[result.grade] || 'default'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};


