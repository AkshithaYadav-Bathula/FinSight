-- FinSight Database Schema

-- Create database (run this manually)
-- CREATE DATABASE finsight;

-- Budget scenarios table
CREATE TABLE budget_scenarios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    monthly_income DECIMAL(10,2) NOT NULL,
    monthly_expenses DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Points tracking table
CREATE TABLE points_tracking (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    points_used INTEGER NOT NULL,
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_budget_scenarios_created_at ON budget_scenarios(created_at);
CREATE INDEX idx_points_tracking_date ON points_tracking(date);
CREATE INDEX idx_points_tracking_category ON points_tracking(category);

-- Insert sample data
INSERT INTO budget_scenarios (name, description, monthly_income, monthly_expenses) VALUES
('Conservative Budget', 'Basic budget with minimal expenses', 5000.00, 3500.00),
('Aggressive Savings', 'Maximum savings scenario', 5000.00, 2800.00),
('Lifestyle Budget', 'Balanced approach with entertainment', 5000.00, 4200.00);

INSERT INTO points_tracking (category, points_used, description) VALUES
('Food', 250, 'Grocery shopping at supermarket'),
('Transportation', 150, 'Bus pass for the month'),
('Entertainment', 100, 'Movie tickets and dinner'),
('Shopping', 300, 'Clothing and accessories'),
('Utilities', 200, 'Electricity and internet bills');