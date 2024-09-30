import {useEffect, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParams} from '../../navigation';

import {useState} from 'react';
import {Wrapper} from '../../components';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  Button,
  Headline,
  HelperText,
  Subheading,
  TextInput,
  useTheme,
  Text,
} from 'react-native-paper';
import {publicApi} from '../../api/propertiesApi';
import React = require('react');

interface Props extends StackScreenProps<AuthStackParams, 'CheckCode'> {}

export function CheckCodeScreen({ navigation, route }: Props) {
  const email = route.params?.email;
  const inputRefs = useRef([]);
  const inputFocusRefs = useRef([]);
  const theme = useTheme();

  const [userEmail, setUserEmail] = useState(email ?? '');
  const [code, setCode] = useState('');
  const [inputValues, setInputValues] = useState(['', '', '', '', '']); // valores para cada codigo
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = Array(5).fill(null);

  const handleInputChange = (text, index) => {
    if (text.length > 1) {
      // Limitar la entrada a un solo carácter
      text = text.charAt(0);
    }

    // Asegurarse de que solo se ingresen dígitos
    text = text.replace(/[^0-9]/g, '');

    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

    if ((index - 1) >= -1) {
      if (index <= 4 && text.length === 0) {
        // Si se presionó retroceso y el campo está vacío, mover el foco al input anterior
        if(inputFocusRefs.current[index - 1]){
          inputFocusRefs.current[index - 1]();
        }
      } else if (index < 4) {
        if (inputFocusRefs.current[index + 1]) {
          inputFocusRefs.current[index + 1]();
        }
      }
    }
  };

  const submit = async () => {
    setError('');
    setLoading(true);
    try {
      await publicApi.put('/auth/verifyActivationCode', {
        email: userEmail,
        activationCode: inputValues.join(''),
      });

      setSuccess(true);

      setTimeout(() => {
        navigation.navigate('Login');
      }, 4000);
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setSuccess(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.info('///******************////');
    console.info('/// Checkcodescreen ////');
    console.info('///*****************////');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../imgs/Grupo_2280.png')}
        style={styles.Image}
        resizeMode="contain"
      />
    <ScrollView style={styles.scrollView}>
      <Text style={styles.TitleHeader}>¡Te hemos enviado un correo de verificación revísalo ya!</Text>
      <Headline style={styles.Headline}>Ingresa el PIN enviado</Headline>
      <Subheading>Ingresa el PIN enviado a tu correo:</Subheading>
      <Text style={styles.TextEmail}>{email}</Text>
      {!email && (
        <TextInput
          style={{width: '100%', marginTop: 20}}
          label="Email"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
          autoCapitalize="none"
          error={!!error}
        />
      )}
      <View style={styles.containerWrapper}>
        {inputValues.map((value, index) => (
          <TextInput
            key={index}
            style={styles.TextInput}
            placeholder={' '}
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
            maxLength={1} // Limitar la longitud máxima a 1 carácter
            keyboardType="numeric" // Permitir solo dígitos
            onSubmitEditing={() => {
              if (index < 4) {
                inputFocusRefs.current[index + 1]();
              }
            }}
            ref={(ref) => {
              inputRefs.current[index] = ref;
              inputFocusRefs.current[index] = () => ref.focus();
            }}
          />
        ))}
      </View>
      <HelperText visible={!!error} type="error">
        {error}
      </HelperText>

      <Button
        mode="contained"
        onPress={success ? () => {} : () => submit()}
        style={styles.TextInputButton}
        contentStyle={styles.TextInputContentStyle}
        color={success ? theme.colors.secondary : theme.colors.primary}
        disabled={loading}>
        {success ? '¡Código verificado!' : 'Siguiente'}
      </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    marginHorizontal: 10,
  },
  TextInput: {
    width: '15%',
    marginTop: 20,
    marginHorizontal: 5,
    textAlign: 'center', // Cent
    fontSize: 18,
    backgroundColor: '#eee',
  },
  TextInputButton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    fontSize: 16,
  },
  TextInputContentStyle: {
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 14,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  TitleHeader: {
    fontFamily: 'Lato-black',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 50,
  },
  Headline: {
    fontFamily: 'Lato-bold',
  },
  TextEmail: {
    fontFamily: 'Lato-Black',
  },
  Image: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: '25%',
  },
});
