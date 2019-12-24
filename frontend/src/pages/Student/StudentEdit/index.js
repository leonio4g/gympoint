import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Container, Header, Label, Content } from './styles';
import { studentUpdateRequest } from '~/store/modules/students/actions';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome Obrigatório'),
  email: Yup.string()
    .email('Insira e-mail Valido')
    .required('O email e Obrigatório'),
  age: Yup.string().required('A idade e obrigatória'),
  weight: Yup.string().required('O peso e Obrigatório'),
  height: Yup.string().required('A altura e Obrigatória'),
});

export default function StudentEdit() {
  const dispatch = useDispatch();
  const student = useSelector(state => state.students.students);

  async function handleSubmit(data) {
    data.id = student.id;
    dispatch(studentUpdateRequest(data));
  }

  function handleBack() {
    history.push('/students');
  }

  return (
    <Container>
      <Header>
        <p>Edição de Aluno</p>
        <div>
          <button id="voltar" type="button" onClick={handleBack}>
            Voltar
          </button>
          <button id="salvar" type="submit" form="formsave">
            Salvar
          </button>
        </div>
      </Header>
      <Content>
        <Form
          initialData={student}
          id="formsave"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <div id="column">
            <Label>Nome Completo</Label>
            <Input name="name" type="name" placeholder="Nome do Aluno" />
            <Label>Endereço de Email</Label>
            <Input name="email" type="email" placeholder="E-mail do Aluno" />
          </div>
          <div id="bottom">
            <div id="row">
              <div>
                <Label>Idade</Label>
                <Input name="age" type="age" placeholder="Idade do Aluno" />
              </div>
              <div>
                <Label>Peso (em kg)</Label>
                <Input
                  name="weight"
                  type="weight"
                  placeholder="Peso do Aluno"
                />
              </div>
              <div>
                <Label>Altura</Label>
                <Input
                  name="height"
                  type="height"
                  placeholder="Altura do Aluno"
                />
              </div>
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
