import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Head, Link } from "@inertiajs/react";
import axios from 'axios';
import '../../../../css/contactStyle.css';
import Header from '@/Components/Header';

function EditContact({ contact }) {

  const [name, setName] = useState(contact.name || '');
  const [cpf, setCpf] = useState(contact.cpf || '');
  const [email, setEmail] = useState(contact.email || '');
  const [birthday, setBirthday] = useState(contact.birthday || '');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`/api/contact/${contact.id}/update`, {
        name,
        cpf,
        email,
        birthday,
      });

      if (response.status === 200) {
        console.log('Dados enviados com sucesso!');

      } else {
        console.error(response.status + ' Erro ao enviar dados.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head title="Editar Contato" />
      <Header />
      <div className="container">
        <div className="content">
          <button className='back-button'>
            <Link href="/view/contacts/home">Voltar para Home</Link>
          </button>
          <h2>Editar Contato</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Data de Nascimento:</label>
              <input
                type="date"
                id="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditContact;