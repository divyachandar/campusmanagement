import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  MenuItem,
  TextField,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Download,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const attendanceData = [
  { month: 'Jan', attendance: 95 },
  { month: 'Feb', attendance: 92 },
  { month: 'Mar', attendance: 94 },
  { month: 'Apr', attendance: 91 },
  { month: 'May', attendance: 93 },
];

const feeCollectionData = [
  { month: 'Jan', collected: 450000, pending: 120000 },
  { month: 'Feb', collected: 520000, pending: 95000 },
  { month: 'Mar', collected: 480000, pending: 110000 },
  { month: 'Apr', collected: 550000, pending: 85000 },
];

const studentDistribution = [
  { name: 'Engineering', value: 400 },
  { name: 'Arts', value: 300 },
  { name: 'Science', value: 250 },
  { name: 'Commerce', value: 200 },
];

const examPerformance = [
  { subject: 'Math', average: 85, passRate: 92 },
  { subject: 'Physics', average: 82, passRate: 88 },
  { subject: 'Chemistry', average: 80, passRate: 90 },
  { subject: 'English', average: 88, passRate: 95 },
];

export const Reports: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reportType, setReportType] = useState('attendance');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="attendance">Attendance Report</MenuItem>
              <MenuItem value="academic">Academic Performance</MenuItem>
              <MenuItem value="financial">Financial Report</MenuItem>
              <MenuItem value="admission">Admission Report</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="date" label="From Date" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="date" label="To Date" InputLabelProps={{ shrink: true }} />
          </Grid>
        </Grid>
      </Paper>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Attendance" />
        <Tab label="Academic" />
        <Tab label="Financial" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Monthly Attendance Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Student Distribution by Course
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studentDistribution.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Attendance Analysis
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Exam Performance Analysis
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={examPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="average" fill="#2e7d32" name="Average Marks" />
              <Bar dataKey="passRate" fill="#1976d2" name="Pass Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {tabValue === 3 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Fee Collection Analysis
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={feeCollectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="collected" fill="#2e7d32" name="Collected" />
              <Bar dataKey="pending" fill="#d32f2f" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" startIcon={<Download />}>
          Export PDF
        </Button>
        <Button variant="outlined" startIcon={<Download />}>
          Export Excel
        </Button>
      </Box>
    </Box>
  );
};


