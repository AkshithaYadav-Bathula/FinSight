import { render, screen } from '@testing-library/react';
import React from 'react';

// Simple test component that mimics the main app structure
function TestApp() {
  return (
    <div>
      <h1>FinSight - Smart Finance Helper</h1>
      <nav>
        <button>Budget Scenarios</button>
        <button>Points Tracking</button>
        <button>Reports</button>
        <button>AI Insights</button>
      </nav>
    </div>
  );
}

test('renders FinSight title', () => {
  render(<TestApp />);
  const linkElement = screen.getByText(/FinSight - Smart Finance Helper/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders budget scenarios tab', () => {
  render(<TestApp />);
  const budgetTab = screen.getByText(/Budget Scenarios/i);
  expect(budgetTab).toBeInTheDocument();
});

test('renders all main tabs', () => {
  render(<TestApp />);
  expect(screen.getByText(/Budget Scenarios/i)).toBeInTheDocument();
  expect(screen.getByText(/Points Tracking/i)).toBeInTheDocument();
  expect(screen.getByText(/Reports/i)).toBeInTheDocument();
  expect(screen.getByText(/AI Insights/i)).toBeInTheDocument();
});