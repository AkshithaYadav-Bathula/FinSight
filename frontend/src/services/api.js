import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const budgetService = {
  getScenarios: () => api.get('/budget-scenarios'),
  createScenario: (data) => api.post('/budget-scenarios', data),
};

export const pointsService = {
  getPoints: () => api.get('/points'),
  addPoints: (data) => api.post('/points', data),
};

export const reportsService = {
  getSummary: () => api.get('/reports/summary'),
};

export const insightsService = {
  getInsights: () => api.get('/insights'),
};

export default api;