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
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  PersonAdd,
} from '@mui/icons-material';
import { Attendance as AttendanceType } from '@/types';
import { format } from 'date-fns';

const mockAttendance: AttendanceType[] = [
  {
    id: '1',
    studentId: 'STU-2024-001',
    date: '2024-01-20',
    status: 'present',
    markedBy: 'staff-1',
  },
  {
    id: '2',
    studentId: 'STU-2024-002',
    date: '2024-01-20',
    status: 'absent',
    markedBy: 'staff-1',
  },
  {
    id: '3',
    studentId: 'STU-2024-003',
    date: '2024-01-20',
    status: 'late',
    markedBy: 'staff-1',
  },
];

const statusColors: Record<string, 'success' | 'error' | 'warning' | 'info'> = {
  present: 'success',
  absent: 'error',
  late: 'warning',
  excused: 'info',
};

export const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [attendance, setAttendance] = useState<AttendanceType[]>(mockAttendance);

  const stats = {
    total: 150,
    present: 138,
    absent: 8,
    late: 4,
    percentage: 92.0,
  };

  const handleStatusChange = (studentId: string, newStatus: AttendanceType['status']) => {
    setAttendance(attendance.map(att =>
      att.studentId === studentId && att.date === selectedDate
        ? { ...att, status: newStatus }
        : att
    ));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Students</Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Present</Typography>
              <Typography variant="h4" color="success.main">{stats.present}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Absent</Typography>
              <Typography variant="h4" color="error.main">{stats.absent}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Attendance %</Typography>
              <Typography variant="h4" color="primary.main">{stats.percentage}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="date"
              label="Select Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Course/Class"
              SelectProps={{ native: true }}
              defaultValue="all"
            >
              <option value="all">All Courses</option>
              <option value="1">Engineering</option>
              <option value="2">Arts</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<PersonAdd />}
            >
              Mark Attendance
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((att) => (
              <TableRow key={att.id}>
                <TableCell>{att.studentId}</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>{format(new Date(att.date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Chip
                    label={att.status}
                    color={statusColors[att.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => handleStatusChange(att.studentId, 'present')}
                  >
                    <CheckCircle />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleStatusChange(att.studentId, 'absent')}
                  >
                    <Cancel />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


