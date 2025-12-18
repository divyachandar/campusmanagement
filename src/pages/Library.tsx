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
  Book,
  Person,
  CheckCircle,
} from '@mui/icons-material';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  status: 'available' | 'issued' | 'reserved';
}

interface BookIssue {
  id: string;
  bookId: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'returned' | 'overdue';
}

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    category: 'Computer Science',
    totalCopies: 10,
    availableCopies: 7,
    status: 'available',
  },
  {
    id: '2',
    title: 'The Art of Computer Programming',
    author: 'Donald E. Knuth',
    isbn: '978-0201896831',
    category: 'Computer Science',
    totalCopies: 5,
    availableCopies: 2,
    status: 'available',
  },
];

const mockIssues: BookIssue[] = [
  {
    id: '1',
    bookId: '1',
    studentId: 'STU-2024-001',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'issued',
  },
];

export const Library: React.FC = () => {
  const [books] = useState<Book[]>(mockBooks);
  const [issues] = useState<BookIssue[]>(mockIssues);
  const [openIssueDialog, setOpenIssueDialog] = useState(false);

  const totalBooks = books.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableBooks = books.reduce((sum, book) => sum + book.availableCopies, 0);
  const issuedBooks = issues.filter(i => i.status === 'issued').length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Library Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Book sx={{ fontSize: 48, color: 'primary.main' }} />
                <Box>
                  <Typography color="textSecondary">Total Books</Typography>
                  <Typography variant="h4">{totalBooks}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ fontSize: 48, color: 'success.main' }} />
                <Box>
                  <Typography color="textSecondary">Available</Typography>
                  <Typography variant="h4">{availableBooks}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Person sx={{ fontSize: 48, color: 'warning.main' }} />
                <Box>
                  <Typography color="textSecondary">Issued</Typography>
                  <Typography variant="h4">{issuedBooks}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Book Inventory</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add Book
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Total Copies</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.totalCopies}</TableCell>
                <TableCell>{book.availableCopies}</TableCell>
                <TableCell>
                  <Chip
                    label={book.status}
                    color={book.status === 'available' ? 'success' : 'default'}
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
        <Typography variant="h5">Book Issues</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenIssueDialog(true)}>
          Issue Book
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  {books.find(b => b.id === issue.bookId)?.title || 'N/A'}
                </TableCell>
                <TableCell>{issue.studentId}</TableCell>
                <TableCell>{new Date(issue.issueDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(issue.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={issue.status}
                    color={
                      issue.status === 'returned' ? 'success' :
                      issue.status === 'overdue' ? 'error' : 'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">
                    Return
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openIssueDialog} onClose={() => setOpenIssueDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Issue Book</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth select label="Select Book" defaultValue="">
                {books.filter(b => b.availableCopies > 0).map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.title} - Available: {book.availableCopies}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Student ID" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="Issue Date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="Due Date" InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIssueDialog(false)}>Cancel</Button>
          <Button variant="contained">Issue Book</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

