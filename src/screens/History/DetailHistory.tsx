import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context';
import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';
import {View, Image, TouchableOpacity} from 'react-native';

import {
  Text,
  Button,
  useTheme,
} from 'react-native-paper';
import { privateApi, privateUrl } from '../../api/propertiesApi';
import { Wrapper } from '../../components';
import { IInterestedItem } from '../../interfaces/appInterfaces';
import React = require('react');
interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function ListHistory({ navigation }: Props) {
  const {user, logout} = useContext(AuthContext);
  // const { initialLoad, loadFavorites, loadDrafts, loadInactives } = useContext(PropertiesContext);
  const theme = useTheme();

  return (
    <Wrapper width="100%">
      <View style={{flex: 1, alignSelf: 'center', width: "90%"}}>
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 22, alignItems: 'center', alignSelf: 'center' }}>¡Escanea tu Ticket virtual, acercando tu celular, con NFC, al lector!</Text>
        <Image
        source={require('../../imgs/NFCLogo.png')}
        style={{ width: 200, height: 200, alignSelf: 'center' }}
        resizeMode="contain"
      />
      </View>
      
      <View style={{marginTop: 50,backgroundColor: '#ABB8C3', width: "100%", flex: 1, alignSelf: 'center', borderTopColor: '#8F92A1', borderRadius: 20, borderTopWidth: 1, marginBottom: 0}}>
        <TouchableOpacity onPress={() => navigation.navigate('QrDesign')}>
          <Text style={{ fontFamily: 'Lato-Bold', width: "90%", fontSize: 22, alignItems: 'center', marginTop: 10, marginLeft: 20 }}>Si no tienes NFC, ¡Escanea el código QR, en tu ticket físico, aquí!</Text>
          <Image source={require('../../imgs/EscannerQR.png')} style={{ width: 180, height: 180, alignSelf: 'center', marginTop: 10 }} resizeMode="contain" />
        </TouchableOpacity>
        <Button
          mode="contained"
          color={theme.colors.primary}
          style={{ marginTop: -20, width: '60%', alignSelf: 'center', color: '#ffffff' }}
          onPress={() => navigation.navigate('QrDesign')}
          >
            Escanear código QR
          </Button>
      </View>
      <Image
        source={require('../../imgs/navbar.png')}
        style={{ width: '100%', height: 200, alignSelf: 'center', marginBottom: -100 }}
        resizeMode="contain"
      />
    </Wrapper>
  );
}
