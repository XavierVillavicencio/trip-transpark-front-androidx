import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';


import { Wrapper } from '../../components';
import { Subheading, useTheme } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function CameraPermissions({ navigation }: Props) {
  const theme = useTheme();

  const [permission, requestCameraPermission] = Camera.useCameraPermissions();

  const handlePermissions = async () => {
    await requestCameraPermission();
    navigation.replace('MenuScreen');
  };

  useEffect(() => {
    if (permission?.granted) {
      navigation.replace('MenuScreen');
    }
  }, [permission]);

  return (
    <Wrapper>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Icon
            name="camera-outline"
            size={100}
            color={theme.colors.text}
            style={{ marginBottom: 20 }}
          />

          <Subheading style={{ marginBottom: 20, textAlign: 'center' }}>
            La aplicación usa la cámara y galería del dispositivo para procesar los tickets del parqueadero.
          </Subheading>

          <Subheading style={{ marginVertical: 20, textAlign: 'center' }}>
            Si se niegan los permisos y cambia de opinión, es necesario que
            ajuste la configuración de permisos para esta aplicación en su
            dispositivo
          </Subheading>

          <Button
            mode="contained"
            onPress={handlePermissions}
            style={{ width: '100%', borderRadius: 100 }}
          >
            Continuar
          </Button>
        </View>
      </View>
    </Wrapper>
  );
}
