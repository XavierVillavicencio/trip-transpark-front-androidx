import { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from '../../navigation';


import { Wrapper } from '../../components';
import { useTheme } from 'react-native-paper';
import { ActivityIndicator, Button, Headline } from 'react-native-paper';

interface Props extends StackScreenProps<AuthStackParams, any> {}

export function PermissionsScreen({ navigation }: Props) {
  const theme = useTheme();

  useEffect(() => {
    
      navigation.replace('Login');
    
  }, []);

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
      <Headline style={{ marginBottom: 20, alignSelf: 'center' }}>
        Se solicitan los permisos para obtener la ubicación del dispositivo en caso que el usuario quiera ubicar si vehículo en el parqueadero
      </Headline>
      <Button
        mode="contained"
        onPress={handlePermissions}
        style={{ width: '100%' }}
      >
        Solicitar permisos
      </Button>
    </Wrapper>
  );
}
