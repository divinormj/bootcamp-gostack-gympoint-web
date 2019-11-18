import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import DatePicker from './DatePicker';

import api from '~/services/api';
import history from '~/services/history';

import {
  Content,
  DataEntry,
  DataEntryInput,
  DataEntryRow,
} from '~/pages/_layouts/form/styles';

export default function EnrollmentForm() {
  const enrollment_id = useLocation().state.id;
  const [title, setTitle] = useState('');
  const [enrollment, setEnrollment] = useState({});
  //  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadEnrollment() {
      if (enrollment_id) {
        const response = await api.get(`enrollments/${enrollment_id}`);

        const data = {
          ...response.data,
          student: {
            id: response.data.student.id,
            title: response.data.student.name,
          },
        };

        console.tron.log('enrollment', data);
        setEnrollment(data);

        setTitle('Edição de matrícula');
      } else {
        setTitle('Cadastro de matrícula');
      }
    }

    /* async function loadPlans() {
      const response = await api.get('plans');

      const data = response.data.map(plan => ({
        id: plan.id,
        title: plan.title,
      }));

      setPlans(data);
    }

    loadPlans(); */

    loadEnrollment();
  }, []); // eslint-disable-line

  function handleGoList() {
    history.push('/enrollment-list');
  }

  async function handleSubmit(data) {
    console.tron.log(data);
    try {
      if (enrollment.id) {
        const enrollmentUpdate = await api.put('enrollments', {
          id: enrollment.id,
          ...data,
        });

        setEnrollment(enrollmentUpdate.data);

        toast.info('Registro atualizado com sucesso!');
      } else {
        const enrollmentCreate = await api.post('enrollments', data);

        setEnrollment(enrollmentCreate.data);

        toast.info('Registro incluído com sucesso!');
      }
    } catch (err) {
      console.tron.log(err);
      toast.error(
        'Falha ao gravar a matrícula, verifique os dados informados.'
      );
    }
  }

  return (
    <Form initialData={enrollment} onSubmit={handleSubmit}>
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
          <strong>ALUNO</strong>
        </DataEntryInput>
        <DataEntryRow>
          <DataEntryInput>
            <strong>PLANO</strong>
          </DataEntryInput>
          <DataEntryInput>
            <strong>DATA DE INÍCIO</strong>
            <DatePicker name="start_date" />
          </DataEntryInput>
          <DataEntryInput>
            <strong>DATA DE TÉRMINO</strong>
            <DatePicker name="end_date" />
          </DataEntryInput>
          <DataEntryInput>
            <strong>VALOR FINAL</strong>
            <Input name="height" />
          </DataEntryInput>
        </DataEntryRow>
      </DataEntry>
    </Form>
  );
}
