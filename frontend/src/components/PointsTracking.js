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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  MenuItem
} from '@mui/material';
import { Add as AddIcon, Star } from '@mui/icons-material';
import { pointsService } from '../services/api';

const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Utilities', 'Healthcare', 'Other'];

function PointsTracking() {
  const [points, setPoints] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    points_used: '',
    description: ''
  });

  useEffect(() => {
    loadPoints();
  }, []);

  const loadPoints = async () => {
    try {
      const response = await pointsService.getPoints();
      setPoints(response.data);
    } catch (error) {
      console.error('Error loading points:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await pointsService.addPoints({
        ...formData,
        points_used: parseInt(formData.points_used)
      });
      setOpen(false);
      setFormData({ category: '', points_used: '', description: '' });
      loadPoints();
    } catch (error) {
      console.error('Error adding points entry:', error);
    }
  };

  const totalPoints = points.reduce((sum, point) => sum + parseInt(point.points_used), 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'primary',
      'Transportation': 'secondary',
      'Entertainment': 'success',
      'Shopping': 'warning',
      'Utilities': 'info',
      'Healthcare': 'error',
      'Other': 'default'
    };
    return colors[category] || 'default';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Points Tracking</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Entry
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <Star color="primary" />
            <Typography variant="h6">
              Total Points Used: {totalPoints}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Points Used</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points.map((point) => (
              <TableRow key={point.id}>
                <TableCell>{formatDate(point.date)}</TableCell>
                <TableCell>
                  <Chip
                    label={point.category}
                    color={getCategoryColor(point.category)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{point.points_used}</TableCell>
                <TableCell>{point.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Points Entry</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            variant="outlined"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            sx={{ mb: 2 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Points Used"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.points_used}
            onChange={(e) => setFormData({ ...formData, points_used: e.target.value })}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Entry
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PointsTracking;