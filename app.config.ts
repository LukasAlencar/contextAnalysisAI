import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

// Exporta a função de configuração, com tipagem adequada
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "contextAnalysisAI",
  slug: "contextAnalysisAI",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    API_KEY: process.env.API_KEY || "default_api_key",
  },
});
