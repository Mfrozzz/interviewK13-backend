import React, { useState } from 'react';
import axios from 'axios';
import '../../../../css/contactStyle.css';
import Header from '@/Components/Header';
import { Head, Link } from "@inertiajs/react";

function CreateContact() {
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
      }).then(() => {
        alert("Usuário Cadastrado, volte para a Home Page.")
      }).catch(()=>{
        alert("Campos preenchidos incorretamente");
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
    <div>
      <Head title="Criar Contato" />
      <Header />
      <div className="container">
        <div className="content">
          <button className='back-button'>
            <Link href="/view/contacts/home">Voltar para Home</Link>
          </button>
          <h2>Criar Novo Contato</h2>
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
};

export default CreateContact;