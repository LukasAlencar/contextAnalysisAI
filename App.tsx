import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useAnalyse } from './src/hooks/useAnalyse';
import { ThemeToggle } from '~/components/ThemeToggle';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import { NAV_THEME } from '~/lib/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '~/lib/useColorScheme';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { Text } from "~/components/ui/text";
import { Platform } from 'react-native';
import { 
  Inter_900Black, 
  Inter_700Bold, 
  Inter_500Medium, 
  Inter_400Regular, 
  useFonts 
} from '@expo-google-fonts/inter';
import { Input } from '~/components/ui/input';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

const MyComponent: React.FC = () => {

  const { data, loading, error, handleAnalisar } = useAnalyse();
  const [inputText, setInputText] = useState('');
  const [context, setContext] = useState('');

  const onSubmit = async () => {
    if (inputText && context) {
      await handleAnalisar(inputText, context);
    }
  };
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  // Load fonts using useFonts hook from expo-google-fonts
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });

    useEffect(() => {
      const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      
      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background');
      }
      
      if (!storedTheme) {
        await AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      
      const colorTheme = storedTheme === 'dark' ? 'dark' : 'light';
        if (colorTheme !== colorScheme) {
          setColorScheme(colorTheme);
          setAndroidNavigationBar(colorTheme);
        }
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
      };

      loadTheme().finally(() => {
        if (fontsLoaded && isColorSchemeLoaded) {
          SplashScreen.hideAsync();
        }
      });
  }, [colorScheme, setColorScheme, fontsLoaded, isColorSchemeLoaded]);

  // Show nothing while fonts and color scheme are loading
  if (!fontsLoaded || !isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      {
        <View style={styles.container}>
          <ThemeToggle />
          <Text style={styles.title}>Análise de Texto</Text>

          <Input
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
      }
    </ThemeProvider>
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
