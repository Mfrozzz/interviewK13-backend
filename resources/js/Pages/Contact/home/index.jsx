import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Head, Link } from "@inertiajs/react";
import '../../../../css/contactStyle.css';
import Header from '@/Components/Header';

function ListContact() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get("/api/contact/index")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar contatos:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Head title="Home Page" />
      <Header />
      <div className="container">
        <div className="content">
          <h2>Lista de Usuários</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Pesquisar contatos..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button className="add-button">
            <Link href={'/view/contacts/create'}>Adicionar Contato</Link>
          </button>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Detalhes</th>
                <th>Editar</th>
                <th>+ Endereço</th>
                <th>+ Telefone</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>
                    <button className="details-button">
                      <Link href={`/view/contacts/${contact.id}/details`}>Detalhes do Contato</Link>
                    </button>
                  </td>
                  <td>
                    <button className="edit-button">
                      <Link href={`/view/contacts/${contact.id}/update`}>Editar o Contato</Link>
                    </button>
                  </td>
                  <td>
                    <button className="address-button">
                      <Link href={`/view/contacts/${contact.id}/address`}>Adicionar Endereço</Link>
                    </button>
                  </td>
                  <td>
                    <button className="phone-button">
                      <Link href={`/view/contacts/${contact.id}/phone`}>Adicionar Telefone</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListContact;