import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mr: 2 }}>
            {user?.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Role: {user?.role?.replace('_', ' ').toUpperCase()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Name" defaultValue={user?.name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" type="email" defaultValue={user?.email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Department" />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<Save />}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};


