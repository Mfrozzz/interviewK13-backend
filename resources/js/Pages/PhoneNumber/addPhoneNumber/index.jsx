import React, { useState } from 'react';
import axios from 'axios';
import '../../../../css/phoneStyle.css';
import Header from '@/Components/Header';
import { Head, Link } from "@inertiajs/react";

function CreatePhone({ contact }) {
  const [cellphone, setCellphone] = useState('');
  const [residencialphone, setResidencialphone] = useState('');
  const [commercialphone, setCommercialphone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/phonenumber/store/${contact.id}`, {
        id_contactFK: contact.id,
        cellphone,
        residencialphone,
        commercialphone,
      }).then(()=>{
        alert("Telefones Cadastrados. Volte para a Home Page.");
      }).catch(()=>{
        alert("Falha. Campos preenchidos incorretamente.");
      });

      if (response.status === 201) {
        console.log('Dados enviados com sucesso!');
        setCellphone('');
        setResidencialphone('');
        setCommercialphone('');
      } else {
        console.error('Erro ao enviar dados.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head title="Adicionar Telefone" />
      <Header />
      <div className="container">
        <div className="content">
          <button className='back-button'>
            <Link href="/view/contacts/home">Voltar para Home</Link>
          </button>
          <h2>Criar Novo Telefone</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="id_contactFK">Contato:</label>
              <select disabled="disabled" name="id_contactFK" id="id_contactFK" value={contact.id} onChange={(e) => {/* Faz nada, pois é um select desabilitado */ }}>
                <option value={contact.id}>
                  {contact.name}
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cellphone">Telefone Celular:</label>
              <input
                type="text"
                id="cellphone"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="residencialphone">Telefone Residencial:</label>
              <input
                type="text"
                id="residencialphone"
                value={residencialphone}
                onChange={(e) => setResidencialphone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="commercialphone">Telefone Comercial:</label>
              <input
                type="text"
                id="commercialphone"
                value={commercialphone}
                onChange={(e) => setCommercialphone(e.target.value)}
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

export default CreatePhone;