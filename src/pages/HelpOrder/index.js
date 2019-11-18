import React, { useEffect, useState } from 'react';

import { Content, ButtonEdit } from '~/pages/_layouts/default/styles';
import { Container, Table, ButtonPopup } from './styles';
import PopupReply from './PopupReply';

import api from '~/services/api';

export default function HelpOrder() {
  const [helps, setHelps] = useState([]);

  useEffect(() => {
    async function loadHelps() {
      const response = await api.get('help_orders/no_reply');

      setHelps(response.data);
    }

    loadHelps();
  }, []);

  function openReply() {
    return (
      <ButtonPopup isOpen>
        <PopupReply />
      </ButtonPopup>
    );
  }

  return (
    <Container>
      <Content>
        <strong>Pedidos de auxílio</strong>
      </Content>
      <Table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {helps.map(help => (
            <tr>
              <td>{help.student.name}</td>
              <td>
                <ButtonEdit type="button" onClick={() => openReply(help)}>
                  responder
                </ButtonEdit>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
