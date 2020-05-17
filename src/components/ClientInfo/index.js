import React from 'react';
import './style.css';

function ClientInfo({ client }) {
  return (
    <li className="client-item">
      <header>
        <img src={client.pictures[0].url} alt={client.name.first} />
        <div className="user-info">
          <strong>
            Nome: {client.name.first} {client.name.last}
          </strong>
          <strong>Email: {client.email}</strong>
          <strong>Age: {client.age}</strong>
          <strong>Budget: {client.budget}</strong>
        </div>
      </header>
    </li>
  );
}

export default ClientInfo;
