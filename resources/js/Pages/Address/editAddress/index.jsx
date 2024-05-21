import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../css/addressStyle.css';
import Header from '@/Components/Header';
import { Head, Link } from "@inertiajs/react";

function EditAdress({ contact, address }) {
  const [error, setError] = useState('');

  const [cep, setCep] = useState(address.cep || '');
  const [street, setStreet] = useState(address.street || '');
  const [number, setNumber] = useState(address.number || '');
  const [neighborhood, setNeighborhood] = useState(address.neighborhood || '');
  const [city, setCity] = useState(address.city || '');
  const [state, setState] = useState(address.state || '');

  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
    "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
    "SP", "SE", "TO"
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/address/${address.id}/update`, {
        id_contactFK: contact.id,
        cep,
        street,
        number,
        neighborhood,
        city,
        state,
      });

      if (response.status === 200) {
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
      <Head title="Editar Endereço" />
      <Header />
      <div className="container">
        <div className="content">
          <button className='back-button'>
            <Link href={`/view/contacts/${contact.id}/details`}>Voltar para Detalhes</Link>
          </button>
          <h2>Editar Endereço</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="id_contactFK">Endereço do contato</label>
              <select disabled="disabled" name="id_contactFK" id="id_contactFK" value={contact.id} onChange={(e) => {/* Faz nada, pois é um select desabilitado */ }}>
                <option value={contact.id}>
                  {contact.name}
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cep">CEP:</label>
              <input
                type="text"
                id="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Rua:</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="number">Número:</label>
              <input
                type="text"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="neighborhood">Bairro:</label>
              <input
                type="text"
                id="neighborhood"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Cidade:</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">Estado:</label>
              <select id="state" name="state" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Selecione um estado</option>
                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
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

export default EditAdress;