import {NavigationContainer} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {
  DefaultTheme,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';

import { AuthNavigation } from './src/navigation';

import { AuthProvider, PropertiesProvider } from './src/context';
import React = require('react');

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      secondary: string;
      inputBg: string;
      screenBg: string;
      favorite: string;
      danger: string;
      success: string;
    }

    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

const theme = {
  ...DefaultTheme,
  dark: false,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0093D0',
    secondary: '#062E6B',
    inputBg: '#D5D9DE',
    background: '#D5D9DE',
    screenBg: '#D5D9DE',
    text: '#333',
    placeholder: '#666',
    surface: '#171717',
    favorite: '#f9a825',
    danger: '#ef5350',
    success: '#66bb6a',
    transparent: 'rgba(0 0 0 / 0)',
    white: 'rgba(255 255 255 / 1)',
  },
  fontFamily: 'sans-serif',
};

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider
        settings={{
          icon: props => <IonIcons {...props} />,
        }}
        theme={theme}>
        <AuthProvider>
          <PropertiesProvider>
            <AuthNavigation />
            <Text
              style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
                fontWeight: 'bold'
              }}
            >
              {/** 1.1.52 */}
            </Text>
          </PropertiesProvider>
        </AuthProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
