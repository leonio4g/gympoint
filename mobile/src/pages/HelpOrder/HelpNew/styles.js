import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: #f2f2f2;
`;

export const FormInput = styled(Input)`
  height: 300px;
  padding: 20px;
  color: #333;
`;
export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  align-self: stretch;
`;
