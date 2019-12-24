import React, { useEffect, useState, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { addMonths, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { formatPrice } from '~/util/format';
import ReactSelect from '../ReactSelect';
import DatePickerInput from '~/components/DatePickerInput';
import ReactAsyncSelect from '../ReactAsyncSelect';
import api from '~/services/api';
import history from '~/services/history';
import { enrollmentUpdateRequest } from '~/store/modules/enrollment/actions';

import { Container, Header, Label, Content } from './styles';

const schema = Yup.object().shape({
  students_id: Yup.string().required('Seleção Nome Obrigatório'),
  plan_id: Yup.string().required('Seleção de Plano Obrigatório'),
  start_date: Yup.date().required('Escolha da Data Inicial obrigatória'),
});

export default function EnrollmentCreate() {
  const dispatch = useDispatch();

  const enrollments = useSelector(state => state.enrollment.enrollments);
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [planSelect, setPlanSelect] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [loading, setLoadign] = useState(false);

  useEffect(() => {
    setLoadign(true);
    async function loadlans() {
      const response = await api.get('plans');

      const Select = response.data.find(
        plan => plan.id === enrollments.plan.id
      );

      setPlanSelect(Select);

      setPlans(response.data);
    }

    setTotalPrice(formatPrice(enrollments.price));
    setStartDate(parseISO(enrollments.start_date));

    loadlans();
    setLoadign(false);
  }, [enrollments.plan.id, enrollments.price, enrollments.start_date]);

  const endDate = useMemo(() => {
    if (planSelect !== '' && startDate !== null) {
      const endDateFormatted = addMonths(startDate, planSelect.duration);

      setTotalPrice(formatPrice(planSelect.price * planSelect.duration));

      return format(endDateFormatted, "dd'/'MM'/'Y", { locale: pt });
    }

    if (enrollments && planSelect === '') {
      return format(parseISO(enrollments.end_date), "dd'/'MM'/'Y", {
        locale: pt,
      });
    }

    return '';
  }, [enrollments, planSelect, startDate]);

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
    data.id = enrollments.id;

    dispatch(enrollmentUpdateRequest(data));
  }

  function handleBack() {
    history.push('/register');
  }

  const loadOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterStudents(inputValue));
      }, 1000);
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
        {loading ? (
          'Carregando'
        ) : (
          <Form id="formsave" schema={schema} onSubmit={handleSubmit}>
            <div id="column">
              <Label>Aluno</Label>
              <ReactAsyncSelect
                name="students_id"
                defaultValue={enrollments.student}
                options={loadOptions}
              />
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
                    defaultValue={enrollments.plan}
                  />
                </div>
              </div>
              <div id="inputRow">
                <Label>Data de inicio</Label>

                <DatePickerInput
                  name="start_date"
                  defaultValue={startDate}
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
        )}
      </Content>
    </Container>
  );
}
