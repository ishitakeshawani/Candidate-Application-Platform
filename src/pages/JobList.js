import React, { useEffect, useState } from 'react';
import { getJobs, useJobs } from '../features/jobSlice';
import { useDispatch } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import JobCard from '../components/JobCard';

export default function JobList() {
    const [offset, setOffset] = useState(0);
    const dispatch = useDispatch();

    // Fetch jobs from API using getJobs
    useEffect(() => {
        const payload = {
            "limit": 10,
            "offset": offset * 10
        };
        dispatch(getJobs(payload));
    }, [dispatch, offset]); // Include offset in dependencies

    // Get jobs, isLoading, numberOfJobs by destructuring using useJobs hook
    const { jobs, isLoading, numberOfJobs, allJobs } = useJobs();
    console.log(jobs, isLoading, numberOfJobs);


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
      allJobs?.length > 0 ? (
        allJobs?.map((job, index) => 
        <Grid item key={job.jdUid} xs={12} sm={6} md={4} lg={3}>
            <JobCard job={job}/>
            </Grid>)
            ) : (
        <h1 sx={{margin: 'auto'}}>Can not find jobs!</h1>
      )}
    </Grid>
  );
}
