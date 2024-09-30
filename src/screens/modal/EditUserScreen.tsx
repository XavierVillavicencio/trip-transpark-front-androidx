import {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../../context';
import {PropertiesStackParams} from '../../navigation';
import {privateApi, privateUrl} from '../../api/propertiesApi';
import {uid} from '../../helpers';
import {useForm} from '../../hooks';
import {ModalWrapper} from '../../components';

import {
  Button,
  Headline,
  HelperText,
  Subheading,
  TextInput,
  Text,
  useTheme,
  Checkbox,
} from 'react-native-paper';
import React = require('react');

interface Props extends StackScreenProps<PropertiesStackParams, any> {}
export function EditUserScreen({navigation}: Props) {
  const {user, logout} = useContext(AuthContext);
  const {errorMessage, removeError} = useContext(AuthContext);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customError, setCustomError] = useState('');
  const {id, firstname, lastname, cedula, phone, address, onChange} = useForm(
    {
      id: user?.userId,
      firstname: user?.firstname + ' ' + user?.lastname,
      cedula: user?.cedula,
      phone: user?.phone,
      address: user?.address,
    });

  const handleRegister = async () => {
    removeError();
    setError('');
    setCustomError('');
    setLoading(true);
    Keyboard.dismiss();

    try {
      console.info('/***********/');
      console.info('/*EDIT USER*/');
      console.info({address});
      console.info('/***********/');
      await privateApi.put(`/users`, {
        id,
        firstname,
        lastname: ' ',
        address,
        cedula,
        phone,
      });
      // console.info('/**********/');
      // console.info('/*GET USER*/');
      // console.info('/**********/');
      // const { data } = await privateApi.get('/users/' + id, {});
      // console.info({data});
      setLoading(false);
      alert('Tus datos de perfil se actualizaron correctamente. Por lo tanto, como medida de seguridad vamos a cerrar sesión para que valides tu contraseña nuevamente.');
      logout();
     // navigation.navigate('Edit');
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.code === 'ERR-GENERIC') {
        setCustomError(error.response.data.mensaje);
      }
      setError(error.response.data.code);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    removeError();
    setError('');
    setCustomError('');
    setLoading(true);
    Keyboard.dismiss();
    try {
      await privateApi.delete(`/users/${user?.userId}`, {});
      setLoading(false);
      logout();
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.code === 'ERR-GENERIC') {
        setCustomError(error.response.data.mensaje);
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
        style={styles.imageLogos}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../imgs/buttonBack.png')}
          style={styles.imageButtonBack}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      <Headline
        style={{
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 0,
          fontFamily: 'Lato-Bold',
          marginHorizontal: 25,
        }}>
        Actualiza tus datos
      </Headline>
      <Subheading
        style={{
          marginTop: 3,
          marginBottom: 3,
          fontFamily: 'Lato-light',
          fontSize: 17,
          marginHorizontal: 25,
        }}>
        Para actualizar, solo debes modificar la información en el formulario.
      </Subheading>
      <ScrollView style={styles.scrollView}>
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 0,
            fontFamily: 'Lato-Bold',
          }}>
          NOMBRE
        </Text>
        <TextInput
          label={firstname.length > 0 ? '' : 'Name lastname'}
          onChangeText={text => onChange(text, 'firstname')}
          style={{
            width: '100%',
            marginTop: -10,
            backgroundColor: theme.colors.transparent,
          }}
          value={firstname}
          error={error === 'AUTH117'}
        />
        {error === 'AUTH117' && (
          <HelperText type="error" visible={true}>
            {errorsTable[error]}
          </HelperText>
        )}
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 0,
            fontFamily: 'Lato-Bold',
          }}>
          CÉDULA
        </Text>
        <TextInput
          label={cedula.length > 0 ? '' : '0123456789'}
          onChangeText={text => onChange(text, 'cedula')}
          style={{
            width: '100%',
            marginTop: -10,
            backgroundColor: theme.colors.transparent,
          }}
          value={cedula}
          keyboardType="numeric" // Permitir solo dígitos
          error={error === 'AUTH114'}
        />
        {error === 'AUTH114' && (
          <HelperText type="error" visible={true}>
            {errorsTable[error]}
          </HelperText>
        )}
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 0,
            fontFamily: 'Lato-Bold',
          }}>
          NUMERO
        </Text>
        <TextInput
          label={cedula.length > 0 ? '' : '0999999999'}
          onChangeText={text => onChange(text, 'phone')}
          style={{
            width: '100%',
            marginTop: -10,
            backgroundColor: theme.colors.transparent,
          }}
          value={phone}
          keyboardType="numeric" // Permitir solo dígitos
          error={error === 'AUTH115'}
        />
        {error === 'AUTH115' && (
          <HelperText type="error" visible={true}>
            {errorsTable[error]}
          </HelperText>
        )}
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 0,
            fontFamily: 'Lato-Bold',
          }}>
          DIRECCIÓN
        </Text>
        <TextInput
          label={address.length > 0 ? '' : '123 Main Street Apt 4'}
          onChangeText={text => onChange(text, 'address')}
          style={{
            width: '100%',
            marginTop: -10,
            backgroundColor: theme.colors.transparent,
          }}
          value={address}
          error={error === 'AUTH116'}
        />
        {error === 'AUTH116' && (
          <HelperText type="error" visible={true}>
            {errorsTable[error]}
          </HelperText>
        )}

        <Button
          contentStyle={{paddingVertical: 5}}
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={handleRegister}
          style={{marginTop: 30, width: '100%', borderRadius: 40}}>
          Actualizar Datos
        </Button>
        <Button
          buttonColor={theme.colors.danger}
          contentStyle={{paddingVertical: 5}}
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={handleDelete}
          style={{marginTop: 10, width: '100%', borderRadius: 40}}>
          Eliminar Cuenta
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageButtonBack: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
  imageLogos: {
    width: '90%',
    alignSelf: 'flex-start',
    marginHorizontal: 25,
  },
  TextTerms: {
    marginTop: 10,
    fontFamily: 'Lato-Bold',
    color: '#0093D0',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
});
