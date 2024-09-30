import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Headline} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import React = require('react');
interface Props extends StackScreenProps<PropertiesStackParams, any> {}
export function QRCodeGenerator({route, navigation}: Props) {
  const [data, setData] = useState('CARGANDO');
  const {QR} = route.params;
  useEffect(() => {
    setData(QR);
  }, []);
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
      <Headline style={styles.headline}>
        Por favor, coloca el código QR en el lector de salida.
      </Headline>
      <View style={styles.viewQrWrapper}>
        <QRCode value={data} size={300} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Lato-Bold',
    marginHorizontal: 25,
    fontSize: 18,
    textAlign: 'center',
    color: '#062E6B',
  },
  viewQrWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
