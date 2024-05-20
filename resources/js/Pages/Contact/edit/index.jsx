import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import axios from 'axios';

function redirectRoute(){

}

function EditContact({ contact }) {

    const [name, setName] = useState(contact.name || '');
    const [cpf, setCpf] = useState(contact.cpf || '');
    const [email, setEmail] = useState(contact.email || '');
    const [birthday, setBirthday] = useState(contact.birthday || '');

  const handleSubmit = async (event) => {
    event.preventDefault();

      const response = await axios.put(`/api/contact/${contact.id}/update`, {
        name,
        cpf,
        email,
        birthday,
      }).then(()=>{
        console.log('Dados enviados com sucesso!');
      }).catch ((error) => {
        console.error(response.status+' Erro ao enviar dados.');
        console.error(error);
      });

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="birthday">Data de Nascimento:</label>
        <input
          type="date"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default EditContact;