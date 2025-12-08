import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });

  useEffect(() => {
    fetchBranches();
  }, []);

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
      await axios.post('/api/branches', formData);
      setOpen(false);
      fetchBranches();
      setFormData({ name: '', address: '', phone: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Branches</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Branch</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map(branch => (
              <TableRow key={branch.id}>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.address}</TableCell>
                <TableCell>{branch.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Branch</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} margin="normal" />
          <TextField fullWidth label="Address" value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })} margin="normal" />
          <TextField fullWidth label="Phone" value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Branches;
