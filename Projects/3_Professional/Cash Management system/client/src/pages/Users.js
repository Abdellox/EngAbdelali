import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', full_name: '', role: 'cashier', branch_id: ''
  });

  useEffect(() => {
    fetchUsers();
    fetchBranches();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get('/api/branches');
      setBranches(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/users', formData);
      setOpen(false);
      fetchUsers();
      setFormData({ email: '', password: '', full_name: '', role: 'cashier', branch_id: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add User</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.is_active ? 'Active' : 'Inactive'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Full Name" value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} margin="normal" />
          <TextField fullWidth label="Email" type="email" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} margin="normal" />
          <TextField fullWidth label="Password" type="password" value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="cashier">Cashier</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Branch</InputLabel>
            <Select value={formData.branch_id} onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })}>
              {branches.map(b => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
