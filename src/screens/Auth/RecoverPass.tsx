import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from '../../navigation';
import { publicApi } from '../../api/propertiesApi';
import { errorsTable } from '../../helpers/errorsTable';
import { useForm } from '../../hooks';

import { Wrapper } from '../../components';

import { Image } from 'react-native';

import {
  Colors,
  useTheme,
  Button,
  Headline,
  HelperText,
  Subheading,
  TextInput
} from 'react-native-paper';

interface Props extends StackScreenProps<AuthStackParams, 'RecoverPass'> {}

export function RecoverPass({ navigation, route }: Props) {
  const email = route.params?.email;

  const theme = useTheme();

  const { recoveryCode, newPassword, onChange } = useForm({
    recoveryCode: '',
    newPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);

  const submit = async () => {
    setError('');
    setLoading(true);

    try {
      await publicApi.put('/auth/resetLostPassword', {
        email,
        recoveryCode,
        newPassword
      });

      setSuccess(true);

      setTimeout(() => {
        navigation.navigate('Login');
      }, 4000);
    } catch (error: any) {
      console.log(error.response.data);
      setError(error.response.data.code);
      setSuccess(false);
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
      <Headline style={{ fontWeight: 'bold' }}>Verificación</Headline>
      <Subheading>
        Ingresa el código de verificación enviado a tu correo
      </Subheading>

      <TextInput
        style={{ width: '100%', marginTop: 20 }}
        label="Código de recuperación"
        value={recoveryCode}
        onChangeText={(text) => onChange(text, 'recoveryCode')}
        autoCapitalize="none"
        error={error === 'AUTH016'}
      />
      {error === 'AUTH016' && (
        <HelperText visible={true} type="error">
          {errorsTable[error]}
        </HelperText>
      )}

      <TextInput
        style={{ width: '100%', marginTop: 20 }}
        label="Nueva contraseña"
        value={newPassword}
        onChangeText={(text) => onChange(text, 'newPassword')}
        autoCapitalize="none"
        error={error === 'AUTH016'}
        right={
          <TextInput.Icon
            name="eye-outline"
            onPress={() => setHidden(!hidden)}
          />
        }
        secureTextEntry={hidden}
      />
      {error === 'AUTH016' && (
        <HelperText visible={true} type="error">
          {errorsTable[error]}
        </HelperText>
      )}

      <Button
        mode="contained"
        onPress={success ? () => {} : () => submit()}
        style={{ marginTop: 20, width: '100%' }}
        contentStyle={{ paddingVertical: 3 }}
        color={theme.colors.primary}
        disabled={loading}
      >
        {success ? 'Actualizado!' : 'Guardar'}
      </Button>
    </Wrapper>
  );
}
