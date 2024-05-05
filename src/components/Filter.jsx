import React,{useState} from 'react'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Filter({filter}) {
    const [selectedOptions, setSelectedOptions] = useState([]);


    // remove option
    const handleRemoveOption = (option) => {
        setSelectedOptions(prevSelected => prevSelected.filter(item => item !== option));
    };
  return (
    <Autocomplete sx={{minWidth: '10rem'}}
    multiple
    value={selectedOptions}
    onChange={(event, newValue) => {
        setSelectedOptions(newValue);
    }}
    options={filter.options.map(option => option.toString())} // Convert numbers to strings
    getOptionLabel={(option) => option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
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
