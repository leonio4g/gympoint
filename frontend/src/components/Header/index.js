import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo-gympoint.svg';

import { Container, ToLink } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <Link to="/students">
          <img src={logo} alt="GymPoint" />
        </Link>

        <ToLink to="/students">Aluno</ToLink>
        <ToLink to="/plans">Planos</ToLink>
        <ToLink to="/register">Matriculas</ToLink>
        <ToLink to="/help-order">Pedidos de Auxílios</ToLink>
      </nav>

      <aside>
        <strong>Administrador</strong>
        <button type="button" onClick={handleSignOut}>
          Sair
        </button>
      </aside>
    </Container>
  );
}
