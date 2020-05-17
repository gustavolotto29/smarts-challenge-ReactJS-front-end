import React, { useState, useEffect } from 'react';
import './style.css';

function FilterBar({ onClick }) {
  async function ExecFunction(e) {
    e.preventDefault();
    onClick(e.target.id);
  }

  return (
    <div className="filter-info">
      <a id="menor" onClick={ExecFunction}>
        Menor Budget
      </a>
      <a id="maior" onClick={ExecFunction}>
        Maior Budget
      </a>
      <a id="asc" onClick={ExecFunction}>
        A-Z
      </a>
      <a id="desc" onClick={ExecFunction}>
        Z-A
      </a>
    </div>
  );
}

export default FilterBar;
