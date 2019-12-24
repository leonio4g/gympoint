import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import SessionStudentController from './app/controllers/SessionStudentController';

import authMiddleware from './app/middlewares/auth';
import adminCheck from './app/middlewares/admincheck';
import authStudent from './app/middlewares/authStudent';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/sessions/student', SessionStudentController.store);

routes.post('/student/:id/checkins', authStudent, CheckinController.store);
routes.get('/student/:id/checkins', authStudent, CheckinController.index);
routes.get('/student/:id/help-orders', authStudent, HelpOrderController.show);
routes.post('/student/:id/help-orders', authStudent, HelpOrderController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/student/help-orders', HelpOrderController.index);
routes.put('/student/help-orders/:id/answer', HelpOrderController.update);

routes.use(adminCheck);

routes.get('/student', StudentsController.index);
routes.post('/student', StudentsController.store);
routes.delete('/student/:id', StudentsController.delete);
routes.put('/student/:id', StudentsController.update);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

export default routes;
