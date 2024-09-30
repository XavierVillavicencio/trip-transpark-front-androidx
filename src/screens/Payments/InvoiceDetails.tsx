import {
  Keyboard,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {useForm} from '../../hooks';
import {publicApi} from '../../api/propertiesApi';
import {errorsTable} from '../../helpers';
import {AuthContext} from '../../context';

import {Wrapper} from '../../components';

import {
  Button,
  Headline,
  HelperText,
  Subheading,
  TextInput,
  Text,
  useTheme,
} from 'react-native-paper';
import React = require('react');

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function InvoiceDetails({route, navigation}: Props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {testDiscount, discountCode} = route.params;

  const sendInvoiceData = () => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!email && !emailRegex.test(email)) {
      setError('AUTH014');
      return false;
    }

    if (!firstname) {
      setError('AUTH119');
      return false;
    }

    if (!cedula) {
      setError('AUTH114');
      return false;
    }

    if (!celular) {
      setError('AUTH115');
      return false;
    }

    if (!direccion) {
      setError('AUTH116');
      return false;
    }

    const customerFields = {
      name: firstname,
      cedula: cedula,
      phone: celular,
      address: direccion,
      email: email,
    };

    navigation.navigate('PaymentMethod', {
      testDiscount: false,
      customer: customerFields,
      discountCode,
    });
  };

  const {email, firstname, cedula, celular, direccion, onChange} = useForm({
    email: '',
    firstname: '',
    cedula: '',
    celular: '',
    direccion: '',
  });

  const styles = StyleSheet.create({
    headline: {
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 0,
      fontFamily: 'Lato-Bold',
      fontSize: 15,
    },
    subheading: {
      marginTop: 0,
      marginBottom: 0,
      fontFamily: 'Lato-light',
      fontSize: 10,
    },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    buttonContinueLabel: {
      fontSize: 10,
    },
    buttonContinue: {
      width: '75%',
      alignSelf: 'center',
      borderRadius: 20,
      marginTop: 5,
      marginHorizontal: '10%',
    },
    textInput: {
      width: '100%',
      marginTop: -20,
      marginBottom: 5,
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={require('../../imgs/Grupo_2280.png')}
          style={{width: '100%', alignSelf: 'flex-start', marginBottom: 20}}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../imgs/buttonBack.png')}
            style={styles.imageButtonBack}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Button
          buttonColor={theme.colors.primary}
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={() =>
            navigation.navigate('PaymentMethod', {
              testDiscount: false,
              customer: false,
              discountCode
            })
          }
          style={styles.buttonContinue}
          labelStyle={styles.buttonContinueLabel}>
          Usar mis datos
        </Button>
        <Button
          buttonColor={theme.colors.secondary}
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={() => {
            navigation.navigate('PaymentMethod', {
              testDiscount: false,
              customer: {
                name: 'Consumidor Final',
                cedula: ' -- ',
                phone: ' -- ',
                address: ' -- ',
                email: ' -- ',
              },
              discountCode,
            });
          }}
          style={styles.buttonContinue}
          labelStyle={styles.buttonContinueLabel}>
          Consumidor Final
        </Button>
        <Headline style={styles.headline}>Otros datos de facturación</Headline>
        <Subheading style={styles.subheading}>
          Llene este formulario para continuar
        </Subheading>
        <Text style={styles.textInputLabel}>EMAIL</Text>
        <TextInput
          label="anne.carry@gmail.com"
          onChangeText={text => onChange(text, 'email')}
          style={styles.textInput}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          error={error === 'AUTH001' || error === 'AUTH014'}
        />
        {error === 'AUTH014' && (
          <HelperText type="error" visible={true}>
            {errorsTable[error]}
          </HelperText>
        )}
        <Text style={styles.textInputLabel}>
          Nombres y Apellido o Razon Social
        </Text>
        <TextInput
          label="Comercial San Pedrito"
          onChangeText={text => onChange(text, 'firstname')}
          style={styles.textInput}
          value={firstname}
          error={error === 'AUTH119'}
        />
        {error === 'AUTH119' && (
          <HelperText type="error" visible={true}>
            {errorsTable[error]}
          </HelperText>
        )}
        <Text style={styles.textInputLabel}>Cédula, RUC o Pasaporte</Text>
        <TextInput
          label="1819438277"
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
        <Text style={styles.textInputLabel}>Número Celular</Text>
        <TextInput
          label="09 9999 9999"
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
        <Text style={styles.textInputLabel}>Dirección</Text>
        <TextInput
          label="Dirección"
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
          buttonColor={theme.colors.secondary}
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={() => sendInvoiceData()}
          labelStyle={styles.buttonContinueLabel}
          style={styles.buttonContinue}>
          Siguiente
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
