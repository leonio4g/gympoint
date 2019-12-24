import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { formatPrice } from '~/util/format';
import { Container, Header, Label, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('Title Obrigatório'),
  duration: Yup.string().required('A duração e Obrigatório'),
  price: Yup.string().required('O preço e obrigatório'),
});

export default function PlanCreate() {
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [priceTotal, setPriceTotal] = useState('');

  useEffect(() => {
    setPriceTotal(duration * price);
    formatPrice(priceTotal);
  }, [duration, price, priceTotal]);

  async function handleSubmit(data) {
    const { title } = data;
    try {
      await api.post('plans', {
        title,
        duration,
        price,
      });
      toast.success('Plano Cadastrado com Sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Falha ao Cadastrar, Verifique os dados');
    }
  }

  function handleBack() {
    history.push('/plans');
  }

  return (
    <Container>
      <Header>
        <p>Cadastro de Plano</p>
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
            <Label>Titulo do Plano</Label>
            <Input name="title" type="text" />
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
                  disabled
                  value={priceTotal}
                  type="number"
                />
              </div>
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
