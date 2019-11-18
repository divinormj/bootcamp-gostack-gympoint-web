import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { Container, User, ToLink } from './styles';
import logo from '~/assets/logo-header.png';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <img src={logo} alt="GoBarber" />
        <ToLink to="/student-list" active={path.indexOf('student') > 0}>
          ALUNOS
        </ToLink>
        <ToLink to="/plan-list" active={path.indexOf('plan') > 0}>
          PLANOS
        </ToLink>
        <ToLink to="/enrollment-list" active={path.indexOf('enrollment') > 0}>
          MATRÍCULAS
        </ToLink>
        <ToLink to="/help" active={path.indexOf('help') > 0}>
          PEDIDOS DE AUXÍLIO
        </ToLink>
      </nav>
      <aside>
        <User>
          <div>
            <strong>Administrador</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </div>
        </User>
      </aside>
    </Container>
  );
}
