import {
  Keyboard,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParams} from '../../navigation';
import {useForm} from '../../hooks';

import {AuthContext} from '../../context';

import {Wrapper} from '../../components';

import {
  Button,
  Headline,
  HelperText,
  Subheading,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import React = require('react');

interface Props extends StackScreenProps<AuthStackParams, any> {}

export function LoginScreen({navigation}: Props) {
  const {login, errorMessage, removeError, status} = useContext(AuthContext);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);

  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    setLoading(true);

    removeError();

    Keyboard.dismiss();
    login({email, password});

    setLoading(false);
  };

  useEffect(() => {
    if (errorMessage) {
      setLoading(false);
    }
  }, [errorMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../imgs/Grupo_2280.png')}
        style={{width: '100%', alignSelf: 'flex-start'}}
        resizeMode="contain"
      />
      <Headline
        style={{fontWeight: 'bold',
          marginTop: 25,
          marginBottom: 0,
          fontFamily: 'Lato-Bold',
          marginHorizontal: 25,
        }}>
        ¡Bienvenido!
      </Headline>
      <Subheading
        style={{
          fontWeight: 'light',
          marginTop: 10,
          marginBottom: 35,
          fontFamily: 'Lato-Regular',
          marginHorizontal: 25,
        }}>
        Ingresa tu correo electrónico y password para ingresar.
      </Subheading>
      <ScrollView 
        style={{marginHorizontal: 25,marginVertical: 5, height: 200}}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        <TouchableWithoutFeedback>
          <View>
            <Text
              style={{
                marginTop: 10,
                marginBottom: -20,
                fontFamily: 'Lato-Bold',
              }}>
              EMAIL
            </Text>
            <TextInput
              error={!!errorMessage}
              label={email.length > 0 ? '' : 'miusuario@email.com'}
              onChangeText={text => onChange(text, 'email')}
              style={{
                width: '100%',
                marginTop: 20,
                backgroundColor: theme.colors.background,
                fontFamily: 'Lato-Regular',
              }}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              right={<TextInput.Icon icon="mail" />}
            />
            <HelperText type="error" visible={!!errorMessage}>
              {errorMessage}
            </HelperText>
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: 0,
                marginBottom: 0,
                fontFamily: 'Lato-Bold',
              }}>
              CONTRASEÑA
            </Text>
            <TextInput
              error={!!errorMessage}
              onChangeText={text => onChange(text, 'password')}
              right={<TextInput.Icon icon="eye" onPress={() => setHidden(!hidden)} />}
              secureTextEntry={hidden}
              style={{
                width: '100%',
                marginTop: 0,
                backgroundColor: theme.colors.background,
                paddingTop: -10,
                fontFamily: 'Lato-Regular',
              }}
              value={password}
              autoCapitalize="none"
              
            />
            <HelperText type="error" visible={!!errorMessage}>
              {errorMessage}
            </HelperText>
            {/* <Button
              compact
              onPress={() => navigation.navigate('CheckCode', {})}
              style={{ alignSelf: 'flex-end', paddingHorizontal: 0, marginTop: 10 }}
              uppercase={false}
            >
              ¿Tienes un código?
            </Button>*/}

            <Button
              disabled={loading || status === 'checking'}
              loading={loading}
              mode="contained"
              onPress={handleLogin}
              style={{
                marginTop: 0,
                width: '100%',
                backgroundColor: theme.colors.secondary,
                borderRadius: 40,
                fontFamily: 'Lato-Regular',
              }}>
              Iniciar Sesión
            </Button>
            <Button
              onPress={() => navigation.navigate('Register')}
              mode="contained"
              style={{
                width: '100%',
                marginTop: 5,
                backgroundColor: theme.colors.primary,
                borderRadius: 40,
                fontFamily: 'Lato-Regular',
              }}>
              ¡Registrarse Gratis!
            </Button>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('SendCode')}
              style={{
                width: '100%',
                marginTop: 5,
                backgroundColor: theme.colors.text,
                borderRadius: 40,
                fontFamily: 'Lato-Regular',
              }}>
              Recuperar contraseña
            </Button>
            <Text
              style={styles.TextTerms}
              onPress={() => navigation.navigate('TermsConditions')}>
              Ingresando aceptas nuestros Términos y Condiciones
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TextTerms: {
    marginTop: 20,
    fontFamily: 'Lato-Bold',
    color: '#0093D0',
    fontSize: 16,
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  scrollView: {
    marginHorizontal: 25,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
