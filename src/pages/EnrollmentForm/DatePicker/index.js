import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name }) { // eslint-disable-line
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        ref={ref}
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        locale={pt}
      />
      {error && <span>{error}</span>}
    </>
  );
}
