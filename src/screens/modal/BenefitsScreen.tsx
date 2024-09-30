import {
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {Headline, Subheading} from 'react-native-paper';
import React = require('react');

interface Props extends StackScreenProps<PropertiesStackParams, any> {}
export function BenefitsScreen({navigation}: Props) {
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
      <ScrollView style={styles.scrollView}>
        <Headline style={styles.headline}>
          ¡Próximamente! Grandes Sorpresas en Camino
        </Headline>
        <Subheading style={styles.Subheading}>
          TransPark te brindará beneficios exclusivos que harán que tu
          experiencia de estacionamiento sea aún mejor.
        </Subheading>
        <Subheading style={styles.subheading2}>
          ¡No te pierdas nuestras emocionantes novedades!
        </Subheading>
        <Image
          source={require('../../imgs/tutorialTotales.png')}
          style={styles.imageTutorials}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  Subheading: {
    marginTop: 1,
    marginBottom: 20,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    marginHorizontal: 25,
    textAlign: 'center',
    color: '#062E6B',
  },
  subheading2: {
    marginTop: 1,
    marginBottom: 20,
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    marginHorizontal: 25,
    textAlign: 'center',
    color: '#062E6B',
  },
  imageTutorials: {
    width: '100%',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});
