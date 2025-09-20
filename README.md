# FinSight

A smart finance helper that lets users simulate budget scenarios, track points-based usage, generate reports, and get AI-like insights. Built with React frontend, Node.js backend, PostgreSQL database, and optional Pathway live data integration.

## Features

### 🏦 Budget Scenario Simulation
- Create and manage multiple budget scenarios
- Compare income vs expenses
- Calculate monthly savings potential
- Visual savings indicators

### ⭐ Points-Based Usage Tracking
- Track spending across categories (Food, Transportation, Entertainment, etc.)
- Monitor points usage over time
- Categorize and describe transactions
- Visual category management with color coding

### 📊 Financial Reports
- Comprehensive dashboard with key metrics
- Total budget scenarios overview
- Points usage analytics
- Recent transaction tracking (30-day window)
- Financial activity insights

### 🤖 AI-Like Insights
- Personalized spending recommendations
- Budget optimization suggestions
- Trend analysis and alerts
- Priority-based insight system

## Tech Stack

- **Frontend**: React 18, Material-UI, Chart.js, Axios
- **Backend**: Node.js, Express.js, JWT authentication
- **Database**: PostgreSQL with structured schema
- **Architecture**: REST API, Component-based UI
- **Development**: Hot reload, environment configurations

## Project Structure

```
FinSight/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service layer
│   │   ├── App.js           # Main app component
│   │   └── index.js         # App entry point
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js API server
│   ├── server.js           # Express server
│   └── package.json
├── database/               # Database schema
│   └── schema.sql         # PostgreSQL schema
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### 1. Database Setup

```bash
# Install PostgreSQL and create database
createdb finsight

# Run the schema
psql -d finsight -f database/schema.sql
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=finsight
# DB_USER=postgres
# DB_PASSWORD=your_password

# Start development server
npm run dev
```

The backend API will be running on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env if needed (default points to localhost:5000)
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start
```

The frontend will be running on `http://localhost:3000`

## API Endpoints

### Budget Scenarios
- `GET /api/budget-scenarios` - Get all scenarios
- `POST /api/budget-scenarios` - Create new scenario

### Points Tracking
- `GET /api/points` - Get all points entries
- `POST /api/points` - Add new points entry

### Reports
- `GET /api/reports/summary` - Get summary statistics

### Insights
- `GET /api/insights` - Get AI-generated insights

## Development

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

### Building for Production
```bash
# Build frontend
cd frontend && npm run build

# Backend runs directly with Node.js
cd backend && npm start
```

## Usage

1. **Create Budget Scenarios**: Add different financial scenarios with income and expense projections
2. **Track Points Usage**: Log your spending across different categories using a points system
3. **View Reports**: Monitor your financial health through comprehensive dashboards
4. **Get AI Insights**: Receive personalized recommendations based on your financial data

## Future Enhancements

- Pathway live data integration for real-time financial data
- Advanced charting and visualizations
- User authentication and multi-user support
- Mobile-responsive design improvements
- Export functionality for reports
- Integration with banking APIs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
