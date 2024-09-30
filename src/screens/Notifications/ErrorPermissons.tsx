import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import React = require('react');

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function ErrorPermissons({navigation}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../imgs/Grupo_2280.png')}
        style={{width: '100%', alignSelf: 'center'}}
        resizeMode="contain"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.textColor}>!Permisos del Dispositivo¡</Text>
        <Text style={styles.textColor}>
          Por favor, es necesario que nos permitas utilizar la cámara o el
          lector NFC para continuar.
        </Text>
        <View>
          <Image
            source={require('../../imgs/iconError.png')}
            style={{width: '100%', alignSelf: 'center'}}
            resizeMode="contain"
          />
        </View>
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
  returnBtn: {
    marginHorizontal: '15%',
    width: '70%',
    borderRadius: 40,
    color: '#ffffff',
    backgroundColor: '#0093D0',
  },
  textColor: {
    color: '#BF0000',
    fontFamily: 'Lato-Black',
    fontSize: 26,
    marginBottom: 50,
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
