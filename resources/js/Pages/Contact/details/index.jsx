import { Inertia } from '@inertiajs/inertia-react';
import { Head, Link } from "@inertiajs/react";
import moment from "moment";

function ShowContact({ contact }) {
    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja deletar este contato?')) {
          try {
            const response = await axios.delete(`/api/contact/${contact.id}/destroy`); // Envie a requisição DELETE
            if (response.status === 200) {
            //   Inertia.visit('/contacts'); // Redirecione para a página de listagem
              console.log('Contato deletado com sucesso!');
            } else {
              console.error(response.status + ' Erro ao deletar contato.');
              console.error(response.data);
            }
          } catch (error) {
            console.error('Erro ao deletar contato:', error);
          }
        }
    }

  return (
    <div>
      <h2>Detalhes do Contato</h2>
      <p><strong>Nome:</strong> {contact.name}</p>
      <p><strong>CPF:</strong> {contact.cpf}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Data de Nascimento:</strong> {moment(contact.birthday).format("DD/MM/YYYY")}</p>
      <button onClick={handleDelete}>Deletar</button>
    </div>
  );
}

export default ShowContact;