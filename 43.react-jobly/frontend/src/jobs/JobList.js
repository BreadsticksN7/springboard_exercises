import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import FilterForm from '../Components/FilterForm';
import JobCardList from './JobCardList';
import LoadingSpinner from '../Components/LoadingSpinner';

function JobList() {
  const [jobs, setJobs] = useState([]);

  //search() is passed instead of API direclty so it
  //only renders on first page load and form prompt
  useEffect(() => {
    search();
  }, []);

  async function search(title) {
    let res = await JoblyApi.getJobs(title);
    setJobs(res);
  }

  if (!jobs) return <LoadingSpinner />

  return (
    <div>
      <FilterForm filterBy={search} />
        {jobs.length
          ? <JobCardList jobs={jobs} />
          : <p>Sorry, no results found</p>
        }
    </div>
  );
}

export default JobList;