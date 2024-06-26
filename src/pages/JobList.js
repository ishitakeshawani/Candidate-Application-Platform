import React, { useEffect, useState } from 'react';
import { getJobs, useJobs } from '../features/jobSlice';
import { useDispatch } from 'react-redux';
import { Grid, CircularProgress, Typography } from '@mui/material';
import JobCard from '../components/JobCard';
import { filterBy } from '../utils'

export default function JobList() {
    const [offset, setOffset] = useState(0);
    const dispatch = useDispatch();
    const LIMIT = 12;

    // Fetch jobs from API using getJobs
    useEffect(() => {
        const payload = {
            "limit": LIMIT,
            "offset": offset * LIMIT
        };
        dispatch(getJobs(payload));
    }, [dispatch, offset]); // Include offset in dependencies

    // Get jobs, isLoading, numberOfJobs by destructuring using useJobs hook
    const { isLoading, allJobs, selectedFilters, backUpJobs } = useJobs();
    let filteredJobs = filterBy(allJobs,selectedFilters,backUpJobs); // filter jobs by selcted filters

    const fetchMoreJobs = () => {
        setOffset(prevOffset => prevOffset + 1);
    };

    useEffect(() => {
        // handle scroll event
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight) {
                // User reached to the bottom of the page
                fetchMoreJobs();
            }
        };

        // Add scroll event 
        window.addEventListener("scroll", handleScroll);

        // Remove scroll event 
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
    <Grid container spacing={2}>
    {/* show Loader if isLoading */}
      {isLoading ? (
        <Grid container justifyContent="center" style={{ minHeight: '100vh' }}>
          <CircularProgress />
        </Grid>
      ) : 
    // Show jobs if available
    filteredJobs?.length > 0 ? (
      filteredJobs?.map((job, index) => 
        <Grid item key={job.jdUid} xs={12} sm={6} md={4} lg={3}>
            <JobCard job={job}/>
            </Grid>)
            ) : (
              <Grid item xs={12} style={{ minHeight: '100vh' }} container justifyContent="center">
                <Typography variant='h3' component={"h3"}>Can not find jobs!</Typography>
              </Grid>
      )}
    </Grid>
  );
}
