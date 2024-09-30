import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, TouchableOpacity,Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {PropertiesContext} from '../../context';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import {decode, encode} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context';
import {calcularTotalTarifa} from '../../helpers';
import { Alert } from 'react-native';

interface Props {
  navigation: any;
  children: any;
}

export function Paymentez({route, navigation, children}: Props) {
  const {user, logout} = useContext(AuthContext);
  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] =
    useState(true);
  const {historyItemEditTitle, cancelEditHistoryItem} =
    useContext(PropertiesContext);
  const theme = useTheme();
  const {testDiscount, discountCode} = route.params;

  //Fix bug btoa
  useEffect(() => {
    if (!global.btoa) {
      global.btoa = encode;
    }

    if (!global.atob) {
      global.atob = decode;
    }

    buyBook();
  }, []);

  const buyBook = async () => {
    const ticketCodeTmp = await AsyncStorage.getItem('ticketCode');
    let dataTicket = JSON.parse(ticketCodeTmp);
    const entryTime = new Date(dataTicket.data.entryDate);
    const currentTimeGMT = new Date();
    const offsetMs = -5 * 60 * 60 * 1000; // -5 hours in milliseconds
    const currentTime = new Date(); // new Date(currentTimeGMT.getTime() + offsetMs);new Date(currentTimeGMT.getTime() + offsetMs);
    const duration = Math.round((currentTime - entryTime) / (1000 * 60));
    const totalDataOutput = calcularTotalTarifa(duration, testDiscount, discountCode);

    let encodedString =
      'NAN' +
      '||||' +
      totalDataOutput.duration +
      '||||' +
      totalDataOutput.subtotal +
      // 1 +
      '||||' +
      // 0.12 +
      totalDataOutput.iva +
      '||||' +
      // 1.12 +
      totalDataOutput.total +
      '||||' +
      user?.userId +
      '||||' +
      user?.email +
      '||||' +
      dataTicket.data.transactionNo +
      '||||';
    console.warn({encodedString});
    encodedString = encodeURIComponent(btoa(encodedString));
    const approvalUrl =
      'https://nuvei.transpark.com.ec/public/home/index/' + encodedString;
    console.info(approvalUrl);
    setPaypalUrl(approvalUrl);
  };

  onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      SetIsWebViewLoading(true);
    }
  };

  _onNavigationStateChange = webViewState => {
    console.log('webViewState', webViewState);
    if (webViewState.title == 'Payment error') {
      navigation.navigate('PaymentFailed');
    } else if ( webViewState.title == 'Payment Success') {
      navigation.navigate('PaymentSuccess', {testDiscount, discountCode});
    }
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <View style={styles.container}>
        <Text>Redirigiendo a NUVEI</Text>
      </View>
      {paypalUrl ? (
        <View style={styles.webview}>
        <Image
        source={require('../../imgs/Grupo_2280.png')}
        style={styles.imageLogos}
        resizeMode="stretch"
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../imgs/buttonBack.png')}
          style={styles.imageButtonBack}
          resizeMode="stretch"
        />
        </TouchableOpacity>
          <WebView
            style={{height: '100%', width: '100%', position: 'absolute', top:'0', marginTop: 5}}
            source={{uri: paypalUrl}}
            onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            onLoadStart={onWebviewLoadStart}
            onLoadEnd={() => SetIsWebViewLoading(false)}
          />
        </View>
      ) : null}
      {isWebViewLoading ? (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
          }}>
          <ActivityIndicator size="small" color="#A02AE0" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  imageButtonBack: {
    marginVertical: 0,
    marginHorizontal: 50,
  },
  imageLogos: {
    width: '80%',
    alignSelf: 'flex-start',
    marginHorizontal: 35,
    marginVertical: 5,
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#61E786',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
