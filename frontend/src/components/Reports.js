import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper
} from '@mui/material';
import {
  Assessment,
  AccountBalance,
  Star,
  TrendingUp
} from '@mui/icons-material';
import { reportsService } from '../services/api';

function Reports() {
  const [summary, setSummary] = useState({
    totalBudgetScenarios: 0,
    totalPointsUsed: 0,
    recentTransactions: 0
  });

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const response = await reportsService.getSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  };

  const reportCards = [
    {
      title: 'Budget Scenarios',
      value: summary.totalBudgetScenarios,
      icon: <AccountBalance color="primary" sx={{ fontSize: 40 }} />,
      description: 'Total budget scenarios created'
    },
    {
      title: 'Points Used',
      value: summary.totalPointsUsed,
      icon: <Star color="warning" sx={{ fontSize: 40 }} />,
      description: 'Total points used across all categories'
    },
    {
      title: 'Recent Transactions',
      value: summary.recentTransactions,
      icon: <TrendingUp color="success" sx={{ fontSize: 40 }} />,
      description: 'Transactions in the last 30 days'
    }
  ];

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Assessment color="primary" />
        <Typography variant="h4">Financial Reports</Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" paragraph>
        Get insights into your financial activities and track your progress over time.
      </Typography>

      <Grid container spacing={3}>
        {reportCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  {card.icon}
                  <Typography variant="h6">
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="h3" color="primary" gutterBottom>
                  {card.value.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Financial Overview
        </Typography>
        <Typography variant="body1" paragraph>
          Your financial tracking shows {summary.totalBudgetScenarios} budget scenarios 
          with {summary.totalPointsUsed} total points used. You've been active with{' '}
          {summary.recentTransactions} transactions in the last 30 days.
        </Typography>
        
        {summary.recentTransactions > 0 && (
          <Typography variant="body2" color="text.secondary">
            Keep up the good work tracking your expenses! Regular monitoring helps 
            maintain better financial habits.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Reports;