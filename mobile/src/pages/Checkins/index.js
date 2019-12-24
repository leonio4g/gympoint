import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Header from '~/components/Header';
import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  Content,
  CheckButton,
  CheckList,
  CheckinItem,
  Number,
  CheckDate,
} from './styles';

export default function Checkins() {
  const dispatch = useDispatch();
  const [checkin, setCheckin] = useState([]);
  const [loading, setLoading] = useState(true);
  const student = useSelector(state => state.auth.student);

  async function loadListChekins(id) {
    setLoading(true);

    const response = await api.get(`student/${id}/checkins`);

    const data = response.data.map(check => ({
      ...check,
      time: formatRelative(parseISO(check.createdAt), new Date(), {
        locale: pt,
      }),
    }));
    setCheckin(data);
    setLoading(false);
  }

  useEffect(() => {
    console.tron.log(student);
    const { id } = student;

    loadListChekins(id);
  }, [student]);

  async function handleCheckin() {
    const { id } = student;
    try {
      await api.post(`student/${id}/checkins`);
      loadListChekins(id);
      Alert.alert('Sucesso', 'Check-in Realizado com Sucesso');
    } catch (err) {
      Alert.alert('Falha ao Check-in', err.response.data.error);
    }
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <Header onLogout={handleSignOut} />
        <CheckButton onPress={handleCheckin}>Novo Check-in</CheckButton>
        {loading ? (
          <ActivityIndicator size="large" color="#999" />
        ) : (
          <CheckList
            data={checkin}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <CheckinItem>
                <Number>Check-in #{index + 1}</Number>
                <CheckDate>{item.time}</CheckDate>
              </CheckinItem>
            )}
          />
        )}
      </Content>
    </Container>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Checkins',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
