// Function to filter jobs by using selected filters
export const filterBy = (allJobs, selectedFilters, backUpJobs) => {
  if (Object.keys(selectedFilters).length > 0) {
      return allJobs.filter(job =>
        Object.entries(selectedFilters).every(([key, value]) => {

          // min salary is string with currency code, so getting min salary
          if(key === "minJdSalary"){
            const salaries = value.map(salary => parseFloat(salary.split(' ')[0]));
            return job[key] && salaries.includes(job[key])
          }

          // remote or onsite is not given specifically in API so to if location is remote then remote jobs will be filtered
          if(key === "location" && value.includes('on site') && key === "location" && value.includes('remote')){
            return job[key];
          }else if(key === "location" && value.includes('on site')){ // if on site selected then jobs which are not remote will be filtered
            return job[key] && job[key] !== 'remote'
          } else if(key === "location" && value.includes('remote')){
            return job[key] && job[key] === 'remote'
          } 

          // Check if job have same company name
          if(key === "companyName" && job[key].length > 0){
            console.log(job[key],value);
            return job[key] && job[key].toLowerCase().includes(value.toLowerCase())
          } else if (key === "companyName" && job[key].length === 0){
            return job[key]
          }

          return job[key] && value.includes(job[key])
        }
      )
      );
  }
  return backUpJobs
}

