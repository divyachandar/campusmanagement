import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  Container,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Payment as PaymentIcon,
  LibraryBooks as LibraryIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Side - Professional Image/Illustration */}
      <Box
        sx={{
          width: { xs: 0, md: '50%' },
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 4 }}>
          <SchoolIcon
            sx={{
              fontSize: 120,
              color: 'white',
              mb: 3,
              opacity: 0.9,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            College Management System
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              fontWeight: 300,
            }}
          >
            Streamline your academic operations with our comprehensive management platform
          </Typography>

          {/* Feature Icons */}
          <Grid container spacing={3} sx={{ mt: 4, maxWidth: 500 }}>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 2,
                  p: 2,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <PeopleIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  Student Management
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 2,
                  p: 2,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <AssessmentIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  Exam & Results
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 2,
                  p: 2,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <PaymentIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  Fee Management
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 2,
                  p: 2,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <LibraryIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  Library System
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <TrendingUpIcon sx={{ color: 'white', fontSize: 30 }} />
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
              Trusted by 1000+ Educational Institutions
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f5f5f5',
          px: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ width: '100%', maxWidth: 450 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <SchoolIcon
                sx={{
                  fontSize: 60,
                  color: 'primary.main',
                  mb: 2,
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to access your account
              </Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 4, bgcolor: 'white', borderRadius: 2 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  Sign In
                </Button>
              </Box>
            </Paper>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Demo Credentials:
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Admin: admin@college.edu / admin123
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Staff: staff@college.edu / staff123
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Student: student@college.edu / student123
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};


