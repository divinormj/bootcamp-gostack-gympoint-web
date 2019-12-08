import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';
import history from '~/services/history';

import {
  Content,
  DataEntry,
  DataEntryInput,
  DataEntryRow,
} from '~/pages/_layouts/form/styles';

export default function PlanForm() {
  const plan_id = useLocation().state.id;
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [total, setTotal] = useState();
  const [title, setTitle] = useState('');
  const [plan, setPlan] = useState({});

  useEffect(() => {
    async function loadPlan() {
      if (plan_id) {
        const response = await api.get(`plans/${plan_id}`);

        setPlan(response.data);

        setDuration(response.data.duration);
        setPrice(response.data.price);
        setTotal(response.data.total_price);

        setTitle('Edição de plano');
      } else {
        setTitle('Cadastro de plano');
      }
    }

    loadPlan();
  }, []); // eslint-disable-line

  useEffect(() => {
    setTotal(duration * price);
  }, [duration, price]);

  function handleGoList() {
    history.push('/plan-list');
  }

  async function handleSubmit(data) {
    try {
      if (plan.id) {
        const planUpdate = await api.put('plans', {
          id: plan.id,
          ...data,
        });

        setPlan(planUpdate.data);

        toast.info('Registro atualizado com sucesso!');
      } else {
        const planCreate = await api.post('plans', data);

        setPlan(planCreate.data);

        toast.info('Registro incluído com sucesso!');

        handleGoList();
      }
    } catch (err) {
      toast.error(
        'Falha ao gravar o registro de plano, verifique os dados informados.'
      );
    }
  }

  return (
    <Form initialData={plan} onSubmit={handleSubmit}>
      <Content>
        <strong>{title}</strong>
        <div>
          <button type="button" onClick={handleGoList}>
            <MdKeyboardArrowLeft size={20} color="#fff" />
            <span>VOLTAR</span>
          </button>
          <button type="submit">
            <MdCheck size={20} color="#fff" />
            <span>SALVAR</span>
          </button>
        </div>
      </Content>
      <DataEntry>
        <DataEntryInput>
          <strong>TÍTULO DO PLANO</strong>
          <Input name="title" />
        </DataEntryInput>
        <DataEntryRow>
          <DataEntryInput>
            <strong>DURAÇÃO (em meses)</strong>
            <Input
              type="number"
              name="duration"
              value={duration}
              onChange={e => setDuration(e.target.value)}
            />
          </DataEntryInput>
          <DataEntryInput>
            <strong>PREÇO MENSAL</strong>
            <Input
              type="number"
              name="price"
              step="any"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </DataEntryInput>
          <DataEntryInput>
            <strong>PREÇO TOTAL</strong>
            <Input
              type="number"
              name="total_price"
              readOnly="true"
              value={total}
            />
          </DataEntryInput>
        </DataEntryRow>
      </DataEntry>
    </Form>
  );
}
