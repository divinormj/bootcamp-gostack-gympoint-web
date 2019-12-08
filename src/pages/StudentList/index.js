import React, { useEffect, useState } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  Content,
  ButtonEdit,
  ButtonDelete,
} from '~/pages/_layouts/default/styles';
import { Container, Searchbar, Table } from './styles';

export default function StudentList() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get('students', {
          params: { student_name: name },
        });

        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        console.tron.log(err);
      }
    }

    loadStudents();
  }, [name]);

  function handleFindName(e) {
    if (!loading) {
      setLoading(true);
      setName(e.target.value);
    }
  }

  function handleGoRegister(id) {
    history.push('/student-form', { id });
  }

  async function handleDeleteRegister(student) {
    const yes = window.confirm(`Confirma a exclução do aluno ${student.name}?`); // eslint-disable-line

    if (yes) {
      try {
        await api.delete('students', {
          params: { id: student.id },
        });

        setStudents(
          students.filter(e => {
            return e.id !== student.id;
          })
        );
      } catch (err) {
        toast.error(
          'O aluno não pode ser removido porque já está matriculado.'
        );
      }
    }
  }

  return (
    <Container>
      <Content>
        <strong>Gerenciando alunos</strong>
        <div>
          <button type="button" onClick={() => handleGoRegister()}>
            <MdAdd size={20} color="#fff" />
            <span>CADASTRAR</span>
          </button>
          <Searchbar>
            <div>
              <MdSearch size={16} color="#999" />
            </div>
            <Input
              name="search"
              placeholder="Buscar aluno"
              onChange={e => handleFindName(e)}
            />
          </Searchbar>
        </div>
      </Content>
      <Table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <ButtonEdit
                  type="button"
                  onClick={() => handleGoRegister(student.id)}
                >
                  editar
                </ButtonEdit>
              </td>
              <td>
                <ButtonDelete
                  type="button"
                  onClick={() => handleDeleteRegister(student)}
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
