import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import students from './students/sagas';
import plans from './Plans/sagas';
import enrollment from './enrollment/sagas';
import help from './help/sagas';

export default function* rootSaga() {
  return yield all([auth, students, plans, enrollment, help]);
}
