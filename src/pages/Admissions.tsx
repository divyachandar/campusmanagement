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
  Visibility,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { AdmissionApplication } from '@/types';

const mockApplications: AdmissionApplication[] = [
  {
    id: '1',
    applicationNumber: 'APP-2024-001',
    studentName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    courseId: '1',
    campusId: '1',
    status: 'applied',
    appliedDate: '2024-01-15',
    documents: ['certificate.pdf', 'photo.jpg'],
  },
  {
    id: '2',
    applicationNumber: 'APP-2024-002',
    studentName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567891',
    courseId: '2',
    campusId: '1',
    status: 'verified',
    appliedDate: '2024-01-16',
    documents: ['certificate.pdf'],
  },
  {
    id: '3',
    applicationNumber: 'APP-2024-003',
    studentName: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1234567892',
    courseId: '1',
    campusId: '1',
    status: 'shortlisted',
    appliedDate: '2024-01-17',
    documents: ['certificate.pdf', 'id.pdf'],
  },
];

const statusColors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  applied: 'default',
  verified: 'primary',
  shortlisted: 'warning',
  admitted: 'success',
  rejected: 'error',
};

export const Admissions: React.FC = () => {
  const [applications, setApplications] = useState<AdmissionApplication[]>(mockApplications);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<AdmissionApplication | null>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');

  const handleStatusChange = (id: string, newStatus: AdmissionApplication['status']) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const handleView = (app: AdmissionApplication) => {
    setSelectedApplication(app);
    setViewMode('view');
    setOpenDialog(true);
  };

  const handleEdit = (app: AdmissionApplication) => {
    setSelectedApplication(app);
    setViewMode('edit');
    setOpenDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Admission Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedApplication(null);
            setViewMode('edit');
            setOpenDialog(true);
          }}
        >
          New Application
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Application No.</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Applied Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.applicationNumber}</TableCell>
                <TableCell>{app.studentName}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{app.phone}</TableCell>
                <TableCell>Course {app.courseId}</TableCell>
                <TableCell>{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={app.status}
                    color={statusColors[app.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleView(app)}>
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEdit(app)}>
                    <Edit />
                  </IconButton>
                  {app.status === 'verified' && (
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => handleStatusChange(app.id, 'shortlisted')}
                    >
                      <CheckCircle />
                    </IconButton>
                  )}
                  {app.status === 'shortlisted' && (
                    <>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleStatusChange(app.id, 'admitted')}
                      >
                        <CheckCircle />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleStatusChange(app.id, 'rejected')}
                      >
                        <Cancel />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {viewMode === 'view' ? 'View Application' : selectedApplication ? 'Edit Application' : 'New Application'}
        </DialogTitle>
        <DialogContent>
          {viewMode === 'view' && selectedApplication ? (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Application Number</Typography>
                <Typography variant="body1">{selectedApplication.applicationNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Student Name</Typography>
                <Typography variant="body1">{selectedApplication.studentName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Email</Typography>
                <Typography variant="body1">{selectedApplication.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Phone</Typography>
                <Typography variant="body1">{selectedApplication.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Status</Typography>
                <Chip label={selectedApplication.status} color={statusColors[selectedApplication.status]} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">Documents</Typography>
                {selectedApplication.documents.map((doc, idx) => (
                  <Chip key={idx} label={doc} sx={{ mr: 1, mt: 1 }} />
                ))}
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Student Name" defaultValue={selectedApplication?.studentName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" type="email" defaultValue={selectedApplication?.email} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" defaultValue={selectedApplication?.phone} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Course" defaultValue={selectedApplication?.courseId}>
                  <MenuItem value="1">Engineering</MenuItem>
                  <MenuItem value="2">Arts</MenuItem>
                  <MenuItem value="3">Science</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Status" defaultValue={selectedApplication?.status || 'applied'}>
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="verified">Verified</MenuItem>
                  <MenuItem value="shortlisted">Shortlisted</MenuItem>
                  <MenuItem value="admitted">Admitted</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          {viewMode === 'edit' && <Button variant="contained">Save</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
};


