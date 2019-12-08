import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';
import history from '~/services/history';

import {
  Content,
  DataEntry,
  DataEntryInput,
  DataEntryRow,
} from '~/pages/_layouts/form/styles';

export default function StudentForm() {
  const student_id = useLocation().state.id;
  const [student, setStudent] = useState({});
  const [title, setTitle] = useState('');

  const schema = Yup.object().shape({
    name: Yup.string().required('Informe o nome do aluno.'),
    email: Yup.string()
      .email('Informe um e-mail válido.')
      .required('Informe o e-mail.'),
    age: Yup.number().integer(),
    height: Yup.number(),
    weight: Yup.number(),
  });

  useEffect(() => {
    async function loadStudent() {
      if (student_id) {
        const response = await api.get(`students/${student_id}`);
        setStudent(response.data);
        setTitle('Edição de aluno');
      } else {
        setTitle('Cadastro de aluno');
      }
    }

    loadStudent();
  }, []); // eslint-disable-line

  function handleGoList() {
    history.push('/student-list');
  }

  async function handleSubmit(data) {
    try {
      if (student.id) {
        const editStudent = {
          id: student.id,
          ...data,
        };

        await api.put('students', editStudent);

        toast.info('Registro atualizado com sucesso!');
      } else {
        await api.post('students', data);

        toast.info('Registro incluído com sucesso!');

        handleGoList();
      }
    } catch (err) {
      toast.error(
        'Não foi possível gravar o registro do aluno, verifique os dados informados.'
      );
    }
  }

  return (
    <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
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
          <strong>NOME COMPLETO</strong>
          <Input name="name" placeholder="John Doe" />
        </DataEntryInput>
        <DataEntryInput>
          <strong>ENDEREÇO DE E-MAIL</strong>
          <Input name="email" placeholder="exemplo@email.com" />
        </DataEntryInput>
        <DataEntryRow>
          <DataEntryInput>
            <strong>IDADE</strong>
            <Input type="number" name="age" />
          </DataEntryInput>
          <DataEntryInput>
            <strong>PESO (em kg)</strong>
            <Input type="number" step="any" name="weight" />
          </DataEntryInput>
          <DataEntryInput>
            <strong>ALTURA</strong>
            <Input type="number" step="any" name="height" />
          </DataEntryInput>
        </DataEntryRow>
      </DataEntry>
    </Form>
  );
}
