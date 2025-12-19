import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Admissions } from '@/pages/Admissions';
import { Students } from '@/pages/Students';
import { Attendance } from '@/pages/Attendance';
import { Examinations } from '@/pages/Examinations';
import { Results } from '@/pages/Results';
import { Fees } from '@/pages/Fees';
import { Library } from '@/pages/Library';
import { Inventory } from '@/pages/Inventory';
import { Transport } from '@/pages/Transport';
import { HR } from '@/pages/HR';
import { Reports } from '@/pages/Reports';
import { Settings } from '@/pages/Settings';
import { Unauthorized } from '@/pages/Unauthorized';
import { Profile } from '@/pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="students" element={<Students />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="examinations" element={<Examinations />} />
          <Route path="results" element={<Results />} />
          <Route path="fees" element={<Fees />} />
          <Route path="library" element={<Library />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="transport" element={<Transport />} />
          <Route path="hr" element={<HR />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

