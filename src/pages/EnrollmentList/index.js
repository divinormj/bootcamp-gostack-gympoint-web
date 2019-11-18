import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  Content,
  ButtonDelete,
  ButtonEdit,
} from '~/pages/_layouts/default/styles';
import { Container, Table, Active } from './styles';

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('enrollments');

      const data = response.data.map(enrollment => ({
        ...enrollment,
        startFormatted: format(
          parseISO(enrollment.start_date),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
        endFormatted: format(
          parseISO(enrollment.end_date),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
      }));

      setEnrollments(data);
    }

    loadEnrollments();
  }, []);

  function handleGoRegister(id) {
    history.push('/enrollment-form', { id });
  }

  async function handleDeleteRegister(enrollment) {
    const yes = window.confirm(
      `Confirma a exclução da matricula do aluno ${enrollment.student.name}?`
    );

    if (yes) {
      try {
        await api.delete('enrollments', {
          params: { id: enrollment.id },
        });

        setEnrollments(
          enrollments.filter(e => {
            return e.id !== enrollment.id;
          })
        );
      } catch (err) {
        toast.error(
          'Ocorreu um erro ao excluir a matrícula, verifique os dados e tente novamente.'
        );
      }
    }
  }

  return (
    <Container>
      <Content>
        <strong>Gerenciando matrículas</strong>
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
            <th>ALUNO</th>
            <th>PLANO</th>
            <th>INÍCIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr>
              <td>{enrollment.student.name}</td>
              <td>{enrollment.plan.title}</td>
              <td>{enrollment.startFormatted}</td>
              <td>{enrollment.endFormatted}</td>
              <td>
                <Active active={enrollment.active} />
              </td>
              <td>
                <ButtonEdit
                  type="button"
                  onClick={() => handleGoRegister(enrollment.id)}
                >
                  editar
                </ButtonEdit>
              </td>
              <td>
                <ButtonDelete
                  type="button"
                  onClick={() => handleDeleteRegister(enrollment)}
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
