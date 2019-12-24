import jwt from 'jsonwebtoken';
import Students from '../models/Students';
import authConfig from '../../config/auth';

class SessionStudentController {
  async store(req, res) {
    const { email } = req.body;

    const student = await Students.findOne({ where: { email } });
    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    const { id, name } = student;

    return res.json({
      student: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionStudentController();
