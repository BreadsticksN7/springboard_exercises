import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/api';
import JobCardList from '../jobs/JobCardList';
import LoadingSpinner from '../Components/LoadingSpinner';


//Displays specific company details and job postings
function CompanyDetails() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  
  useEffect(() => {
    async function getCompany() {
      let res = await JoblyApi.getCompany(handle);
      setCompany(res);
    }
    getCompany();
  }, [handle]);

  if(!company) return <LoadingSpinner />;

  return (
    <div className='CompanyDetail col-md-8 offset-md-2'>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetails;