import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';
import BudgetScenarios from './components/BudgetScenarios';
import PointsTracking from './components/PointsTracking';
import Reports from './components/Reports';
import Insights from './components/Insights';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FinSight - Smart Finance Helper
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="FinSight tabs">
            <Tab label="Budget Scenarios" />
            <Tab label="Points Tracking" />
            <Tab label="Reports" />
            <Tab label="AI Insights" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <BudgetScenarios />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <PointsTracking />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Reports />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Insights />
        </TabPanel>
      </Container>
    </ThemeProvider>
  );
}

export default App;