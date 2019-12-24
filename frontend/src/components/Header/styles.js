import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    a {
      font-size: 15px;
      font-weight: bold;
      text-transform: uppercase;
      margin-right: 15px;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-left: 15px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);

    button {
      border: 0;
      background: none;
      color: red;
    }
  }
`;
export const ToLink = styled(Link)`
  padding: 20px;
  font-size: 15px;
  color: ${props => (props.active ? '#999' : '#333')};
`;
