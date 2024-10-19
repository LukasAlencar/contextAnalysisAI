import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useAnalyse } from './src/hooks/useAnalyse'; // Importando o hook

const MyComponent: React.FC = () => {
  const { data, loading, error, handleAnalisar } = useAnalyse();
  const [inputText, setInputText] = useState('');
  const [context, setContext] = useState('');

  const onSubmit = async () => {
    if (inputText && context) {
      await handleAnalisar(inputText, context);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Análise de Texto</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o texto"
        value={inputText}
        onChangeText={setInputText}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite o contexto"
        value={context}
        onChangeText={setContext}
      />

      <Button title={loading ? 'Analisando...' : 'Analisar'} onPress={onSubmit} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.error}>Erro: {error}</Text>}
      
      {data && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Sentimento: {data.sentimento}</Text>
          <Text style={styles.explanation}>Explicação: {data.explicacao}</Text>
        </View>
      )}
    </View>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 10,
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  explanation: {
    fontSize: 14,
    marginTop: 4,
  },
});
