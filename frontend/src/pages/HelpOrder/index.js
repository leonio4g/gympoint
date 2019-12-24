import React, { useEffect, useState } from 'react';
import api from '~/services/api';
import { Container, Header, HelpOrderTable, Content } from './styles';

import Modal from './HelpModal';

export default function HelpOrderList() {
  const [helpOrder, setHelpOrder] = useState([]);
  const [infosModal, setInfosModal] = useState([]);

  useEffect(() => {
    async function listHelpOrder() {
      const response = await api.get('student/help-orders');

      setHelpOrder(response.data);
    }
    listHelpOrder();
  }, [setHelpOrder]);

  async function handleModal(help) {
    setInfosModal({
      isOpen: true,
      question: help.question,
      idQuestion: help.id,
    });
  }
  function removeHelpOrder(idHelpOrder) {
    const attList = helpOrder.filter(item => item.id !== idHelpOrder);

    setHelpOrder(attList);

    setInfosModal({
      isOpen: false,
    });
  }

  return (
    <Container>
      <Header>
        <p>Pedido de Auxílio</p>
        <div />
      </Header>
      <Content>
        <HelpOrderTable>
          <Modal
            isOpen={infosModal.isOpen}
            question={infosModal.question}
            idQuestion={infosModal.idQuestion}
            listHelpOrder={removeHelpOrder}
          />
          <thead>
            <tr>
              <th>Aluno</th>
            </tr>
          </thead>

          <tbody>
            {helpOrder.map(help => (
              <tr key={help.id}>
                <td>{help.students.name}</td>
                <td id="actions">
                  <button
                    id="edit"
                    onClick={() => handleModal(help)}
                    type="button"
                  >
                    Responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </HelpOrderTable>
      </Content>
    </Container>
  );
}
