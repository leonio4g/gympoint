import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  AnswerContainer,
  HelpOrderCard,
  Header,
  Title,
  Time,
  Content,
} from './styles';

export default function HelpShow({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  const timeQuestion = useMemo(
    () =>
      formatRelative(parseISO(helpOrder.createdAt), new Date(), {
        locale: pt,
      }),
    [helpOrder.createdAt]
  );

  const timeAnswer = useMemo(
    () =>
      helpOrder.answer_at
        ? formatRelative(parseISO(helpOrder.answer_at), new Date(), {
            locale: pt,
          })
        : '',
    [helpOrder.answer_at]
  );

  return (
    <Container>
      <HelpOrderCard>
        <Header>
          <Title>PERGUNTA</Title>
          <Time>{timeQuestion}</Time>
        </Header>
        <Content>{helpOrder.question}</Content>
        {helpOrder.answer && (
          <AnswerContainer>
            <Header>
              <Title>RESPOSTA</Title>
              <Time>{timeAnswer}</Time>
            </Header>
            <Content>{helpOrder.answer}</Content>
          </AnswerContainer>
        )}
      </HelpOrderCard>
    </Container>
  );
}

HelpShow.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

HelpShow.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={30} color="#ee4e62" />
    </TouchableOpacity>
  ),
});
