import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import { TrendingUp, ShoppingCart, Warning, AttachMoney } from '@mui/icons-material';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    today_sales: 0,
    order_count: 0,
    low_stock_count: 0,
    today_expenses: 0,
    active_shifts: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get('/api/reports/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" gutterBottom>{title}</Typography>
            <Typography variant="h4">{value}</Typography>
          </Box>
          <Box sx={{ color, fontSize: 48 }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Today's Sales" value={`$${parseFloat(stats.today_sales).toFixed(2)}`}
            icon={<TrendingUp />} color="success.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Orders Today" value={stats.order_count}
            icon={<ShoppingCart />} color="primary.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Low Stock Items" value={stats.low_stock_count}
            icon={<Warning />} color="warning.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Today's Expenses" value={`$${parseFloat(stats.today_expenses).toFixed(2)}`}
            icon={<AttachMoney />} color="error.main" />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Typography>Active Shifts: {stats.active_shifts}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
