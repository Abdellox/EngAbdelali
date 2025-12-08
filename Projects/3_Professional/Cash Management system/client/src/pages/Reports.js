import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, TextField } from '@mui/material';
import axios from 'axios';

const Reports = () => {
  const [profitLoss, setProfitLoss] = useState({ revenue: 0, expenses: 0, profit: 0 });
  const [bestSellers, setBestSellers] = useState([]);
  const [dateRange, setDateRange] = useState({
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const fetchReports = async () => {
    try {
      const plResponse = await axios.get('/api/reports/profit-loss', { params: dateRange });
      setProfitLoss(plResponse.data);

      const bsResponse = await axios.get('/api/reports/best-sellers');
      setBestSellers(bsResponse.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Reports & Analytics</Typography>
      <Box mb={3}>
        <TextField label="Start Date" type="date" value={dateRange.start_date}
          onChange={(e) => setDateRange({ ...dateRange, start_date: e.target.value })} sx={{ mr: 2 }} />
        <TextField label="End Date" type="date" value={dateRange.end_date}
          onChange={(e) => setDateRange({ ...dateRange, end_date: e.target.value })} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4" color="success.main">${parseFloat(profitLoss.revenue).toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Expenses</Typography>
            <Typography variant="h4" color="error.main">${parseFloat(profitLoss.expenses).toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Profit</Typography>
            <Typography variant="h4" color={profitLoss.profit >= 0 ? 'success.main' : 'error.main'}>
              ${parseFloat(profitLoss.profit).toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Best Selling Products (Last 30 Days)</Typography>
            {bestSellers.map((item, index) => (
              <Box key={index} display="flex" justifyContent="space-between" py={1}>
                <Typography>{item.name}</Typography>
                <Typography>Sold: {item.total_sold} | Revenue: ${parseFloat(item.total_revenue).toFixed(2)}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
