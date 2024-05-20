import React, { useState } from 'react';
import axios from 'axios';

function CreateAdress({ contact }) {
  const [id_contactFK, setId_contactFK] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
    "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
    "SP", "SE", "TO"
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setId_contactFK(contact.id);
    try {
      const response = await axios.post(`/api/address/store/${contact.id}`, {
        id_contactFK,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      });

      if (response.status === 201) {
        console.log('Dados enviados com sucesso!');
        // Limpe os campos do formulário após o envio
        setCep('');
        setRua('');
        setNumero('');
        setBairro('');
        setCidade('');
        setEstado('');
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
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rua">Rua:</label>
        <input
          type="text"
          id="rua"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="numero">Número:</label>
        <input
          type="text"
          id="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bairro">Bairro:</label>
        <input
          type="text"
          id="bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cidade">Cidade:</label>
        <input
          type="text"
          id="cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <select id="estado" name="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Selecione um estado</option>
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default CreateAdress;