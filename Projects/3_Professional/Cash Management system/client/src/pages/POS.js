import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, Box, Button, List, ListItem,
  ListItemText, IconButton, Divider, Select, MenuItem, FormControl, InputLabel, Alert
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import axios from 'axios';

const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [shift, setShift] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchActiveShift();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchActiveShift = async () => {
    try {
      const response = await axios.get('/api/shifts/active');
      setShift(response.data);
    } catch (error) {
      console.error('Error fetching shift:', error);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.product_id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.product_id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { product_id: product.id, name: product.name, unit_price: product.price, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item =>
      item.product_id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product_id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  };

  const handleCheckout = async () => {
    if (!shift) {
      setMessage('Please start a shift first');
      return;
    }
    if (cart.length === 0) {
      setMessage('Cart is empty');
      return;
    }

    try {
      await axios.post('/api/orders', {
        items: cart,
        payment_method: paymentMethod,
        shift_id: shift.id
      });
      setCart([]);
      setMessage('Order completed successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error processing order');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Point of Sale</Typography>
      {message && <Alert severity={message.includes('Error') ? 'error' : 'success'} sx={{ mb: 2 }}>{message}</Alert>}
      {!shift && <Alert severity="warning" sx={{ mb: 2 }}>No active shift. Please start a shift first.</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Products</Typography>
            <Grid container spacing={2}>
              {products.map(product => (
                <Grid item xs={6} sm={4} key={product.id}>
                  <Button fullWidth variant="outlined" onClick={() => addToCart(product)}
                    sx={{ height: 80, flexDirection: 'column' }}>
                    <Typography variant="body2">{product.name}</Typography>
                    <Typography variant="caption">${product.price}</Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Cart</Typography>
            <List>
              {cart.map(item => (
                <ListItem key={item.product_id} secondaryAction={
                  <IconButton edge="end" onClick={() => removeFromCart(item.product_id)}><Delete /></IconButton>
                }>
                  <ListItemText primary={item.name} secondary={`$${item.unit_price} x ${item.quantity}`} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <IconButton size="small" onClick={() => updateQuantity(item.product_id, -1)}><Remove /></IconButton>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton size="small" onClick={() => updateQuantity(item.product_id, 1)}><Add /></IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" align="right">Total: ${calculateTotal().toFixed(2)}</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Payment Method</InputLabel>
              <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="card">Card</MenuItem>
                <MenuItem value="wallet">Wallet</MenuItem>
                <MenuItem value="qr">QR Code</MenuItem>
              </Select>
            </FormControl>
            <Button fullWidth variant="contained" size="large" sx={{ mt: 2 }} onClick={handleCheckout}>
              Complete Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default POS;
