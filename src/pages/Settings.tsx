import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  MenuItem,
} from '@mui/material';
import {
  Save,
  School,
  Security,
  Notifications,
  Payment,
} from '@mui/icons-material';

export const Settings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    institutionName: 'College Management System',
    institutionCode: 'CMS-001',
    address: '123 Education Street, City',
    phone: '+1234567890',
    email: 'info@college.edu',
    website: 'www.college.edu',
    enableNotifications: true,
    enableSMS: false,
    enableEmail: true,
    paymentGateway: 'razorpay',
    currency: 'INR',
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    // In production, this would save to backend
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab icon={<School />} label="Institution" />
        <Tab icon={<Security />} label="Security" />
        <Tab icon={<Notifications />} label="Notifications" />
        <Tab icon={<Payment />} label="Payment" />
      </Tabs>

      {tabValue === 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Institution Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Institution Name"
                value={settings.institutionName}
                onChange={(e) => setSettings({ ...settings, institutionName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Institution Code"
                value={settings.institutionCode}
                onChange={(e) => setSettings({ ...settings, institutionCode: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                value={settings.website}
                onChange={(e) => setSettings({ ...settings, website: e.target.value })}
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={true} />}
                label="Enable Two-Factor Authentication"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={true} />}
                label="Require Strong Passwords"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={false} />}
                label="Enable Session Timeout"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Session Timeout (minutes)"
                defaultValue={30}
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableNotifications}
                    onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                  />
                }
                label="Enable Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableEmail}
                    onChange={(e) => setSettings({ ...settings, enableEmail: e.target.checked })}
                  />
                }
                label="Enable Email Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableSMS}
                    onChange={(e) => setSettings({ ...settings, enableSMS: e.target.checked })}
                  />
                }
                label="Enable SMS Notifications"
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      {tabValue === 3 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Payment Gateway Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Payment Gateway"
                value={settings.paymentGateway}
                onChange={(e) => setSettings({ ...settings, paymentGateway: e.target.value })}
              >
                <MenuItem value="razorpay">Razorpay</MenuItem>
                <MenuItem value="stripe">Stripe</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Currency"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              >
                <MenuItem value="INR">INR (₹)</MenuItem>
                <MenuItem value="USD">USD ($)</MenuItem>
                <MenuItem value="EUR">EUR (€)</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="API Key" type="password" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="API Secret" type="password" />
            </Grid>
          </Grid>
        </Paper>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};


