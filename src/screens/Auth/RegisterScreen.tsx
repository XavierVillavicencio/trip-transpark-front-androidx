import {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParams} from '../../navigation';
import {useForm} from '../../hooks';
import {publicApi} from '../../api/propertiesApi';
import {errorsTable} from '../../helpers';
import {AuthContext} from '../../context';

import {
  Button,
  Headline,
  HelperText,
  TextInput,
  Text,
  useTheme,
  Checkbox,
} from 'react-native-paper';
import React = require('react');

interface Props extends StackScreenProps<AuthStackParams, any> {}

export function RegisterScreen({navigation}: Props) {
  const {errorMessage, removeError} = useContext(AuthContext);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const [hidden, setHidden] = useState(true);
  const [passConfirm, setPassConfirm] = useState('');
  const [error, setError] = useState('');
  const [customError, setCustomError] = useState('');
  const [checked, setChecked] = useState(false);
  /* Para manejar entre vistas los campos del formulario */
  const [showFirstView, setShowFirstView] = useState(true);

  const handleToggleView = () => {
    setShowFirstView(!showFirstView);
  };

  const {
    email,
    firstname,
    passwordConfirm,
    password,
    cedula,
    celular,
    direccion,
    onChange,
  } = useForm({
    email: '',
    firstname: '',
    passwordConfirm: '',
    password: '',
    cedula: '',
    celular: '',
    direccion: '',
  });

  const styles = StyleSheet.create({
    TextTerms: {
      marginVertical: 5,
      fontFamily: 'Lato-Bold',
      color: '#0093D0',
      fontSize: 14,
    },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    inner: {
      padding: 24,
      flex: 1,
    },
    scrollView: {
      marginHorizontal: 25,
      marginVertical: 5,
    },
    textInput: {
      width: '100%',
      marginTop: -10,
      marginBottom: 3,
      backgroundColor: theme.colors.transparent,
      fontSize: 11,
      fontFamily: 'Lato-Regular',
    },
    textInputLabel: {
      marginVertical: 5,
      fontFamily: 'Lato-Bold',
      fontSize: 11,
    },
  });

  const onPress = () => {
    setChecked(!checked);
  };

  const handleRegister = async () => {
    removeError();
    setError('');
    setCustomError('');
    setLoading(true);
    Keyboard.dismiss();

    try {
      console.info({password});
      console.info({passwordConfirm});
      if (password !== passwordConfirm) {
        setCustomError('Las contraseñas no son las mismas');
        setError('ERR-PASSWORDCONFIRM');
        setLoading(false);
        handleToggleView(); // pasa que cuando es genérico debe regresar a esa pantallita
        return null;
      }
      await publicApi.post('/auth/registerUser', {
        email,
        firstname,
        lastname: 'N/A',
        password,
        direccion,
        cedula,
        celular,
      });

      setLoading(false);

      navigation.navigate('CheckCode', {email});
    } catch (error: any) {
      console.log({error});
        if (error.response.data.code === 'ERR-GENERIC') {
          setCustomError(error.response.data.mensaje);
          handleToggleView(); // pasa que cuando es genérico debe regresar a esa pantallita
        }
        const dump: string = error.response.data.code;
        if (dump === 'AUTH014' || dump === 'AUTH118') {
          console.info({dump});
          handleToggleView(); // pasa que cuando es genérico debe regresar a esa pantallita
        }
        setError(error.response.data.code);
        setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) setLoading(false);
    setCustomError('');
  }, [errorMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../imgs/Grupo_2280.png')}
        style={{width: '80%', alignSelf: 'flex-start', marginHorizontal: 35}}
        resizeMode="stretch"
      />
      <Headline
        style={{
          fontWeight: 'bold',
          marginTop: 5,
          marginBottom: 0,
          fontFamily: 'Lato-Bold',
          marginHorizontal: 25,
        }}>
        Registrar nueva cuenta
      </Headline>
      <View style={styles.inner}>
        {showFirstView && (
          <View>
            <Text style={styles.textInputLabel}>EMAIL</Text>
            <TextInput
              label={email.length > 0 ? '' : 'user@domain.com'}
              onChangeText={text => onChange(text, 'email')}
              style={styles.textInput}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              error={error === 'AUTH014' || error === 'AUTH001'}
            />
            {error === 'AUTH014' && (
              <HelperText type="error" visible={true}>
                {errorsTable[error]}
              </HelperText>
            )}
            {error === 'AUTH001' && (
              <HelperText type="error" visible={true}>
                {errorsTable[error]}
              </HelperText>
            )}
            <Text style={styles.textInputLabel}>CONTRASEÑA</Text>
            <TextInput
              onChangeText={text => onChange(text, 'password')}
              right={
                <TextInput.Icon icon="eye" onPress={() => setHidden(!hidden)} />
              }
              secureTextEntry={hidden}
              style={styles.textInput}
              value={password}
              autoCapitalize="none"
              error={error === 'ERR-GENERIC'}
            />
            {error === 'ERR-GENERIC' && (
              <HelperText type="error" visible={true}>
                {customError}
              </HelperText>
            )}
            <Text style={styles.textInputLabel}>CONFIRMAR CONTRASEÑA</Text>
            <TextInput
              onChangeText={text => onChange(text, 'passwordConfirm')}
              right={
                <TextInput.Icon icon="eye" onPress={() => setHidden(!hidden)} />
              }
              secureTextEntry={hidden}
              style={styles.textInput}
              value={passwordConfirm}
              autoCapitalize="none"
              error={error === 'ERR-PASSWORDCONFIRM'}
            />
            {error === 'ERR-PASSWORDCONFIRM' && (
              <HelperText type="error" visible={true}>
                {customError}
              </HelperText>
            )}
            <HelperText
              type="info"
              visible={true}
              style={{fontSize: 9, marginVertical: 0}}>
              Por favor, ingresa al menos 8 caracteres entre letras números y
              símbolos.
            </HelperText>
            {/**<Text style={styles.textInputLabel}>APELLIDO</Text>
            <TextInput
              label="Sanchez"
              onChangeText={text => onChange(text, 'lastname')}
              style={styles.textInput}
              value={lastname}
              error={error === 'AUTH118'}
            />
            {error === 'AUTH118' && (
              <HelperText type="error" visible={true}>
                {errorsTable[error]}
              </HelperText>
            )} */}
            <Button
              contentStyle={{paddingVertical: 0}}
              disabled={loading}
              loading={loading}
              mode="contained"
              onPress={handleToggleView}
              style={{marginTop: 10, width: '100%', borderRadius: 40}}>
              Siguiente
            </Button>
            <Button
              contentStyle={{paddingVertical: 0}}
              disabled={loading}
              loading={loading}
              mode="contained"
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Home',
                    },
                  ],
                });
              }}
              style={{
                marginTop: 10,
                width: '100%',
                borderRadius: 40,
                backgroundColor: theme.colors.text,
              }}>
              Regresar
            </Button>
          </View>
        )}
        {!showFirstView && (
          <View>
            <Text style={styles.textInputLabel}>NOMBRES Y APELLIDOS</Text>
            <TextInput
              label={firstname.length > 0 ? '' : 'Name lastname'}
              onChangeText={text => onChange(text, 'firstname')}
              style={styles.textInput}
              value={firstname}
              error={error === 'AUTH117'}
            />
            {error === 'AUTH117' && (
              <HelperText type="error" visible={true}>
                {errorsTable[error]}
              </HelperText>
            )}
            <Text style={styles.textInputLabel}>CÉDULA</Text>
            <TextInput
              label={cedula.length > 0 ? '' : '0123456789'}
              onChangeText={text => onChange(text, 'cedula')}
              style={styles.textInput}
              value={cedula}
              keyboardType="numeric" // Permitir solo dígitos
              error={error === 'AUTH114'}
            />
            {error === 'AUTH114' && (
              <HelperText type="error" visible={true}>
                {errorsTable[error]}
              </HelperText>
            )}
            <Text style={styles.textInputLabel}>NÚMERO CELULAR</Text>
            <TextInput
              label={celular.length > 0 ? '' : '0999999999'}
              onChangeText={text => onChange(text, 'celular')}
              style={styles.textInput}
              value={celular}
              keyboardType="numeric" // Permitir solo dígitos
              error={error === 'AUTH115'}
            />
            {error === 'AUTH115' && (
              <HelperText type="error" visible={true}>
                {errorsTable[error]}
              </HelperText>
            )}
            <Text style={styles.textInputLabel}>DIRECCION</Text>
            <TextInput
              label={direccion.length > 0 ? '' : '123 Main Street Apt 4'}
              onChangeText={text => onChange(text, 'direccion')}
              style={styles.textInput}
              value={direccion}
              error={error === 'AUTH116'}
            />
            {error === 'AUTH116' && (
              <HelperText type="error" visible={true}>
                {errorsTable[error]}
              </HelperText>
            )}
            <Button
              contentStyle={{paddingVertical: 0}}
              disabled={loading}
              loading={loading}
              mode="contained"
              onPress={handleRegister}
              style={{marginTop: 10, width: '100%', borderRadius: 40}}>
              Registrarse
            </Button>
            <Button
              contentStyle={{paddingVertical: 0}}
              disabled={loading}
              loading={loading}
              mode="contained"
              onPress={handleToggleView}
              style={{
                marginTop: 10,
                width: '100%',
                borderRadius: 40,
                backgroundColor: theme.colors.text,
              }}>
              Regresar
            </Button>
          </View>
        )}
        <Text
          style={styles.TextTerms}
          onPress={() => navigation.navigate('TermsConditions')}>
          Presionando el botón "Registrarse", Aceptas nuestros Términos y
          Condiciones
        </Text>
      </View>
    </SafeAreaView>
  );
}
