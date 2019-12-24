import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '~/services/api';
import history from '~/services/history';
import { studentData } from '~/store/modules/students/actions';
import PopoverEdit from '~/components/Popover/PopoverEdit';
import PopoverDelete from '~/components/Popover/PopoverDelete';
import { Container, Header, StudentTable, Content } from './styles';

export default function Student() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    async function listStudents() {
      const response = await api.get('student', {
        params: { name: search },
      });

      setStudents(response.data);
    }
    listStudents();
  }, [setStudents, search]);

  function handleRegister() {
    history.push('/students/create');
  }

  function handleSeach(e) {
    setSearch(e.target.value);
  }

  function handleEdit(student) {
    dispatch(studentData(student));
    history.push('/students/edit');
  }

  async function handleDelete(student) {
    const confirm = window.confirm(`Cofirma que Quer deletar ${student.name}`); //eslint-disable-line
    if (confirm) {
      await api.delete(`student/${student.id}`);

      setStudents(
        students.filter(e => {
          return e.id !== student.id;
        })
      );
    }
  }

  return (
    <Container>
      <Header>
        <p>Gerenciando Alunos</p>
        <div>
          <button type="submit" onClick={handleRegister}>
            Cadastrar
          </button>
          <input
            name="name"
            type="text"
            onChange={e => handleSeach(e)}
            placeholder="Buscar Aluno"
          />
        </div>
      </Header>
      <Content>
        <StudentTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Idade</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td id="actions">
                  <button
                    id="edit"
                    type="button"
                    onClick={() => handleEdit(student)}
                  >
                    <PopoverEdit />
                  </button>
                  <button
                    id="delete"
                    type="button"
                    onClick={() => handleDelete(student)}
                  >
                    <PopoverDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentTable>
      </Content>
    </Container>
  );
}
