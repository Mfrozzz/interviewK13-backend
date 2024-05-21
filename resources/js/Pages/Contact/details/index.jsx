import { Inertia } from '@inertiajs/inertia-react';
import { Head, Link } from "@inertiajs/react";
import moment from "moment";
import React, { useState, useEffect } from 'react';
import '../../../../css/contactStyle.css';
import Header from '@/Components/Header';

function ShowContact({ contact }) {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const fetchAddress = async (id) => {
    try {
      const response = await axios.get(`/api/address/${id}/findByFK`);
      setAddress(response.data);
    } catch (error) {
      setError(error.response.data.message || 'Erro ao buscar endereço.');
    }
  };
  const fetchPhone = async (id) => {
    try {
      const response = await axios.get(`/api/phonenumber/${id}/findByFK`);
      setPhone(response.data);
    } catch (error) {
      setError(error.response.data.message || 'Erro ao buscar endereço.');
    }
  }
  useEffect(() => {
    fetchAddress(contact.id);
    fetchPhone(contact.id);
  }, []);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar este contato?')) {
      try {
        const response = await axios.delete(`/api/contact/${contact.id}/destroy`);
        if (response.status === 200) {
          console.log('Contato deletado com sucesso!');
        } else {
          console.error(response.status + ' Erro ao deletar contato.');
          console.error(response.data);
        }
      } catch (error) {
        console.error('Erro ao deletar contato:', error);
      }
    }
  };

  return (
    <div>
      <Head title="Detalhes do Contato" />
      <Header />
      <div className="container">
        <div className="content">
          <button className='back-button'>
            <Link href="/view/contacts/home">Voltar para Home</Link>
          </button>
          <h2>Detalhes do Contato</h2>
          <div className="contact-details">
            <p><strong>Nome:</strong> {contact.name}</p>
            <p><strong>CPF:</strong> {contact.cpf}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Data de Nascimento:</strong> {moment(contact.birthday).format("DD/MM/YYYY")}</p>
          </div>
          <div className="address-details">
            <h3>Endereço</h3>
            <p><strong>CEP:</strong> {address.cep}</p>
            <p><strong>Rua:</strong> {address.street}</p>
            <p><strong>Número:</strong> {address.number}</p>
            <p><strong>Bairro:</strong> {address.neighborhood}</p>
            <p><strong>Cidade:</strong> {address.city}</p>
            <p><strong>Estado:</strong> {address.state}</p>
          </div>
          <div className="phone-details">
            <h3>Telefones</h3>
            <p><strong>Telefone Celular:</strong> {phone.cellphone}</p>
            <p><strong>Telefone Residencial:</strong> {phone.residencialphone}</p>
            <p><strong>Telefone Comercial:</strong> {phone.commercialphone}</p>
          </div>
          <div className="action-buttons">
            <button onClick={handleDelete} className="delete-button">
              Deletar
            </button>
            <button className="edit-address-button">
              <Link href={`/view/contacts/${contact.id}/${address.id}/address/edit`}>Editar Endereço</Link>
            </button>
            <button className="edit-phone-button">
              <Link href={`/view/contacts/${contact.id}/${phone.id}/phone/edit`}>Editar Telefones</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowContact;