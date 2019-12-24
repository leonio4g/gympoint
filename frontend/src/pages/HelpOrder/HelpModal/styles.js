import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
  span {
    color: #ee4d64;
    align-self: self-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
  div {
    font-size: 14px;
    color: #444444;
    font-weight: bold;
  }
  p {
    font-size: 16px;
    color: #666666;
    text-align: justify;
    margin-top: 14px;
    margin-bottom: 14px;
  }
  textarea {
    margin-top: 20px !important;
    padding: 0 10px;
    padding-top: 5px;
    margin: 0 0 10px;
    height: 150px;
    width: 100%;
    border-radius: 4px;
    border: 0.8px solid #dddddd;
    background: #ffff;
    color: #454444;
    &::placeholder {
      color: #999999;
    }
  }
  button {
    margin: 5px 0 0;
    height: 44px;
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: backdround 0.2s;
    &:hover {
      background: ${darken(0.02, '#ee4c63')};
    }
  }
`;
