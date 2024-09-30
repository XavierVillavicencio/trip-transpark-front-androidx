import { Image } from 'react-native';
import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from '../../navigation';
import { publicApi } from '../../api/propertiesApi';

import { Wrapper } from '../../components';

import {
  Button,
  Headline,
  HelperText,
  Subheading,
  TextInput,
  useTheme
} from 'react-native-paper';

interface Props extends StackScreenProps<AuthStackParams, any> {}

export function SendCodeScreen({ navigation }: Props) {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    setLoading(true);

    try {
      await publicApi.put('/auth/sendPasswordRecoveryCode', {
        email
      });

      setTimeout(() => {
        navigation.navigate('RecoverPass', { email });
      }, 4000);
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
        <Image
          source={require('../../imgs/Grupo_2280.png')}
          style={{ width: '100%', alignSelf: 'flex-start' }}
          resizeMode="contain"
        />
      <Headline style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 0 }}>
        ¿Olvidaste tu contraseña?
      </Headline>
      <Subheading style={{ fontWeight: 'light', marginTop: 0, marginBottom: 5 }}>
        Ingresa tu correo para enviar un código de recuperación
      </Subheading>

      <TextInput
        style={{ width: '100%', marginTop: 20 }}
        label="Correo"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
        error={!!error}
      />
      {error && (
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
      )}

      <Button
        mode="contained"
        onPress={submit}
        style={{ marginTop: 20, width: '100%' }}
        contentStyle={{ paddingVertical: 3 }}
        disabled={loading}
      >
        Recuperar
      </Button>
    </Wrapper>
  );
}
