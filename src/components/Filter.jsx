import React,{useState,useEffect} from 'react'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useJobs, setSelectedFilters } from '../features/jobSlice';
import { useDispatch } from 'react-redux';


export default function Filter({filter}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { selectedFilters } = useJobs();
    const dispatch = useDispatch();

    useEffect(() => {
        if(selectedOptions.length > 0){
            let nameOfFilter = filter.term;
            let data = { ...selectedFilters };
            data[nameOfFilter] = selectedOptions;
            dispatch(setSelectedFilters(data)); // setting seleceted filters when selected options change
        }else{
            let nameOfFilter = filter.term;
            let data = { ...selectedFilters };
            delete data[nameOfFilter]; 
            dispatch(setSelectedFilters(data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOptions]);

    // remove option
    const handleRemoveOption = (option) => {
        setSelectedOptions(prevSelected => prevSelected.filter(item => item !== option));
    };

    
  return (
    <Autocomplete sx={{ minWidth: '10rem', '& .MuiChip-root': { color: '#b3b3b3', textTransform: 'capitalize' } }}
    multiple
    value={selectedOptions}
    onChange={(event, newValue) => {
        setSelectedOptions(newValue);
    }}
    options={filter.options}
    getOptionLabel={(option) => option.toString().charAt(0).toUpperCase() + option.toString().slice(1).toLowerCase()}
    renderTags={(value, getTagProps) =>
        value.map((option, index) => (
            <Chip
                key={index}
                label={option}
                onDelete={() => handleRemoveOption(option)}
                {...getTagProps({ index })}
            />
        ))
    }
    renderInput={(params) => (
        <TextField 
            {...params}
            variant="outlined"
            label={filter.name}
            placeholder={filter.name}
        />
    )}
/>
  )
}
