import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Content, ButtonEdit } from '~/pages/_layouts/default/styles';
import { Container, Table } from './styles';
import PopupReply from './PopupReply';

import api from '~/services/api';

export default function HelpOrder() {
  const [open, setOpen] = useState(false);
  const [helps, setHelps] = useState([]);
  const [helpOrder, setHelpOrder] = useState({});

  useEffect(() => {
    async function loadHelps() {
      const response = await api.get('help_orders/no_reply');

      setHelps(response.data);
    }

    loadHelps();
  }, []);

  function openReply(help) {
    setOpen(true);
    setHelpOrder(help);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  async function handleSubmit(data) {
    try {
      const edit = {
        ...helpOrder,
        answer: data.answer,
      };

      await api.put('help_orders', edit);

      setHelps(
        helps.filter(e => {
          return e.id !== edit.id;
        })
      );

      toast.info('Pergunta respondida com sucesso!');

      setOpen(false);
    } catch (err) {
      toast.error(
        'Não foi possível gravar a resposta, verifique os dados informados.'
      );
    }
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
      <PopupReply
        open={open}
        help={helpOrder}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
