import {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../../context';
import {PropertiesStackParams} from '../../navigation';
import {privateApi, privateUrl} from '../../api/propertiesApi';
import {uid} from '../../helpers';
import {useForm} from '../../hooks';
import {SvgUri} from 'react-native-svg';
import {View, ScrollView, Text, SafeAreaView, Image, StyleSheet, StatusBar} from 'react-native';

import {
  Avatar,
  Button,
  Colors,
  Headline,
  HelperText,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {DeleteDialog, ModalWrapper} from '../../components';
import React = require('react');
import LogoInternos from '../../imgs/logosInternos.svg';
interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function PaymentFailed({navigation}: Props) {
  const theme = useTheme();

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
        <Text style={styles.HeaderColor}>¡Pago Fallido!</Text>
        <Text style={styles.textColor}>
          Su pago a sido rechazado por favor intente con otrométodo de pago o acercarse a la caja de pago manual.
        </Text>
      </ScrollView>
      <Button
        contentStyle={{paddingVertical: 5}}
        mode="contained"
        onPress={() => {
          navigation.navigate('TabsHomeTicket');
        }}
        style={styles.returnBtn}>
        Regresar al método de pago
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
