import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 5px auto;
  padding: 0 30px;
  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
  }
`;
export const Content = styled.div`
  padding: 30px;
  background: #ffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  align-self: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    input {
      width: 99%;
      margin-bottom: 5px;
    }
    input[disabled] {
      background: #ddd;
    }

    div#column {
      display: flex;
      flex-direction: column;
    }

    div#row {
      display: flex;
      flex-direction: row;
      div {
        margin-right: 9px;
        width: 100%;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  max-width: 1200px;
  width: 100%;

  p {
    font-size: 25px;
    font-weight: bold;
    color: #444444;
  }

  button {
    height: 35px;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    transition: background 0.2s;
    width: 142px;
  }
  button#voltar {
    background: #bcbcbc;
    margin-right: 10px;
    &:hover {
      background: ${darken(0.04, '#bcbcbc')};
    }
  }
  button#salvar {
    text-align: center;
    background: #ee4b64;
    &:hover {
      background: ${darken(0.02, '#ee4d64')};
    }
  }
`;

export const Label = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 13px;

  color: #444444;
  margin-top: 6px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
