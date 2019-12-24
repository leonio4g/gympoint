import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Container, Header, Label, Content } from './styles';
import { formatPrice } from '~/util/format';
import { planUpdateRequest } from '~/store/modules/Plans/actions';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('Title Obrigatório'),
  duration: Yup.string().required('A duração e Obrigatório'),
  price: Yup.string().required('O preço e obrigatório'),
});

export default function PlanEdit() {
  const plan = useSelector(state => state.plans.plans);
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');

  const [duration, setDuration] = useState('');
  const [priceTotal, setPriceTotal] = useState('');
  console.tron.log(plan);

  useEffect(() => {
    function loadPrice() {
      setDuration(plan.duration);
      setPrice(plan.price);
    }
    loadPrice();
  }, [setDuration, setPrice, plan.duration, plan.price]);

  useEffect(() => {
    setPriceTotal(duration * price);
    formatPrice(priceTotal);
  }, [duration, price, priceTotal]);

  async function handleSubmit(data) {
    data.id = plan.id;
    dispatch(planUpdateRequest(data));
  }

  function handleBack() {
    history.push('/plans');
  }

  return (
    <Container>
      <Header>
        <p>Edição de Plano</p>
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
          initialData={plan}
          id="formsave"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <div id="column">
            <Label>Titulo do Plano</Label>
            <Input name="title" type="name" />
          </div>
          <div id="bottom">
            <div id="row">
              <div>
                <Label>Duração (em meses)</Label>
                <Input
                  name="duration"
                  type="number"
                  onChange={e => setDuration(e.target.value)}
                />
              </div>
              <div>
                <Label>Preço Mensal</Label>
                <Input
                  name="price"
                  type="number"
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div>
                <Label>Preço Total</Label>
                <Input
                  name="total_price"
                  readOnly
                  disabled
                  value={priceTotal}
                />
              </div>
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
