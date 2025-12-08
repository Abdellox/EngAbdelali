import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert
} from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '', sku: '', price: '', cost: '', stock_quantity: '', min_stock_level: '', unit: 'pcs'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/products', formData);
      setMessage('Product created successfully');
      setOpen(false);
      fetchProducts();
      setFormData({ name: '', sku: '', price: '', cost: '', stock_quantity: '', min_stock_level: '', unit: 'pcs' });
    } catch (error) {
      setMessage('Error creating product');
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </Box>
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Min Level</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>{product.min_stock_level}</TableCell>
                <TableCell>
                  {product.stock_quantity <= product.min_stock_level ? 
                    <span style={{ color: 'red' }}>Low Stock</span> : 'OK'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} margin="normal" />
          <TextField fullWidth label="SKU" value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })} margin="normal" />
          <TextField fullWidth label="Price" type="number" value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })} margin="normal" />
          <TextField fullWidth label="Cost" type="number" value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })} margin="normal" />
          <TextField fullWidth label="Stock Quantity" type="number" value={formData.stock_quantity}
            onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })} margin="normal" />
          <TextField fullWidth label="Min Stock Level" type="number" value={formData.min_stock_level}
            onChange={(e) => setFormData({ ...formData, min_stock_level: e.target.value })} margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
