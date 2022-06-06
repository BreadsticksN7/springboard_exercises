import React, { useState } from 'react';
import './FilterForm.css';


function FilterForm({filterBy}) {
  const [findName, setFindName] = useState("");

  //Takes filterBy from 'companyList'
  //filterBy contents provided by API 'search()'
  //results are trimmed by the provided parameter
  const handleSubmit = evt => {
    evt.preventDefault();
    filterBy(findName.trim() || undefined);
    setFindName(findName.trim());
  }

  const handleChange = evt => {
    setFindName(evt.target.value);
  }

  return (
    <div className='FilterForm mb-4'>
      <form className='form-inline' onSubmit={handleSubmit}>
        <input
          className='form-control form-control-log flex-grow-1'
          name='search'
          placeholder='Search...'
          value={findName}
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-lg btn-primary'>Search</button>
      </form>
    </div>
  );
}

export default FilterForm;