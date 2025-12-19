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
  Receipt,
} from '@mui/icons-material';
import { FeePayment, FeeStructure } from '@/types';
import { format } from 'date-fns';

const mockFeeStructures: FeeStructure[] = [
  {
    id: '1',
    courseId: '1',
    feeType: 'tuition',
    amount: 50000,
    dueDate: '2024-02-01',
    academicYear: '2024-2025',
  },
  {
    id: '2',
    courseId: '1',
    feeType: 'exam',
    amount: 2000,
    dueDate: '2024-03-01',
    academicYear: '2024-2025',
  },
];

const mockPayments: FeePayment[] = [
  {
    id: '1',
    studentId: 'STU-2024-001',
    feeStructureId: '1',
    amount: 50000,
    paymentDate: '2024-01-25',
    paymentMethod: 'online',
    transactionId: 'TXN-001',
    status: 'completed',
    receiptNumber: 'RCP-2024-001',
  },
  {
    id: '2',
    studentId: 'STU-2024-002',
    feeStructureId: '1',
    amount: 50000,
    paymentDate: '2024-01-26',
    paymentMethod: 'cash',
    status: 'completed',
    receiptNumber: 'RCP-2024-002',
  },
];

const statusColors: Record<string, 'success' | 'warning' | 'error'> = {
  completed: 'success',
  pending: 'warning',
  failed: 'error',
};

export const Fees: React.FC = () => {
  const [payments] = useState<FeePayment[]>(mockPayments);
  const [feeStructures] = useState<FeeStructure[]>(mockFeeStructures);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<FeePayment | null>(null);

  const totalCollection = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending').length;

  const handleViewReceipt = (payment: FeePayment) => {
    setSelectedPayment(payment);
    setOpenReceiptDialog(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Fee Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Collection</Typography>
              <Typography variant="h4">₹{totalCollection.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Pending Payments</Typography>
              <Typography variant="h4" color="warning.main">{pendingPayments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Fee Structures</Typography>
              <Typography variant="h4">{feeStructures.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Fee Payments</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenPaymentDialog(true)}>
          Record Payment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Receipt No.</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Fee Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.receiptNumber}</TableCell>
                <TableCell>{payment.studentId}</TableCell>
                <TableCell>
                  {feeStructures.find(f => f.id === payment.feeStructureId)?.feeType || 'N/A'}
                </TableCell>
                <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                <TableCell>{format(new Date(payment.paymentDate), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={statusColors[payment.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleViewReceipt(payment)}>
                    <Receipt />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Record Fee Payment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Student ID" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth select label="Fee Type" defaultValue="">
                {feeStructures.map((fee) => (
                  <MenuItem key={fee.id} value={fee.id}>
                    {fee.feeType} - ₹{fee.amount.toLocaleString()}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="number" label="Amount" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="Payment Date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth select label="Payment Method" defaultValue="cash">
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="cheque">Cheque</MenuItem>
                <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
          <Button variant="contained">Record Payment</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openReceiptDialog} onClose={() => setOpenReceiptDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Fee Receipt</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">COLLEGE MANAGEMENT SYSTEM</Typography>
                <Typography variant="body2" align="center" color="textSecondary">Fee Receipt</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Receipt No.</Typography>
                <Typography variant="body1">{selectedPayment.receiptNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Date</Typography>
                <Typography variant="body1">
                  {format(new Date(selectedPayment.paymentDate), 'MMM dd, yyyy')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">Student ID</Typography>
                <Typography variant="body1">{selectedPayment.studentId}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">Amount</Typography>
                <Typography variant="h6">₹{selectedPayment.amount.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">Payment Method</Typography>
                <Typography variant="body1">{selectedPayment.paymentMethod}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReceiptDialog(false)}>Close</Button>
          <Button variant="contained" startIcon={<Receipt />}>Print Receipt</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


