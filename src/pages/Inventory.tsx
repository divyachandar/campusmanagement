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
  Inventory as InventoryIcon,
  Warning,
} from '@mui/icons-material';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  supplier: string;
  lastRestocked: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const mockItems: InventoryItem[] = [
  {
    id: '1',
    name: 'A4 Paper',
    category: 'Stationery',
    quantity: 500,
    unit: 'reams',
    minStock: 100,
    supplier: 'ABC Supplies',
    lastRestocked: '2024-01-10',
    status: 'in_stock',
  },
  {
    id: '2',
    name: 'Lab Equipment Set',
    category: 'Equipment',
    quantity: 15,
    unit: 'sets',
    minStock: 20,
    supplier: 'XYZ Equipment',
    lastRestocked: '2024-01-05',
    status: 'low_stock',
  },
];

export const Inventory: React.FC = () => {
  const [items] = useState<InventoryItem[]>(mockItems);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const totalItems = items.length;
  const lowStockItems = items.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length;
  const totalValue = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdd = () => {
    setSelectedItem(null);
    setOpenDialog(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <InventoryIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Box>
                  <Typography color="textSecondary">Total Items</Typography>
                  <Typography variant="h4">{totalItems}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Warning sx={{ fontSize: 48, color: 'warning.main' }} />
                <Box>
                  <Typography color="textSecondary">Low Stock Items</Typography>
                  <Typography variant="h4" color="warning.main">{lowStockItems}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Total Quantity</Typography>
              <Typography variant="h4">{totalValue}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Inventory Items</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add Item
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Min Stock</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.minStock}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>
                  <Chip
                    label={item.status.replace('_', ' ')}
                    color={
                      item.status === 'in_stock' ? 'success' :
                      item.status === 'low_stock' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(item)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedItem ? 'Edit Inventory Item' : 'Add Inventory Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Item Name" defaultValue={selectedItem?.name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Category" defaultValue={selectedItem?.category} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Unit" defaultValue={selectedItem?.unit} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                defaultValue={selectedItem?.quantity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Min Stock"
                defaultValue={selectedItem?.minStock}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Supplier" defaultValue={selectedItem?.supplier} />
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


