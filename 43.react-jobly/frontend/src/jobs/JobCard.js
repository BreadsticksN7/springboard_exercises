import React from 'react';
import './JobCard.css';

//function for format salary with commas
function formatSalary(salary) {
  const digitsRev = [];
  const salaryStr = salary.toString();
  
  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i]);
    if (i > 0 && i % 3 === 0) digitsRev.push(",");
  }
  
  return digitsRev.reverse().join("");
}

//Display job details for JobCardList
function JobCard({id, title, salary, equity, companyName}) {
  return (
    <div className='JobCard card'>
      <div className='card-body'>
        <h6 className='card-title'>{title}</h6>
        <p>{companyName}</p>
        {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
        {equity !== undefined && <div><small>Equity: {equity}</small></div>}
      </div>
    </div>
  );
}

export default JobCard;