import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  Chip
} from '@mui/material';
import { Add as AddIcon, TrendingUp } from '@mui/icons-material';
import { budgetService } from '../services/api';

function BudgetScenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    monthly_income: '',
    monthly_expenses: ''
  });

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const response = await budgetService.getScenarios();
      setScenarios(response.data);
    } catch (error) {
      console.error('Error loading scenarios:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await budgetService.createScenario({
        ...formData,
        monthly_income: parseFloat(formData.monthly_income),
        monthly_expenses: parseFloat(formData.monthly_expenses)
      });
      setOpen(false);
      setFormData({ name: '', description: '', monthly_income: '', monthly_expenses: '' });
      loadScenarios();
    } catch (error) {
      console.error('Error creating scenario:', error);
    }
  };

  const calculateSavings = (income, expenses) => {
    return income - expenses;
  };

  const getSavingsColor = (savings) => {
    if (savings > 0) return 'success';
    if (savings < 0) return 'error';
    return 'warning';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Budget Scenarios</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Create Scenario
        </Button>
      </Box>

      <Grid container spacing={3}>
        {scenarios.map((scenario) => {
          const savings = calculateSavings(parseFloat(scenario.monthly_income), parseFloat(scenario.monthly_expenses));
          return (
            <Grid item xs={12} md={6} key={scenario.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {scenario.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {scenario.description}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="body1">
                      <strong>Income:</strong> ${scenario.monthly_income}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Expenses:</strong> ${scenario.monthly_expenses}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TrendingUp />
                    <Typography variant="body1">
                      <strong>Monthly Savings:</strong>
                    </Typography>
                    <Chip
                      label={`$${savings.toFixed(2)}`}
                      color={getSavingsColor(savings)}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Budget Scenario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Scenario Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Monthly Income"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.monthly_income}
            onChange={(e) => setFormData({ ...formData, monthly_income: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Monthly Expenses"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.monthly_expenses}
            onChange={(e) => setFormData({ ...formData, monthly_expenses: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BudgetScenarios;