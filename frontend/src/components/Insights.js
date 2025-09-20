import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  AlertTitle,
  Chip,
  Grid
} from '@mui/material';
import {
  Psychology,
  TrendingUp,
  Warning,
  Info
} from '@mui/icons-material';
import { insightsService } from '../services/api';

function Insights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const response = await insightsService.getInsights();
      setInsights(response.data);
    } catch (error) {
      console.error('Error loading insights:', error);
    }
  };

  const getInsightSeverity = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'info';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'spending': return <Warning />;
      case 'budget': return <TrendingUp />;
      case 'trend': return <Info />;
      default: return <Psychology />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Psychology color="primary" />
        <Typography variant="h4">AI-Powered Insights</Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" paragraph>
        Get personalized recommendations and insights based on your financial data.
      </Typography>

      <Grid container spacing={3}>
        {insights.map((insight, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Alert
                  severity={getInsightSeverity(insight.priority)}
                  icon={getInsightIcon(insight.type)}
                  sx={{ mb: 2 }}
                >
                  <AlertTitle sx={{ textTransform: 'capitalize' }}>
                    {insight.type} Insight
                  </AlertTitle>
                  {insight.message}
                </Alert>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Chip
                    label={`${insight.priority} priority`}
                    color={getPriorityColor(insight.priority)}
                    size="small"
                    variant="outlined"
                  />
                  <Typography variant="caption" color="text.secondary">
                    AI-Generated Insight
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {insights.length === 0 && (
        <Card>
          <CardContent>
            <Box textAlign="center" py={4}>
              <Psychology sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No insights available yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add more budget scenarios and track your points usage to get 
                personalized AI insights.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default Insights;