import {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../../context';
import {PropertiesStackParams} from '../../navigation';
import {privateApi, privateUrl} from '../../api/propertiesApi';
import {uid} from '../../helpers';
import {useForm} from '../../hooks';

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

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function PaidTicket({navigation}: Props) {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../imgs/Grupo_2280.png')}
        style={{width: '100%', alignSelf: 'center'}}
        resizeMode="contain"
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.textColor}>TICKET PAGADO</Text>
        <Text style={styles.textColor}>
          Este ticket ya ha sido pagado por favor vuelva a escanear su ticket.
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
  returnBtn: {
    marginHorizontal: '15%',
    width: '70%',
    borderRadius: 40,
    color: '#ffffff',
    backgroundColor: '#0093D0',
  },
  textColor: {
    color: '#0055A5',
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
