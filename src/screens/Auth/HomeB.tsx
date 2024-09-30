
import {ImageBackground, StyleSheet, View} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from '../../navigation';

const image = {uri: './imgs/'};
import * as Location from 'expo-location';

import { Wrapper } from '../../components';
import { useTheme } from 'react-native-paper';
import { ActivityIndicator, Button, Headline } from 'react-native-paper';

interface Props extends StackScreenProps<AuthStackParams, any> {}

export function HomeB({ navigation }: Props) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
    },
    text: {
      color: 'white',
      fontSize: 42,
      lineHeight: 84,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#000000c0',
    },
  });
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../imgs/Intro2.png')} resizeMode="cover" style={styles.image}>
        <Button
        mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={{ width: '60%', marginTop: 800, marginLeft:80}}
        >
          Empezar
        </Button>
      </ImageBackground>
    </View>
  );
}
