import React from "react";
import Filter from "../components/Filter";
import {Box} from "@mui/material";
import { useJobs } from '../features/jobSlice';

export default function FilterList() {
const { allJobs } = useJobs();

// Created list of filters with options
  let listOfFilters = [
    {
      name: "Min experience",
      options: Array.from(new Set(allJobs
        .map((job) => job.minExp) 
        .filter((minExp) => minExp !== null)
        .sort(function(a, b) {
            return a - b;
          })
    ))
    },
    {
      name: "Location",
      options: Array.from(new Set(allJobs
        .map((job) => job.location) 
        .filter((location) => location !== null && location !== "remote")
        .sort()
    ))
    },
    {
      name: "Remote/on-site",
      options: ["Remote","On Site"]
    },
    {
      name: "Role",
      options: Array.from(new Set(allJobs
        .map((job) => job.jobRole) 
        .filter((jobRole) => jobRole !== null)
        .sort()
    ))
    },
    {
      name: "Min base pay",
      options: Array.from(new Set(allJobs
        .filter((job) => job.minJdSalary  !== null).sort(function(a, b) {
            return a.minJdSalary - b.minJdSalary;
          }).map((job) => job.minJdSalary + " " + job.salaryCurrencyCode) 
    ))
        
    },
  ];
  return <Box sx={{display:'flex',gap: '1rem'}}>
    {
        listOfFilters.map((filter,index) => <Filter filter={filter} key={index}/>)
    }
  </Box>;
}
