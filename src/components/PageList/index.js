import React, { useState, useEffect } from 'react';
import './style.css';

function PageList({ param, onClick }) {
  async function ExecFunction(e) {
    e.preventDefault();
    console.log(onClick);
    onClick(e.target.innerHTML);
  }

  return (
    <li className="page-info">
      <div className="page-number">
        <a onClick={ExecFunction} htmlFor="">
          {param}
        </a>
      </div>
    </li>
  );
}

export default PageList;
