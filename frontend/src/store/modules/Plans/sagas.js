import { takeLatest, call, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

export function* planUpdate({ payload }) {
  try {
    const { id, title, duration, price } = payload.data;

    yield call(api.put, `plans/${id}`, {
      title,
      duration,
      price,
    });

    toast.success('Plano Editado com Sucesso');

    history.push('/plans');
  } catch (err) {
    toast.error('Falha ao Editar Plano, Verifique os dados');
  }
}
export default all([takeLatest('@plan/PLAN_UPDATE_REQUEST', planUpdate)]);
