require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'finsight',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FinSight API is running' });
});

// Budget scenarios endpoints
app.get('/api/budget-scenarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM budget_scenarios ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching budget scenarios:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/budget-scenarios', async (req, res) => {
  try {
    const { name, description, monthly_income, monthly_expenses } = req.body;
    const result = await pool.query(
      'INSERT INTO budget_scenarios (name, description, monthly_income, monthly_expenses) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, monthly_income, monthly_expenses]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating budget scenario:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Points tracking endpoints
app.get('/api/points', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM points_tracking ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching points:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/points', async (req, res) => {
  try {
    const { category, points_used, description } = req.body;
    const result = await pool.query(
      'INSERT INTO points_tracking (category, points_used, description) VALUES ($1, $2, $3) RETURNING *',
      [category, points_used, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding points entry:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reports endpoint
app.get('/api/reports/summary', async (req, res) => {
  try {
    const budgetCount = await pool.query('SELECT COUNT(*) FROM budget_scenarios');
    const totalPoints = await pool.query('SELECT SUM(points_used) as total FROM points_tracking');
    const recentTransactions = await pool.query('SELECT COUNT(*) FROM points_tracking WHERE date >= NOW() - INTERVAL \'30 days\'');
    
    res.json({
      totalBudgetScenarios: parseInt(budgetCount.rows[0].count),
      totalPointsUsed: parseInt(totalPoints.rows[0].total) || 0,
      recentTransactions: parseInt(recentTransactions.rows[0].count)
    });
  } catch (err) {
    console.error('Error generating summary report:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// AI insights endpoint (mock implementation)
app.get('/api/insights', async (req, res) => {
  try {
    const insights = [
      {
        type: 'spending',
        message: 'Your points usage has increased by 15% this month. Consider reviewing your spending categories.',
        priority: 'medium'
      },
      {
        type: 'budget',
        message: 'Based on your current scenarios, you could save an additional $200 by optimizing food expenses.',
        priority: 'high'
      },
      {
        type: 'trend',
        message: 'Your financial habits show consistent improvement over the past 3 months.',
        priority: 'low'
      }
    ];
    res.json(insights);
  } catch (err) {
    console.error('Error generating insights:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`FinSight API server running on port ${PORT}`);
  });
}

module.exports = app;