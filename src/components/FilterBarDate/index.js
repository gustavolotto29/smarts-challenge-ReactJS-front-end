import React, { useState, useEffect } from 'react';
import './style.css';

function FilterBar({ onChange }) {
  const [dataInicio, setDataInicio] = useState('');

  async function ExecFunctionDate(e) {
    e.preventDefault();
    console.log(e.target.id, e.target.value);
    onChange(e.target.value, e.target.id);
  }

  return (
    <div className="filter-date">
      <label htmlFor="">Data inicio: </label>
      <input id="1" onChange={ExecFunctionDate} type="date"></input>
      <label htmlFor=""> Data Fim: </label>
      <input id="2" onChange={ExecFunctionDate} type="date"></input>
    </div>
  );
}

export default FilterBar;
