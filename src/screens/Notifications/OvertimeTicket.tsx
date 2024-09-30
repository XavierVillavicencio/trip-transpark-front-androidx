import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';

import {Button} from 'react-native-paper';
import LogoInternos from '../../imgs/logosInternos.svg';
import React = require('react');
interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function OvertimeTicket({navigation}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%', alignSelf: 'center'}}>
        <LogoInternos width={'100%'} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}>
        <Image
          source={require('../../imgs/x_icon.png')}
          style={styles.imageIcon}
          resizeMode="contain"
        />
        <Text style={styles.HeaderColor}>¡Tiempo Excedido!</Text>
        <Text style={styles.textColor}>
          Su tiempo para salir sin costo adicional a sido excedido por favor
          pagar el exceso de tiempo.
        </Text>
      </ScrollView>
      <Button
        contentStyle={{paddingVertical: 5}}
        mode="contained"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'QrDesign',
              },
            ],
          });
        }}
        style={styles.returnBtn}>
        Regresar
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageIcon: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
    marginBottom: 40,
  },
  returnBtn: {
    marginHorizontal: '15%',
    width: '70%',
    borderRadius: 40,
    color: '#ffffff',
    backgroundColor: '#0093D0',
  },
  HeaderColor: {
    color: '#BF0000',
    fontFamily: 'Lato-Black',
    fontSize: 40,
    marginBottom: 15,
    textAlign: 'center',
    alignContent: 'center',
  },
  textColor: {
    color: '#BF0000',
    fontFamily: 'Lato-Black',
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
  },
  scrollView: {
    marginHorizontal: 35,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  imageButtonBack: {
    marginTop: 15,
    marginBottom: 0,
    marginHorizontal: 25,
  },
});
