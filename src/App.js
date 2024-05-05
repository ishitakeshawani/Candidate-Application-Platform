import './App.css';
import Box from '@mui/material/Box';
import JobList from './pages/JobList';
import FilterList from './pages/FilterList';

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        padding: "1rem",
        gap: '3rem'
      }}
    >
      <h3>Search jobs</h3>
      <FilterList />
      <JobList />
    </Box>
  );
}

export default App;
