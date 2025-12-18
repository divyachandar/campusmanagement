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
  Card,
  CardContent,
} from '@mui/material';
import {
  Add,
  Edit,
  DirectionsBus,
  Route,
} from '@mui/icons-material';

interface Route {
  id: string;
  routeName: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  stops: string[];
  capacity: number;
  currentStudents: number;
  status: 'active' | 'inactive';
}

interface StudentTransport {
  id: string;
  studentId: string;
  routeId: string;
  pickupPoint: string;
  fee: number;
  status: 'active' | 'inactive';
}

const mockRoutes: Route[] = [
  {
    id: '1',
    routeName: 'Route A - North Zone',
    vehicleNumber: 'ABC-1234',
    driverName: 'John Driver',
    driverPhone: '+1234567890',
    stops: ['Stop 1', 'Stop 2', 'Stop 3'],
    capacity: 40,
    currentStudents: 35,
    status: 'active',
  },
  {
    id: '2',
    routeName: 'Route B - South Zone',
    vehicleNumber: 'XYZ-5678',
    driverName: 'Jane Driver',
    driverPhone: '+1234567891',
    stops: ['Stop 4', 'Stop 5'],
    capacity: 35,
    currentStudents: 30,
    status: 'active',
  },
];

const mockStudentTransport: StudentTransport[] = [
  {
    id: '1',
    studentId: 'STU-2024-001',
    routeId: '1',
    pickupPoint: 'Stop 1',
    fee: 2000,
    status: 'active',
  },
];

export const Transport: React.FC = () => {
  const [routes] = useState<Route[]>(mockRoutes);
  const [studentTransport] = useState<StudentTransport[]>(mockStudentTransport);
  const [openDialog, setOpenDialog] = useState(false);

  const totalRoutes = routes.length;
  const activeRoutes = routes.filter(r => r.status === 'active').length;
  const totalStudents = studentTransport.filter(st => st.status === 'active').length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Transport Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DirectionsBus sx={{ fontSize: 48, color: 'primary.main' }} />
                <Box>
                  <Typography color="textSecondary">Total Routes</Typography>
                  <Typography variant="h4">{totalRoutes}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Route sx={{ fontSize: 48, color: 'success.main' }} />
                <Box>
                  <Typography color="textSecondary">Active Routes</Typography>
                  <Typography variant="h4">{activeRoutes}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Students Using Transport</Typography>
              <Typography variant="h4">{totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Transport Routes</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
          Add Route
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Route Name</TableCell>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Stops</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Current Students</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>{route.routeName}</TableCell>
                <TableCell>{route.vehicleNumber}</TableCell>
                <TableCell>{route.driverName}</TableCell>
                <TableCell>{route.stops.join(', ')}</TableCell>
                <TableCell>{route.capacity}</TableCell>
                <TableCell>{route.currentStudents}</TableCell>
                <TableCell>
                  <Chip
                    label={route.status}
                    color={route.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Student Transport Assignments</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>Pickup Point</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentTransport.map((st) => (
              <TableRow key={st.id}>
                <TableCell>{st.studentId}</TableCell>
                <TableCell>
                  {routes.find(r => r.id === st.routeId)?.routeName || 'N/A'}
                </TableCell>
                <TableCell>{st.pickupPoint}</TableCell>
                <TableCell>₹{st.fee.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={st.status}
                    color={st.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Transport Route</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Route Name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Vehicle Number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Capacity" type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Driver Name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Driver Phone" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Stops (comma separated)" placeholder="Stop 1, Stop 2, Stop 3" />
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


