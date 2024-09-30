import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context';
import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {ActivityIndicator} from 'react-native-paper';
import {
  SafeAreaView,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  padWithLeadingZeros,
  calcularSubtotalYIVA,
  convertirMinutosAHorasYMinutos,
} from '../../helpers';
import {useTheme, Text} from 'react-native-paper';
import React = require('react');
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {PropertiesContext} from '../../context';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function TabsHome(this: any, {navigation, route}: Props) {
  const {logout} = useContext(AuthContext);
  const [retrieve, setRetrieve] = useState(true);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const {loginThirdParty} = useContext(PropertiesContext);
  const styles = StyleSheet.create({
    textTitle: {
      fontFamily: 'Lato-normal',
      textAlign: 'center',
      fontSize: 28,
      alignSelf: 'center',
      marginVertical: 30,
      paddingHorizontal: 40,
    },
    wrapperTexts: {
      marginTop: '-5%',
      width: '100%',
      marginBottom: '5%',
      height: '43%',
      fontFamily: 'Lato-Regular',
    },
    image: {
      flex: 1,
      width: '100%',
      height: 150,
      marginTop: '-17%',
    },
    fixToText: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
    },
    buttonContinueLabel: {
      fontSize: 13,
    },
    buttonContinue: {
      width: '75%',
      alignSelf: 'center',
      borderRadius: 20,
      marginTop: 5,
      marginHorizontal: '10%',
    },
    wrapperHomeTicket: {
      backgroundColor: '#ffffff',
      alignContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      paddingTop: 50,
    },
  });

  useEffect(() => {
    const retrieveData = async () => {
      try {
        // Subscribe
        const IsConnected = NetInfo.addEventListener(state => {
          if (!(state.isConnected && state.isInternetReachable)) {
            navigation.navigate('ErrorConnection');
          }
        });
        const valueString = await AsyncStorage.getItem('ticketCode');
        if (valueString != null) {
          try {
            const value = JSON.parse(valueString);
            const transactionNo = value.data.transactionNo;
            if (transactionNo != null) {
              navigation.navigate('QrDesign');
              return true;
            }
          } catch (error) {
            console.error('TabsHome 253: Error al analizar JSON:', error);
            navigation.navigate('QrDesign');
          }
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    };
    // Retrieve if has new data
    if (retrieve) {
      retrieveData();
      setRetrieve(false);
    }
  }, [navigation, retrieve]);

  return loading ? (
    <ActivityIndicator
      color="#000000"
      style={{marginTop: '50%', transform: [{scaleX: 4}, {scaleY: 4}]}}
    />
  ) : (
    <SafeAreaView>
      <View style={styles.wrapperHomeTicket}>
        <Image
          source={require('../../imgs/Grupo_2280.png')}
          style={{width: '100%', alignSelf: 'center'}}
          resizeMode="contain"
        />
        <Text style={styles.textTitle}>
          ¡Escanéa tu Ticket QR, con tu celular!
        </Text>
        <Image
          source={require('../../imgs/nov20/HomePag.png')}
          style={styles.imageLogo}
          resizeMode="cover"
        />
        <ImageBackground
          source={require('../../imgs/nov20/Nav-bar-Escaneo.png')}
          resizeMode="cover"
          style={styles.image}>
          <TouchableOpacity
            style={{
              marginTop: 30,
              marginLeft: '5%',
              height: 60,
              width: 50,
              backgroundColor: 'rgba(255,255,0,0)',
            }}
            onPress={() => navigation.navigate('TabsHome')}
          />
          <TouchableOpacity
            style={{
              marginTop: -50,
              marginLeft: '20%',
              height: 60,
              width: 50,
              backgroundColor: 'rgba(255,0,255,0)',
            }}
            onPress={() => navigation.navigate('Transactions')}
          />
          <TouchableOpacity
            style={{
              marginTop: -70,
              marginLeft: '40%',
              height: 70,
              width: 75,
              backgroundColor: 'rgba(0,255,255,0)',
            }}
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
          />
          <TouchableOpacity
            style={{
              marginTop: -60,
              marginLeft: '65%',
              height: 60,
              width: 50,
              backgroundColor: 'rgba(0,255,0,0)',
            }}
            onPress={() => navigation.navigate('Edit')}
          />
          <TouchableOpacity
            style={{
              marginTop: -60,
              marginLeft: '80%',
              height: 60,
              width: 50,
              backgroundColor: 'rgba(0,0,255,0)',
            }}
            onPress={logout}
          />
        </ImageBackground>

        {/**
        <Button onPress={() => sayHelloToPeer()}>Send to peer</Button>
        <Text>NFC MESSAGE: {nfcMessage}</Text>
        <Text>NFC TICKET: {nfcTicket}</Text>
        <Text>NFC STATUS: {nfcStatus}</Text>
         *
         */}
      </View>
    </SafeAreaView>
  );
}
