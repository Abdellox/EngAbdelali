import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import axios from 'axios';

const Inventory = () => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('add');
  const [formData, setFormData] = useState({
    product_id: '', quantity: '', unit_cost: '', reason: ''
  });

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/inventory/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const endpoint = type === 'add' ? '/api/inventory/add' : '/api/inventory/waste';
      await axios.post(endpoint, formData);
      setOpen(false);
      fetchTransactions();
      setFormData({ product_id: '', quantity: '', unit_cost: '', reason: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Inventory Management</Typography>
        <Box>
          <Button variant="contained" onClick={() => { setType('add'); setOpen(true); }} sx={{ mr: 1 }}>
            Add Stock
          </Button>
          <Button variant="outlined" color="error" onClick={() => { setType('waste'); setOpen(true); }}>
            Record Waste
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(tx => (
              <TableRow key={tx.id}>
                <TableCell>{new Date(tx.created_at).toLocaleString()}</TableCell>
                <TableCell>{tx.product_name}</TableCell>
                <TableCell>{tx.transaction_type}</TableCell>
                <TableCell>{tx.quantity}</TableCell>
                <TableCell>{tx.user_name}</TableCell>
                <TableCell>{tx.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{type === 'add' ? 'Add Stock' : 'Record Waste'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Product</InputLabel>
            <Select value={formData.product_id} onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}>
              {products.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField fullWidth label="Quantity" type="number" value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} margin="normal" />
          {type === 'add' && (
            <TextField fullWidth label="Unit Cost" type="number" value={formData.unit_cost}
              onChange={(e) => setFormData({ ...formData, unit_cost: e.target.value })} margin="normal" />
          )}
          <TextField fullWidth label="Reason" value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })} margin="normal" multiline rows={2} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory;
