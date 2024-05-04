import React,{useEffect} from 'react'
import { getJobs, useJobs } from '../features/jobSlice'
import { useDispatch } from "react-redux";
import { Grid, CircularProgress } from '@mui/material';

export default function JobList() {
    const dispatch = useDispatch();
    // fetch jobs from API using getJobs
    useEffect(() => {
      dispatch(getJobs());
    }, [dispatch]);
    const payload = {
        "limit":20,
        "offset":21
    }
    // get jobs, isLoading, numberOfJobs by Destructuring using useJobs hook
    const { jobs, isLoading, numberOfJobs } = useJobs(payload);
    console.log(jobs, isLoading, numberOfJobs);
    
  return (
    <Grid container spacing={2}>
    {/* show Loader if isLoading */}
      {isLoading ? (
        <Grid container justifyContent="center" style={{ minHeight: '100vh' }}>
          <CircularProgress />
        </Grid>
      ) : 
    // Show jobs if available
      jobs?.length > 0 ? (
        jobs?.map((job, index) => 
        <Grid item key={job.jdUid} xs={12} sm={6} md={4} lg={3}>
            <h1>{job.companyName}</h1>
            </Grid>)
      ) : (
        "Can not find jobs!"
      )}
    </Grid>
  );
}
