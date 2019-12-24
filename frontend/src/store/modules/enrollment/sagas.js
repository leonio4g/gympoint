import { takeLatest, call, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

export function* enrollmentUpdate({ payload }) {
  try {
    const { id, start_date, students_id, plan_id } = payload.data;

    yield call(api.put, `enrollments/${id}`, {
      start_date,
      students_id,
      plan_id,
    });

    toast.success('Matricula Editada com Sucesso');

    history.push('/register');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}
export default all([
  takeLatest('@enrollment/ENROLLMENT_UPDATE_REQUEST', enrollmentUpdate),
]);
