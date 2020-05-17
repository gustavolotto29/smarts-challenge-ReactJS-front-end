import React, { useEffect, useState } from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/api';

import ClientInfo from './components/ClientInfo';
import FilterBarButtons from './components/FilterBarButtons';
import FilterBarDate from './components/FilterBarDate';
import PageList from './components/PageList';

//componente: Bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação
//Propriedade: Informações que um componente pai passa para o filho
//Estado: informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
  const [clients, setClients] = useState([]);
  const [page, setPageCount] = useState([]);
  const [pageClick, setPageClick] = useState([]);

  useEffect(() => {
    async function loadclients() {
      const response = await api.get('/Customers');

      const countClients = response.headers['x-total-count'];
      const pages = [];
      const t = Math.ceil(countClients / 5);

      for (let i = 0; i < t; i += 1) {
        pages.push(i + 1);
      }

      setPageCount(pages);
      setClients(response.data);
    }
    loadclients();
  }, []);

  async function handleFilterButton(id) {
    const response = await api.get('/Customers', {
      params: { page },
    });
    let fillterClients;

    if (id == 'menor')
      fillterClients = response.data.sort(
        (a, b) =>
          a.budget.replace(/[.]/, '').replace(/[,]/, '').replace(/[$]/, '') -
          b.budget.replace(/[.]/, '').replace(/[,]/, '').replace(/[$]/, '')
      );
    else if (id == 'maior')
      fillterClients = response.data.sort(
        (a, b) =>
          b.budget.replace(/[.]/, '').replace(/[,]/, '').replace(/[$]/, '') -
          a.budget.replace(/[.]/, '').replace(/[,]/, '').replace(/[$]/, '')
      );
    else if (id == 'asc')
      fillterClients = response.data.sort(
        (a, b) => verify(b.name.first, a.name.first) - 0
      );
    else if (id == 'desc')
      fillterClients = response.data.sort(
        (a, b) => verify(a.name.first, b.name.first) - 0
      );
    else fillterClients = response.data;
    setClients(fillterClients);

    function verify(a, b) {
      if (a > b) return -1;
      else if (a < b) return 1;
      else return 0;
    }
  }

  async function handleFilterDate(data, id) {
    const response = await api.get('/Customers');
    if (id == '1') setClients(response.data.filter((c) => c.registered > data));
    else if (id == '2')
      setClients(response.data.filter((c) => c.registered < data));
  }

  async function handleFilterPage(number) {
    const response = await api.get('/Customers', {
      params: { page: number },
    });
    setClients(response.data);
    setPageClick([number]);
  }

  return (
    <div id="app">
      <main>
        <FilterBarButtons onClick={handleFilterButton} />
        <FilterBarDate onChange={handleFilterDate} />
        <ul>
          {clients.map((client) => (
            <ClientInfo key={client._id} client={client} />
          ))}
        </ul>
        <ul className="page-number">
          {page.map((number) => (
            <PageList key={number} param={number} onClick={handleFilterPage} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
