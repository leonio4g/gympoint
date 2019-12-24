import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  Container,
  ButtonNewHelp,
  HelpOrdersList,
  HelpOrderItem,
  Header,
  Status,
  Time,
  Content,
  ContentContainer,
} from './styles';
import api from '~/services/api';

function HelpList({ navigation, isFocused }) {
  const student = useSelector(state => state.auth.student);
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHelpOrders(id) {
    setLoading(true);
    const response = await api.get(`student/${id}/help-orders`);

    const data = response.data.map(help => ({
      ...help,
      time: formatRelative(
        parseISO(help.answer_at ? help.answer_at : help.createdAt),
        new Date(),
        { locale: pt }
      ),
    }));
    setHelpOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders(student.id);
    }
  }, [isFocused, student]);

  function handleHelpOrder(helpOrder) {
    navigation.navigate('HelpShow', { helpOrder });
  }

  function handleNewHelp() {
    navigation.navigate('HelpNew');
  }

  return (
    <Container>
      <ButtonNewHelp onPress={handleNewHelp}>
        Novo pedido de auxílio
      </ButtonNewHelp>
      {loading ? (
        <ActivityIndicator size="large" color="#999" />
      ) : (
        <HelpOrdersList
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <HelpOrderItem onPress={() => handleHelpOrder(item)}>
              <Header>
                <Status answered={item.answer_at}>
                  {item.answer_at ? 'Respondido' : 'Sem resposta'}
                </Status>
                <Time>{item.time}</Time>
              </Header>
              <ContentContainer>
                <Content numberOfLines={3}>{item.question}</Content>
              </ContentContainer>
            </HelpOrderItem>
          )}
        />
      )}
    </Container>
  );
}

HelpList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpList);
