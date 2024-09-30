import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';

import * as Location from 'expo-location';

import { Wrapper } from '../../components';
import { Subheading, useTheme } from 'react-native-paper';
import { ActivityIndicator, Button } from 'react-native-paper';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function LocationPermissions({ navigation }: Props) {
  const theme = useTheme();

  const [status, requestLocationPermission] =
    Location.useForegroundPermissions();

  const handlePermissions = async () => {
    await requestLocationPermission();
    navigation.replace('CameraPermissions');
  };

  useEffect(() => {
    if (status?.granted) {
      navigation.replace('CameraPermissions');
    }
  }, [status]);

  if (!status) {
    <Wrapper>
      <ActivityIndicator
        size="large"
        animating={true}
        color={theme.colors.background}
        style={{ alignSelf: 'center' }}
      />
    </Wrapper>;
  }

  return (
    <Wrapper>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Icon
            name="location-outline"
            size={100}
            color={theme.colors.text}
            style={{ marginBottom: 20 }}
          />

          <Subheading style={{ marginBottom: 20, textAlign: 'center' }}>
            La aplicación usa la ubicación del dispositivo cuando el usuario
            quiera marcar su ubicación como su posición actual
            actual
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
