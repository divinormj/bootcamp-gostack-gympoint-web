import React, { useRef, useEffect, useState } from 'react';
import { useField, Select } from '@rocketseat/unform';

import api from '~/services/api';

export default function SelectStudent({ name, label, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents(search) {
      const response = await api.get('students', {
        params: { student_name: search },
      });

      const data = response.data.map(student => ({
        id: student.id,
        title: student.name,
      }));
      setStudents(data);
    }
    loadStudents();
  }, []);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [fieldName, ref.current]); // eslint-disable-line

  return (
    <>
      <Select name={fieldName} ref={ref} options={students} {...rest} />

      {error && <span>{error}</span>}
    </>
  );
}
