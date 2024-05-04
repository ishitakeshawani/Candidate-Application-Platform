import React,{useEffect} from 'react'
import { getJobs, useJobs } from '../features/jobSlice'
import { useDispatch } from "react-redux";

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
    <div>JobList</div>
  )
}
