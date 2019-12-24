import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Content = styled.div`
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  padding: 30px;
  max-width: 1200px;
  width: 100%;
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
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    transition: backdround 0.2s;
    width: 142px;
    &:hover {
      background: ${darken(0.02, '#ee4d64')};
    }
  }
  input {
    background: #ffffff;
    border-color: black;
    border: 0px;
    border-radius: 4px;
    height: 36px;
    padding: 0 15px;
    color: #444444;
    border: 0.8px solid #dddddd;
    margin-left: 15px;
    text-align: center;
    &::placeholder {
      color: #999999;
    }
  }
`;

export const StudentTable = styled.table`
  width: 100%;

  thead th {
    color: #333333;
    padding: 12px;
    text-align: left;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    color: #333;
  }

  tbody td#actions {
    text-align: right;
  }

  button {
    background: none;
    border: 0;
    padding: 15px;
  }
  button#edit {
    color: #4d85ee;
  }
  button#delete {
    color: #de3b3b;
  }
`;
