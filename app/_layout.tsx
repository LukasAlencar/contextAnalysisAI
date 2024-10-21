import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { NAV_THEME } from '~/lib/constants';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { ThemeToggle } from '~/components/ThemeToggle';
import { useColorScheme } from '~/lib/useColorScheme';
import { useAnalyse } from '~/src/hooks/useAnalyse';
import * as SplashScreen from 'expo-splash-screen';
import { Input } from '~/components/ui/input';
import { Text } from "~/components/ui/text";
import { Platform } from 'react-native';
import { 
  Inter_900Black, 
  Inter_700Bold, 
  Inter_500Medium, 
  Inter_400Regular, 
  useFonts 
} from '@expo-google-fonts/inter';
import { Button } from '~/src/components/ui/button';
import { cn } from '~/src/lib/utils';
import { SearchCheck } from 'lucide-react-native';
import { Card } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

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
    <ThemeProvider value={isDarkColorScheme ? LIGHT_THEME : DARK_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <View className='w-screen bg-background h-full'>
          <View className="absolute top-20 right-8">
            <ThemeToggle />
          </View>

          {/* Conteúdo centralizado */}
          <View className="flex flex-col justify-center gap-y-4 px-10 h-full">
            <Text className="text-2xl text-primary font-regular text-center mb-5">
              Análise de Texto
            </Text>

            <Input
              placeholder="Digite o contexto"
              value={context}
              onChangeText={setContext}
              className='rounded-lg text-gray-500'
            />

            <Input
              placeholder="Digite o texto"
              value={inputText}
              onChangeText={setInputText}
              className='rounded-lg text-gray-500'
            />

            <Button className='mt-5 rounded-lg' onPress={onSubmit} disabled={loading}>
              <Text>{loading ? <ActivityIndicator size="small" color="#ffffff" /> : 'Analisar'}</Text>
            </Button>

            {error && <Text>Erro: {error}</Text>}

            {(
              <Card className='mt-5 p-3'>
                <Text className='text-center mb-3 text-primary'>{data?.sentimento}</Text>
                <Separator className='h-0.5 mb-4'/>
                <Text className='text-gray-500 text-justify'>{data?.explicacao}</Text>
              </Card>
            )}
          </View>
        </View>
      </ThemeProvider>

  );
};

export default MyComponent;
