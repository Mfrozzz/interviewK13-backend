import React, { useState } from 'react';
import axios from 'axios';

function CreateContact(){
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/contact/store', {
        name,
        cpf,
        email,
        birthday,
      });

      if (response.status === 201) {
        console.log('Dados enviados com sucesso!');
      } else {
        console.error('Erro ao enviar dados.');
      }
    } catch (error) {
      console.error(error);
    }
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
};

export default CreateContact;