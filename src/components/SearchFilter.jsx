import React, { useState,useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useJobs, setSelectedFilters } from '../features/jobSlice';
import { useDispatch } from 'react-redux';

const SearchFilter = ({ allItems }) => {
  const [searchValue, setSearchValue] = useState("");
  const { selectedFilters } = useJobs();
  const dispatch = useDispatch();

  console.log(searchValue);

  useEffect(() => {
    if(searchValue){
        let nameOfFilter = "companyName";
        let data = { ...selectedFilters };
        data[nameOfFilter] = searchValue;
        dispatch(setSelectedFilters(data)); // setting seleceted filters when selected options change
    }
}, [searchValue]);

  return (
    <TextField
      label="Search Company Name"
      variant="outlined"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value); // Set the search value directly
      }}
    />
  );
};

export default SearchFilter;
