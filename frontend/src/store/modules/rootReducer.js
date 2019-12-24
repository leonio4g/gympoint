import { combineReducers } from 'redux';

import auth from './auth/reducer';
import students from './students/reducer';
import plans from './Plans/reducer';
import enrollment from './enrollment/reducer';
import help from './help/reducer';

export default combineReducers({
  auth,
  students,
  plans,
  enrollment,
  help,
});
