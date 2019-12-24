import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Register from '~/pages/Register';
import RegisterCreate from '~/pages/Register/RegisterCreate';
import RegisterEdit from '~/pages/Register/RegisterEdit';
import Student from '~/pages/Student';
import StudentEdit from '~/pages/Student/StudentEdit';
import StudentCreate from '~/pages/Student/StudentCreate';
import Plan from '~/pages/Plan';
import PlanCreate from '~/pages/Plan/PlansCreate';
import PlanEdit from '~/pages/Plan/PlanEdit';
import HelpOrder from '~/pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={Register} isPrivate />
      <Route path="/register/create" component={RegisterCreate} isPrivate />
      <Route path="/register/edit" component={RegisterEdit} isPrivate />
      <Route exact path="/students" component={Student} isPrivate />
      <Route path="/students/edit" component={StudentEdit} isPrivate />
      <Route path="/students/create" component={StudentCreate} isPrivate />
      <Route exact path="/plans" component={Plan} isPrivate />
      <Route path="/plans/create" component={PlanCreate} isPrivate />
      <Route path="/plans/edit" component={PlanEdit} isPrivate />
      <Route exact path="/help-order" component={HelpOrder} isPrivate />
    </Switch>
  );
}
