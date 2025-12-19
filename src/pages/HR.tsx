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
  MenuItem,
} from '@mui/material';
import {
  Add,
  Edit,
  People,
  Work,
  AttachMoney,
} from '@mui/icons-material';

interface Staff {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
}

const mockStaff: Staff[] = [
  {
    id: '1',
    employeeId: 'EMP-001',
    name: 'John Teacher',
    email: 'john.teacher@college.edu',
    phone: '+1234567890',
    department: 'Computer Science',
    designation: 'Professor',
    joinDate: '2020-01-15',
    salary: 80000,
    status: 'active',
  },
  {
    id: '2',
    employeeId: 'EMP-002',
    name: 'Jane Admin',
    email: 'jane.admin@college.edu',
    phone: '+1234567891',
    department: 'Administration',
    designation: 'Administrator',
    joinDate: '2019-06-01',
    salary: 60000,
    status: 'active',
  },
];

export const HR: React.FC = () => {
  const [staff] = useState<Staff[]>(mockStaff);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.status === 'active').length;
  const totalPayroll = staff.reduce((sum, s) => sum + s.salary, 0);

  const handleAdd = () => {
    setSelectedStaff(null);
    setOpenDialog(true);
  };

  const handleEdit = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setOpenDialog(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        HR Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <People sx={{ fontSize: 48, color: 'primary.main' }} />
                <Box>
                  <Typography color="textSecondary">Total Staff</Typography>
                  <Typography variant="h4">{totalStaff}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Work sx={{ fontSize: 48, color: 'success.main' }} />
                <Box>
                  <Typography color="textSecondary">Active Staff</Typography>
                  <Typography variant="h4">{activeStaff}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AttachMoney sx={{ fontSize: 48, color: 'warning.main' }} />
                <Box>
                  <Typography color="textSecondary">Monthly Payroll</Typography>
                  <Typography variant="h4">₹{totalPayroll.toLocaleString()}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Staff Directory</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add Staff
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell>{staffMember.employeeId}</TableCell>
                <TableCell>{staffMember.name}</TableCell>
                <TableCell>{staffMember.email}</TableCell>
                <TableCell>{staffMember.department}</TableCell>
                <TableCell>{staffMember.designation}</TableCell>
                <TableCell>{new Date(staffMember.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>₹{staffMember.salary.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={staffMember.status.replace('_', ' ')}
                    color={
                      staffMember.status === 'active' ? 'success' :
                      staffMember.status === 'on_leave' ? 'warning' : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(staffMember)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedStaff ? 'Edit Staff Member' : 'Add Staff Member'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Employee ID" defaultValue={selectedStaff?.employeeId} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" defaultValue={selectedStaff?.name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" type="email" defaultValue={selectedStaff?.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone" defaultValue={selectedStaff?.phone} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Department" defaultValue={selectedStaff?.department} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Designation" defaultValue={selectedStaff?.designation} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Join Date"
                defaultValue={selectedStaff?.joinDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Salary"
                defaultValue={selectedStaff?.salary}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth select label="Status" defaultValue={selectedStaff?.status || 'active'}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="on_leave">On Leave</MenuItem>
              </TextField>
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


