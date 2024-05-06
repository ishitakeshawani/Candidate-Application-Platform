import React from "react";
import Filter from "../components/Filter";
import {Box} from "@mui/material";
import { useJobs } from '../features/jobSlice';
import SearchFilter from "../components/SearchFilter";

export default function FilterList() {
const { allJobs, backUpJobs } = useJobs();

// Created list of filters with options
  let listOfFilters = [
    {
      name: "Min experience",
      term: "minExp",
      options: Array.from(new Set(backUpJobs
        .map((job) => job.minExp) 
        .filter((minExp) => minExp !== null)
        .sort(function(a, b) {
            return a - b;
          })
    ))
    },
    {
      name: "Location",
      term: "location",
      options: Array.from(new Set(backUpJobs
        .map((job) => job.location) 
        .filter((location) => location !== null && location !== "remote")
        .sort()
    ))
    },
    {
      name: "Remote/on-site",
      term: "location",
      options: ["remote","on site"]
    },
    {
      name: "Role",
      term: "jobRole",
      options: Array.from(new Set(backUpJobs
        .map((job) => job.jobRole) 
        .filter((jobRole) => jobRole !== null)
        .sort()
    ))
    },
    {
      name: "Min base pay",
      term: "minJdSalary",
      options: Array.from(new Set(backUpJobs
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
     <SearchFilter/>
  </Box>;
}
