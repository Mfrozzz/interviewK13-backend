import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../css/phoneStyle.css';
import Header from '@/Components/Header';
import { Head, Link } from "@inertiajs/react";

function UpdatePhone({ contact, phone }) {
  const [error, setError] = useState('');

  const [cellphone, setCellphone] = useState(phone.cellphone || '');
  const [residencialphone, setResidencialphone] = useState(phone.residencialphone || '');
  const [commercialphone, setCommercialphone] = useState(phone.commercialphone || '');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/phonenumber/${phone.id}/update`, {
        id_contactFK: contact.id,
        cellphone,
        residencialphone,
        commercialphone,
      }).then(()=>{
        alert("Telefones Editados. Volte para a página de detalhes do contato.");
      }).catch(()=>{
        alert("Falha. Campos preenchidos incorretamente.");
      });

      if (response.status === 200) {
        console.log('Dados enviados com sucesso!');
        // Limpe os campos do formulário após o envio
        // ... (se necessário)
      } else {
        console.error('Erro ao enviar dados.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head title="Editar Telefone" />
      <Header />
      <div className="container">
        <div className="content">
          <button className='back-button'>
            <Link href={`/view/contacts/${contact.id}/details`}>Voltar para Detalhes</Link>
          </button>
          <h2>Editar Telefones</h2>
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
              <label htmlFor="cellphone">Celular:</label>
              <input
                type="text"
                id="cellphone"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="residencialphone">Residencial:</label>
              <input
                type="text"
                id="residencialphone"
                value={residencialphone}
                onChange={(e) => setResidencialphone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="commercialphone">Comercial:</label>
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

export default UpdatePhone;