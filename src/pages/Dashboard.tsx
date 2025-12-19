import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  People,
  School,
  Assessment,
  Payment,
  Assignment,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
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

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box sx={{ color, fontSize: 48 }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data
  const stats = {
    totalStudents: 1250,
    totalStaff: 85,
    totalCourses: 12,
    pendingApplications: 45,
    attendanceToday: 92.5,
    feeCollection: 1250000,
  };

  const attendanceData = [
    { name: 'Mon', attendance: 95 },
    { name: 'Tue', attendance: 92 },
    { name: 'Wed', attendance: 94 },
    { name: 'Thu', attendance: 91 },
    { name: 'Fri', attendance: 93 },
    { name: 'Sat', attendance: 90 },
  ];

  const feeData = [
    { month: 'Jan', collected: 450000, pending: 120000 },
    { month: 'Feb', collected: 520000, pending: 95000 },
    { month: 'Mar', collected: 480000, pending: 110000 },
    { month: 'Apr', collected: 550000, pending: 85000 },
  ];

  const courseDistribution = [
    { name: 'Engineering', value: 400 },
    { name: 'Arts', value: 300 },
    { name: 'Science', value: 250 },
    { name: 'Commerce', value: 200 },
    { name: 'Others', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Here's an overview of your institution
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<People />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Staff"
            value={stats.totalStaff}
            icon={<School />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={<Assignment />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Pending Applications"
            value={stats.pendingApplications}
            icon={<School />}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Today's Attendance"
            value={`${stats.attendanceToday}%`}
            icon={<Assessment />}
            color="#0288d1"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Fee Collection (₹)"
            value={stats.feeCollection.toLocaleString()}
            icon={<Payment />}
            color="#388e3c"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Attendance Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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
              Fee Collection Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feeData}>
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
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Student Distribution by Course
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};


