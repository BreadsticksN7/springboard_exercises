import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import CompanyCard from './CompanyCard';
import FilterForm from '../Components/FilterForm';
import LoadingSpinner from '../Components/LoadingSpinner';

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  //search() is passed instead of API directly so it only
  //renders when page first loads and when prompted by form submit
  useEffect(() => {
    search();
  }, []);
  
  async function search(name) {
    let res = await JoblyApi.getCompanies(name);
    setCompanies(res);
  }

  if(!companies) return <LoadingSpinner />;

  return (
    <div className='CompanyList col-md-8 offset-md-2'>
      <FilterForm filterBy={search} />
        {companies.length
          ? ( 
            <div className='CompanyList-list'>
              {companies.map(item => (
                <CompanyCard
                  key={item.handle}
                  handle={item.handle}
                  name={item.name}
                  desc={item.description}
                  logo={item.logoUrl} />
            ))}
          </div>
        ) : (
          <p className='lead'>No results found</p>
        )}
    </div>
  );
}

export default CompanyList;