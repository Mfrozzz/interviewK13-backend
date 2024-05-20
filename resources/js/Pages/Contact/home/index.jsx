import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";
import { Head, Link } from "@inertiajs/react";

function ListContact(){
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <button>
        <Link href={'/view/contacts/create'}>Adicionar Contato</Link> 
      </button> 
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            {/* <th>CPF</th>
            <th>Email</th>
            <th>Data de Nascimento</th> */}
            <th>Detalhes</th>
            <th>Editar</th>
            <th>+ Endereço</th>
            <th>+ Telefone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              {/* <td>{contact.cpf}</td>
              <td>{contact.email}</td>
              <td>{moment(contact.birthday).format('DD/MM/YYYY')}</td> */}
              <td>
                <button>
                  <Link href={`/view/contacts/${contact.id}/details`}>Detalhes do Contato</Link> 
                </button> 
              </td>
              <td>
                <button>
                  <Link href={`/view/contacts/${contact.id}/update`}>Editar o Contato</Link> 
                </button> 
              </td>
              <td>
                <button>
                  <Link href={`/view/contacts/${contact.id}/address`}>Adicionar Endereço</Link> 
                </button> 
              </td>
              <td>
                <button>
                  <Link href={`/view/contacts/phone`}>Adicionar Telefone</Link> 
                </button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  // return (
  //   <div>
  //     <h2>Lista de Usuários</h2>
  //     <ul>
  //       {users.map((user) => (
  //         <li key={user.id}>
  //           <strong>Nome:</strong> {user.name} <br />
  //           <strong>CPF:</strong> {user.cpf} <br />
  //           <strong>Email:</strong> {user.email} <br />
  //           <strong>Data de Nascimento:</strong> {moment(user.birthday).format("DD/MM/YYYY")}
  //           <a href={`/view/contacts/${user.id}/address`}>Adicionar Endereço</a>
  //           <a href={`/view/contacts/${user.id}/phone`}>Adicionar Telefone</a>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default ListContact;