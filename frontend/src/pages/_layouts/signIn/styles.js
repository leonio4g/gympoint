import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 380px;
  text-align: center;
  background: #fff;
  padding: 50px 30px;
  border-radius: 5px;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    input {
      margin: 0 0 10px;
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      padding: 0 15px;
      font-weight: bold;
      background: #ee4b64;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.2, '#ee4b64')};
      }
    }
  }
`;
