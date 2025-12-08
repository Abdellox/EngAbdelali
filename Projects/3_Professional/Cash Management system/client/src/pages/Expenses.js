import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '', amount: '', description: '', expense_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/expenses', formData);
      setOpen(false);
      fetchExpenses();
      setFormData({ category: '', amount: '', description: '', expense_date: new Date().toISOString().split('T')[0] });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const categories = ['Supplies', 'Utilities', 'Salaries', 'Rent', 'Maintenance', 'Marketing', 'Other'];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Expenses</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add Expense
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Added By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(expense => (
              <TableRow key={expense.id}>
                <TableCell>{new Date(expense.expense_date).toLocaleDateString()}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.user_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField fullWidth label="Amount" type="number" value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })} margin="normal" />
          <TextField fullWidth label="Description" value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} margin="normal" multiline rows={2} />
          <TextField fullWidth label="Date" type="date" value={formData.expense_date}
            onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })} margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Expenses;
