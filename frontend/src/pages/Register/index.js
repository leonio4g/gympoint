import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { MdCheckCircle, MdHighlightOff } from 'react-icons/md';
import PopoverEdit from '~/components/Popover/PopoverEdit';
import PopoverDelete from '~/components/Popover/PopoverDelete';
import api from '~/services/api';
import history from '~/services/history';
import { enrollmentData } from '~/store/modules/enrollment/actions';
import { Container, Header, EnrollmentTable, Content } from './styles';

export default function Enrollment() {
  const dispatch = useDispatch();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function listEnrollment() {
      const response = await api.get('enrollments', {
        params: { page: 1 },
      });

      const data = response.data.map(enrollment => ({
        ...enrollment,
        startFormatted: format(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
        endFormatted: format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
      }));

      setEnrollments(data);
    }
    listEnrollment();
  }, [setEnrollments]);

  function handleRegister() {
    history.push('/register/create');
  }

  function handleEdit(enrollment) {
    dispatch(enrollmentData(enrollment));
    history.push('/register/edit');
  }

  async function handleDelete(enrollment) {
    const date = parseISO(enrollment.start_date);
    const confirm = window.confirm(`Cofirma que Quer deletar ${date}`);//eslint-disable-line
    if (confirm) {
      await api.delete(`enrollments/${enrollment.id}`);

      setEnrollments(
        enrollments.filter(e => {
          return e.id !== enrollment.id;
        })
      );
    }
  }

  return (
    <Container>
      <Header>
        <p>Gerenciando Matriculas</p>
        <div>
          <button type="submit" onClick={handleRegister}>
            Cadastrar
          </button>
        </div>
      </Header>
      <Content>
        <EnrollmentTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Plano</th>
              <th>Inicio</th>
              <th>Termino</th>
              <th>Ativa</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.student.name}</td>
                <td>{enrollment.plan.title}</td>
                <td>{enrollment.startFormatted}</td>
                <td>{enrollment.endFormatted}</td>
                <td>
                  {enrollment.active === true ? (
                    <MdCheckCircle size={20} color="#42cb59" />
                  ) : (
                    <MdHighlightOff size={20} color="#de3b3b" />
                  )}
                </td>
                <td id="actions">
                  <button
                    id="edit"
                    type="button"
                    onClick={() => handleEdit(enrollment)}
                  >
                    <PopoverEdit />
                  </button>
                  <button
                    id="delete"
                    type="button"
                    onClick={() => handleDelete(enrollment)}
                  >
                    <PopoverDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </EnrollmentTable>
      </Content>
    </Container>
  );
}
