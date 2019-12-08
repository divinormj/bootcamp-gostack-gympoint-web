import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import ReactDatePicker from 'react-datepicker';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import 'react-datepicker/dist/react-datepicker.css';
import { addMonths, parseISO } from 'date-fns';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import {
  Header,
  DataEntry,
  DataEntryInput,
  DataEntryRow,
  DataEntrySelect,
} from './styles';

export default function EnrollmentForm() {
  const enrollment_id = useLocation().state.id;
  const [title, setTitle] = useState('');
  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadEnrollment() {
      if (enrollment_id) {
        const response = await api.get(`enrollments/${enrollment_id}`);

        const data = {
          ...response.data,
          start_date: parseISO(response.data.start_date),
          end_date: parseISO(response.data.end_date),
          student: {
            value: response.data.student.id,
            label: response.data.student.name,
          },
          plan: {
            ...response.data.plan,
            value: response.data.plan.id,
            label: response.data.plan.title,
          },
          priceFormatted: formatPrice(response.data.price),
        };

        setEnrollment(data);

        setTitle('Edição de matrícula');
      } else {
        setTitle('Cadastro de matrícula');
      }
    }

    async function loadPlans() {
      const response = await api.get('plans');
      const data = response.data.map(plan => ({
        ...plan,
        value: plan.id,
        label: plan.title,
      }));

      setPlans(data);

      loadEnrollment();
    }

    loadPlans();
  }, []); // eslint-disable-line

  function handleGoList() {
    history.push('/enrollment-list');
  }

  async function loadStudents(name) {
    try {
      const response = await api.get('students', {
        params: { student_name: name },
      });

      const data = response.data.map(student => ({
        value: student.id,
        label: student.name,
      }));

      return data;
    } catch (err) {
      return [];
    }
  }

  function setStudent(student) {
    const data = {
      ...enrollment,
      student_id: student.value,
      student,
    };

    setEnrollment(data);
  }

  function setPlan(plan) {
    const data = {
      ...enrollment,
      plan_id: plan.value,
      plan,
      end_date: enrollment.start_date
        ? addMonths(enrollment.start_date, plan.duration)
        : null,
      price: plan.total_price,
      priceFormatted: formatPrice(plan.total_price),
    };

    setEnrollment(data);
  }

  function setStartDate(date) {
    const data = {
      ...enrollment,
      start_date: date,
      end_date: addMonths(date, enrollment.plan.duration),
    };

    setEnrollment(data);
  }

  async function handleSubmit() {
    try {
      if (enrollment.id) {
        await api.put('enrollments', { enrollment });

        toast.info('Registro atualizado com sucesso!');
      } else {
        const response = await api.post('enrollments', enrollment);

        const data = { id: response.data.id, ...enrollment };

        setEnrollment(data);

        toast.info('Registro incluído com sucesso!');

        handleGoList();
      }
    } catch (err) {
      toast.error(
        'Falha ao gravar a matrícula, verifique os dados informados.'
      );
    }
  }

  const selectStyles = (width = 202) => {
    return {
      container: base => ({ ...base, width }),
      control: styles => ({
        ...styles,
        fontSize: '16px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
      }),
      placeholder: styles => ({ ...styles, fontSize: '16px', color: '#666' }),
      input: styles => ({
        ...styles,
        fontSize: '16px',
      }),
    };
  };

  return (
    <>
      <Header>
        <strong>{title}</strong>
        <div>
          <button type="button" onClick={handleGoList}>
            <MdKeyboardArrowLeft size={20} color="#fff" />
            <span>VOLTAR</span>
          </button>
          <button type="button" onClick={handleSubmit}>
            <MdCheck size={20} color="#fff" />
            <span>SALVAR</span>
          </button>
        </div>
      </Header>
      <DataEntry>
        <DataEntryRow>
          <DataEntrySelect>
            <strong>ALUNO</strong>
            {enrollment.id ? (
              <input
                type="text"
                width={840}
                readOnly
                value={enrollment.student.label}
              />
            ) : (
              <AsyncSelect
                styles={selectStyles(840)}
                placeholder="Selecione o aluno"
                cacheOptions
                loadOptions={loadStudents}
                value={enrollment.student}
                onChange={student => setStudent(student)}
              />
            )}
          </DataEntrySelect>
        </DataEntryRow>
        <DataEntryRow>
          <DataEntrySelect>
            <strong>PLANO</strong>
            <Select
              styles={selectStyles(202)}
              placeholder="Selecione o plano"
              options={plans}
              value={enrollment.plan}
              onChange={plan => setPlan(plan)}
            />
          </DataEntrySelect>
          <DataEntryInput>
            <strong>DATA DE INÍCIO</strong>
            <ReactDatePicker
              selected={enrollment.start_date}
              onChange={date => setStartDate(date)}
            />
          </DataEntryInput>
          <DataEntryInput>
            <strong>DATA DE TÉRMINO</strong>
            <ReactDatePicker selected={enrollment.end_date} readOnly />
          </DataEntryInput>
          <DataEntryInput>
            <strong>VALOR FINAL</strong>
            <input type="text" readOnly value={enrollment.priceFormatted} />
          </DataEntryInput>
        </DataEntryRow>
      </DataEntry>
    </>
  );
}
