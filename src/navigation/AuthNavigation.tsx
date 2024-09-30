import {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthContext} from '../context';

import {
  CheckCodeScreen,
  LoginScreen,
  RecoverPass,
  RegisterScreen,
  SendCodeScreen,
  Home,
  HomeB,
  TermsConditions,
  ErrorConnection,
} from '../screens';

import PropertiesNavigator from './PropertiesNavigator';
import {useTheme} from 'react-native-paper';

export type AuthStackParams = {
  Home: undefined;
  HomeB: undefined;
  Login: undefined;
  Register: undefined;
  SendCode: undefined;
  CheckCode: {email?: string};
  RecoverPass: {email: string};
  PropertiesNavigation: undefined;
};

const Stack = createStackNavigator<AuthStackParams>();

export function AuthNavigation() {
  const theme = useTheme();
  const {status} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.screenBg,
        },
      }}
      initialRouteName="Home">
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HomeB" component={HomeB} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="SendCode" component={SendCodeScreen} />
          <Stack.Screen name="CheckCode" component={CheckCodeScreen} />
          <Stack.Screen name="RecoverPass" component={RecoverPass} />
          <Stack.Screen name="TermsConditions" component={TermsConditions} />
          <Stack.Screen name="ErrorConnection" component={ErrorConnection} />
        </>
      ) : (
        <Stack.Screen
          name="PropertiesNavigation"
          component={PropertiesNavigator}
        />
      )}
    </Stack.Navigator>
  );
}
