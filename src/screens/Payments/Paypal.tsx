import React, {useState,useContext,useEffect} from 'react';
import {Text,View,StyleSheet,ActivityIndicator,TouchableOpacity} from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { PropertiesContext } from '../../context';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import qs from 'qs';
import { decode, encode } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  padWithLeadingZeros,
  calcularSubtotalYIVA,
  convertirMinutosAHorasYMinutos,
} from '../../helpers';

interface Props {
  navigation: any;
  children: any;
}

export function Paypal({ route, navigation, children }: Props) {
  const {testDiscount} = route.params;
  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] = useState(true);
  const { historyItemEditTitle, cancelEditHistoryItem } = useContext(PropertiesContext);
  const theme = useTheme();
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

  /*---Paypal checkout section---*/
  const buyBook = async () => {
    const ticketCodeTmp = await AsyncStorage.getItem('ticketCode');
    let dataTicket = JSON.parse(ticketCodeTmp);
    const entryTime = new Date(dataTicket.data.entryDate);
    const currentTimeGMT = new Date();
    const offsetMs = -5 * 60 * 60 * 1000; // -5 hours in milliseconds
    const currentTime = new Date(); // new Date(currentTimeGMT.getTime() + offsetMs);
    const duration = Math.round((currentTime - entryTime) / (1000 * 60));
    let tariff = dataTicket.data.tariff;
    let tiemposminutos = convertirMinutosAHorasYMinutos(parseInt(duration, 10));
    const horas = padWithLeadingZeros(tiemposminutos.horas, 2);
    const minutos = padWithLeadingZeros(tiemposminutos.minutos, 2);
    let horasTotales = horas;
    if (minutos > 0) {
      horasTotales++;
    }

    let valorUnitario = 2;
    if (testDiscount) {
      valorUnitario = 1.5;
    }
    
    tariff = horasTotales * valorUnitario;

    let total = parseFloat(tariff); // Cambia esto al total que desees calcular
    const tasaIVA = 0.15; // Cambia esto a la tasa de IVA aplicable en tu región
    let dureation = parseInt(duration, 10);
    let discounted = 0;
    if (testDiscount) {
      if (dureation > 120) {
        discounted = parseFloat('3');
        tariff = tariff - 3;
      }
    }
    const IVAArray = calcularSubtotalYIVA(total, tasaIVA, discounted);

    //Check out https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/# for more detail paypal checkout
    const dataDetail = {
      'intent': 'sale',
      'payer': {
        'payment_method': 'paypal',
      },
      'transactions': [{
        'amount': {
          'currency': 'USD',
          'total': tariff,
          'details': {
            'shipping': '0',
            'subtotal': tariff,
            'shipping_discount': '0',
            'insurance': '0',
            'handling_fee': '0',
            'tax': '0',
          }
        },
        'description': 'This is the payment transaction description',
        'payment_options': {
          'allowed_payment_method': 'IMMEDIATE_PAY',
        }, 'item_list': {
          'items': [{
            'name': 'Horas parqueadero',
            'description': 'Horas parqueadero',
            'quantity': horasTotales,
            'price': valorUnitario,
            'tax': '0',
            'sku': 'product34',
            'currency': 'USD',
          }],
        }
      }],
      'redirect_urls': {
        'return_url': 'https://auth.transpark.br-st.net/',
        'cancel_url': 'https://auth.transpark.br-st.net/',
      }
    }
    console.info({dataDetail});
    const url = 'https://api-m.paypal.com/v1/oauth2/token';

    const data = {
      grant_type: 'client_credentials',
    };

    const auth = {
      username:
        'ASU5p2Fmiw1O8rrubMtzNxoCavXbFh8I0XcegESejvHLc9G13V63-ld8nlLfLvLyPXUw37c_I6nC_WWi', //"your_paypal-app-client-ID",
      password:
        'EHI5FMooyzQhFmdmvx8in9erePSLRwXDvD4x6n9F75VsI7mMRvLS5k-yjRnozLnE4PhbSoaQmKvX2978', //"your-paypal-app-secret-ID
    };

    const options = {

      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Credentials': true,
      },

      //Make sure you use the qs.stringify for data
      data: qs.stringify(data),
      auth: auth,
      url,
    };

    // Authorise with seller app information (clientId and secret key)
    axios(options).then(response => {
      setAccessToken(response.data.access_token)

      //Resquest payal payment (It will load login page payment detail on the way)
      axios.post('https://api-m.paypal.com/v1/payments/payment', dataDetail,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${response.data.access_token}`,
          }
        }
      )
        .then(response => {
          const { id, links } = response.data
          const approvalUrl = links.find(data => data.rel == 'approval_url').href

          console.log('response', links)
          setPaypalUrl(approvalUrl)
        }).catch(err => {
          console.error('fallo al crear el approval url');
          console.log({ ...err })
        })
    }).catch(err => {
      console.error('fallo del login');
      console.log(err)
    })
};

/*---End Paypal checkout section---*/


  onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      SetIsWebViewLoading(true)
    }
  }

  _onNavigationStateChange = (webViewState) => {
    console.log('webViewState', webViewState)

    //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
    //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
    if (webViewState.title == '') {
      //When the webview get here Don't need our loading anymore because there is one from paypal
      setShouldShowWebviewLoading(false);
    }

    if (webViewState.url.includes('https://auth.transpark.br-st.net/')) {
      setPaypalUrl(null);
      const urlArr = webViewState.url.split(/(=|&)/);

      const paymentId = urlArr[2];
      const payerId = urlArr[10];

      axios.post(`https://api-m.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: payerId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      )
        .then(response => {
          setShouldShowWebviewLoading(true);
          /*setPaypalUrl(null);
          let responseString = JSON.parse(response);
          console.log('response.data');
          console.log(responseString.data);
          console.log('response.data.status');
          console.log(responseString.data.status);*/
          console.info('linea 179');
          navigation.navigate('PaymentSuccess', {testDiscount, discountCode});
        })
        .catch(err => {
          setShouldShowWebviewLoading(true);
          /*setPaypalUrl(null);
          console.log({err});
          console.info('linea 184');*/
        });
    }
  }
  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.secondary}}>
      <View style={styles.container}>
        <Text>Redirigiendo con Paypal</Text>
      </View>
      {paypalUrl ? (
        <View style={styles.webview}>
          <WebView
            style={{ height: '100%', width: '100%' }}
            source={{ uri: paypalUrl }}
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
        <View style={{ ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
          <ActivityIndicator size="small" color="#A02AE0" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
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