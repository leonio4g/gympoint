import React, { useEffect, useState, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { addMonths, format } from 'date-fns';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { formatPrice } from '~/util/format';

import ReactSelect from '../ReactSelect';
import DatePickerInput from '~/components/DatePickerInput';
import ReactAsyncSelect from '../ReactAsyncSelect';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Header, Label, Content } from './styles';

const schema = Yup.object().shape({
  students_id: Yup.string().required('Seleção Nome Obrigatório'),
  plan_id: Yup.string().required('Seleção de Plano Obrigatório'),
  start_date: Yup.date().required('Escolha da Data Inicial obrigatória'),
});

export default function EnrollmentCreate() {
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [planSelect, setPlanSelect] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlans(response.data);
    }

    loadPlans();
  }, [setPlans]);

  const endDate = useMemo(() => {
    if (planSelect !== '') {
      setTotalPrice(formatPrice(planSelect.duration * planSelect.price));
    }

    if (startDate !== null && planSelect !== '') {
      const endDateFormatted = addMonths(startDate, planSelect.duration);

      return format(endDateFormatted, "dd'/'MM'/'Y");
    }
    return '';
  }, [planSelect, startDate]);

  const filterStudents = inputValue => {
    async function loadStudents() {
      const response = await api.get(`student`, {
        params: { name: inputValue },
      });

      return response.data;
    }

    return loadStudents();
  };

  async function handleSubmit(data) {
    try {
      await api.post('enrollments', data);

      toast.success('Matricula Efetuada com Sucesso');
      history.push('/register');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function handleBack() {
    history.push('/register');
  }

  const loadOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterStudents(inputValue));
      }, 100);
    });

  return (
    <Container>
      <Header>
        <p>Cadastro de Matricula</p>
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
        <Form id="formsave" schema={schema} onSubmit={handleSubmit}>
          <div id="column">
            <Label>Aluno</Label>
            <ReactAsyncSelect name="students_id" options={loadOptions} />
          </div>
          <div id="row">
            <div id="inputRow">
              <Label>Plano</Label>
              <div id="select">
                <ReactSelect
                  className="basic-sigle"
                  classNamePrefix="Selecione Plano"
                  onChange={plan => setPlanSelect(plan)}
                  options={plans}
                  name="plan_id"
                />
              </div>
            </div>
            <div id="inputRow">
              <Label>Data de inicio</Label>
              <DatePickerInput
                name="start_date"
                onChangeDate={data => setStartDate(data)}
              />
            </div>
            <div id="inputRow">
              <Label>Data de Termino</Label>
              <Input name="end_date" type="text" value={endDate} readOnly />
            </div>
            <div id="inputRow">
              <Label>Preço Total</Label>
              <Input
                name="total_price"
                type="text"
                value={totalPrice}
                readOnly
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
