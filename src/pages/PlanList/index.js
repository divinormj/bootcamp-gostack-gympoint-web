import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import {
  Content,
  ButtonDelete,
  ButtonEdit,
} from '~/pages/_layouts/default/styles';
import { Container, Table } from './styles';

export default function PlanList() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      const data = response.data.map(plan => ({
        ...plan,
        priceFormatted: formatPrice(plan.price),
      }));

      setPlans(data);
    }

    loadPlans();
  }, []);

  function handleGoRegister(id) {
    history.push('/plan-form', { id });
  }

  async function handleDeleteRegister(plan) {
    const yes = window.confirm(`Confirma a exclução do plano ${plan.title}?`);

    if (yes) {
      try {
        await api.delete('plans', {
          params: { id: plan.id },
        });

        setPlans(
          plans.filter(e => {
            return e.id !== plan.id;
          })
        );
      } catch (err) {
        console.tron.log(err);
        toast.error(
          'O plano não pode ser removido porque já possui alunos cadastrados.'
        );
      }
    }
  }

  return (
    <Container>
      <Content>
        <strong>Gerenciando planos</strong>
        <div>
          <button type="button" onClick={() => handleGoRegister()}>
            <MdAdd size={20} color="#fff" />
            <span>CADASTRAR</span>
          </button>
        </div>
      </Content>
      <Table>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/ MÊS</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr>
              <td>{plan.title}</td>
              <td>{plan.duration}</td>
              <td>{plan.priceFormatted}</td>
              <td>
                <ButtonEdit
                  type="button"
                  onClick={() => handleGoRegister(plan.id)}
                >
                  editar
                </ButtonEdit>
              </td>
              <td>
                <ButtonDelete
                  type="button"
                  onClick={() => handleDeleteRegister(plan)}
                >
                  apagar
                </ButtonDelete>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
