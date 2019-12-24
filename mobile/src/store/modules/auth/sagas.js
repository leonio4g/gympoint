import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { signInSuccess, signFailure } from './actions';
import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const response = yield call(api.post, 'sessions/student', {
      email: payload.email,
    });
    console.tron.log(payload);
    const { token, student } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, student));
  } catch (err) {
    Alert.alert(
      'Falha na Autenticação',
      'Houve erro no Login, Verifique Seus dados'
    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
