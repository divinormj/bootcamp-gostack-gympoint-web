import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { signRequest } from '~/store/modules/auth/actions';
import { Container } from './styles';
import logo from '~/assets/gympoint.svg';

export default function Sign() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Informe um e-mail válido!')
      .required('O e-mail deve ser informado!'),
    password: Yup.string().required('A senha deve ser informada!'),
  });

  function handleSubmit({ email, password }) {
    dispatch(signRequest(email, password));
  }

  return (
    <Container>
      <div>
        <img src={logo} alt="GymPoint" />
        <Form schema={schema} onSubmit={handleSubmit}>
          <strong>SEU E-MAIL</strong>
          <Input name="email" type="email" placeholder="exemplo@email.com" />

          <strong>SUA SENHA</strong>
          <Input name="password" type="password" placeholder="********" />

          <button type="submit">
            {loading ? 'Carregando' : 'Entrar no sistema'}
          </button>
        </Form>
      </div>
    </Container>
  );
}
