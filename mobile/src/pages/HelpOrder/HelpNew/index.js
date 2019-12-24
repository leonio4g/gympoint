import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, FormInput, SubmitButton } from './styles';
import api from '~/services/api';

export default function HelpNew({ navigation }) {
  const student = useSelector(state => state.auth.student);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    if (!question) {
      Alert.alert('Falha ao enviar', 'Pergunta obrigatória');
      setLoading(false);
      return;
    }

    try {
      await api.post(`student/${student.id}/help-orders`, { question });
      navigation.navigate('HelpList');
    } catch (error) {
      Alert.alert('Falha ao enviar', 'Erro ao enviar pergunta');
      setLoading(false);
    }
  }

  return (
    <Container>
      <Form>
        <FormInput
          keyBoardType="text"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu pedido de ajuda"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={question}
          onChangeText={setQuestion}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Enviar Pedido
        </SubmitButton>
      </Form>
    </Container>
  );
}

HelpNew.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

HelpNew.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={30} color="#ee4e62" />
    </TouchableOpacity>
  ),
});
