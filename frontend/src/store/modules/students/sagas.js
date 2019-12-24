import { takeLatest, call, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

export function* studentUpdate({ payload }) {
  try {
    const { id, name, email, age, weight, height } = payload.data;

    yield call(api.put, `student/${id}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    toast.success('Student Editado com Sucesso');

    history.push('/students');
  } catch (err) {
    toast.error('Falha ao Editar Aluno, Verifique os dados');
  }
}
export default all([
  takeLatest('@student/STUDENT_UPDATE_REQUEST', studentUpdate),
]);
