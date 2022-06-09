import React from 'react';
import JobCard from './JobCard';

//Displays specific job details
//Used on JobList / CompanyList
function JobCardList({jobs, apply}) {
  return (
    <div>
      {jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
    </div>
  );
}

export default JobCardList;