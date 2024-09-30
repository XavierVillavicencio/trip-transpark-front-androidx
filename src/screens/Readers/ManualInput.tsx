import { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';
import { SafeAreaView } from 'react-native';
import {Md5} from "md5-typescript";
import { WebView } from 'react-native-webview';
import { decode, encode } from 'base-64'
import qs from "qs";
import axios from "axios";


import {
  ActivityIndicator,
  Colors,
  TextInput,
  Divider,
  useTheme,
  Button,
  Text,
  View
} from 'react-native-paper';
import { privateApi, privateUrl } from '../../api/propertiesApi';
import { Wrapper } from '../../components';


interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function ManualInput({  navigation }: Props) {
  const [inAction, setInAction] = useState(false);
  const [locationId, setLocationId] = useState('PS00000011');
  const [transactionNo, setTransactionNo] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  
  /* for paypal issues */
  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState('');
  const [accessToken, setAccessToken] = useState("");
//When loading paypal page it refirects lots of times. This prop to control start loading only first time
  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] = useState(true)

  const theme = useTheme();

  useEffect(() => {
    (async () => {
      loginThirdParty();
      buyBook();
    })();

    if (!global.btoa) {
      global.btoa = encode;
    }

    if (!global.atob) {
      global.atob = decode;
    }
  }, []);

  const buyBook = async () => {
    //Check out https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/# for more detail paypal checkout
    const dataDetail = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "transactions": [{
        "amount": {
          "currency": "AUD",
          "total": "26",
          "details": {
            "shipping": "6",
            "subtotal": "20",
            "shipping_discount": "0",
            "insurance": "0",
            "handling_fee": "0",
            "tax": "0"
          }
        },
        "description": "This is the payment transaction description",
        "payment_options": {
          "allowed_payment_method": "IMMEDIATE_PAY"
        }, "item_list": {
          "items": [{
            "name": "Book",
            "description": "Chasing After The Wind",
            "quantity": "1",
            "price": "20",
            "tax": "0",
            "sku": "product34",
            "currency": "AUD"
          }]
        }
      }],
      "redirect_urls": {
        "return_url": "https://example.com/",
        "cancel_url": "https://example.com/"
      }
    }
    
    const url = `https://api.sandbox.paypal.com/v1/oauth2/token`;

    const data = {
      grant_type: 'client_credentials'

    };

    const auth = {
      username: "AVoei4BdvFtP_nB5Ulu0fN0L1FrW_he7DLx2A1Y6TUdOFVwrKed73my0bwlUeAXO0mFJZyAfZ5cGpWwz",  //"your_paypal-app-client-ID",
      password: "EBAPtB2_JPDoKsftonMYhsF7BWb1SIxCLD6IplXwNKRZEAgD1HOstsQr4Q7PVcT5vmXKcy7GTzY2rp2R"   //"your-paypal-app-secret-ID


    };

    const options = {

      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Credentials': true
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
      axios.post(`https://api.sandbox.paypal.com/v1/payments/payment`, dataDetail,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${response.data.access_token}`
          }
        }
      )
        .then(response => {
          const { id, links } = response.data
          const approvalUrl = links.find(data => data.rel == "approval_url").href

          console.log("response", links)
          setPaypalUrl(approvalUrl)
        }).catch(err => {
          console.log({ ...err })
        })
    }).catch(err => {
      console.log(err)
    })
  };

  onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      SetIsWebViewLoading(true)
    }
  }

  _onNavigationStateChange = (webViewState) => {
    console.log("webViewState", webViewState)

    //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
    //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
    if (webViewState.title == "") {
      //When the webview get here Don't need our loading anymore because there is one from paypal
      setShouldShowWebviewLoading(false)
    }

    if (webViewState.url.includes('https://example.com/')) {

      setPaypalUrl(null)
      const urlArr = webViewState.url.split(/(=|&)/);

      const paymentId = urlArr[2];
      const payerId = urlArr[10];

      axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: payerId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
        .then(response => {
          setShouldShowWebviewLoading(true)
          console.log(response)

        }).catch(err => {
          setShouldShowWebviewLoading(true)
          console.log({ ...err })
        })

    }
  }


  const loginThirdParty = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": "admin",
      "password": "123456"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch("https://thirdparty.transpark.br-st.net/api/authenticate", requestOptions)
      .then(response => response.text())
      .then(result => {
        let r = JSON.parse(result);
        setToken(r.id_token);
      })
      .catch(error => console.log('error', error));
  }

  

  const paymentConfirmation = () =>{

    // Create a new Date object to represent the current date and time
    const currentDate = new Date();

    // Define the format you want for date and time (e.g., "YYYY-MM-DD HH:MM:SS")
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    //console.log(`Date: ${formattedDate}`);
    //console.log(`Time: ${formattedTime}`);

    const data = JSON.parse(result);
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    myHeaders.append("Content-Type", "application/json");
    
    const signDateText = formattedDate+formattedTime;
    let signTezxt  = 'amount='+data.data.tariff+'&';
        signTezxt += `locationId=PS00000011&`;
        signTezxt += 'paymentDate='+signDateText+'&';
        signTezxt += `paymentStatus=PAID&`;
        signTezxt += `referenceNo=${data.data.referenceNo}&`;
        signTezxt += `transactionNo=${data.data.transactionNo}`;
        signTezxt += `24c1d2c5f5912c2ca2d5899c10060d62`;
    let sign = Md5.init(signTezxt);
    var raw = JSON.stringify({
      "locationId": "PS00000011",
      "transactionNo": data.data.transactionNo,
      "referenceNo": data.data.referenceNo,
      "amount": data.data.tariff,
      "paymentStatus": "PAID",
      "paymentDate":`${formattedDate} ${formattedTime}`,
      "sign": sign.toUpperCase()
    });


    console.info({signTezxt, raw})
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://thirdparty.transpark.br-st.net/api/v1/pms/general/Partner/PaymentConfirmation", requestOptions)
      .then(response => response.text())
      .then(result => setResult(result))
      .catch(error => console.log('error', error));
  }

  const sendThirdParty = async () => {
    setInAction(true);
    try {
      console.info('token')
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+token);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("https://thirdparty.transpark.br-st.net/api/v1/pms/general/Partner/InquiryTransaction?locationId=PS00000011&transactionNo="+transactionNo, requestOptions)
        .then(response => response.text())
        .then(result =>{
          setResult(result)
        })
        .catch(error => console.log('error', error));
    } catch (error: any) {
      setResult('There is an error sending the data; please check the console.');
      console.log(error.response.data);
    }
    setInAction(false);
  }

  return (
    <Wrapper>
      <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.background
      }}
    >
      <Text>
        Please add data to the fields to test the result of the server response.
      </Text>
      <Divider />
      <TextInput
          style={{ width: 300, marginTop: 20 }}
          label="Add Transaction number"
          value={transactionNo}
          onChangeText={(text) => setTransactionNo(text)}
          autoCapitalize="none"
          error={!!error}
        />
      <Divider />
      <Text style={{margin: 30, fontWeight: 900, fontSize: 18}}>Result:</Text>
      <Text>
        {result}
        
      </Text>
      {paypalUrl ? (
        <View style={{ height: "100%", width: "100%" }}>
          <WebView
            style={{ height: "100%", width: "100%" }}
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
        <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
          <ActivityIndicator size="small" color="#A02AE0" />
        </View>
      ) : null}
      <Divider />
      <Button
        style={{ marginTop: 50, float: 'left' }}
        color={Colors.lightGreen700}
        mode="contained"
        icon="play-outline"
        labelStyle={{ color: Colors.white }}
        disabled={inAction}
        onPress={() => sendThirdParty()}
        >Send</Button>
      <Button
        style={{ marginTop: 10, float: 'left' }}
        color={Colors.lightGreen700}
        mode="contained"
        icon="play-outline"
        labelStyle={{ color: Colors.white }}
        disabled={inAction}
        onPress={() => paymentConfirmation()}
        >Pay Ticket</Button>
        
      <Button
        style={{ margin: 10, float: 'left' }}
        color={Colors.redA700}
        mode="contained"
        icon="arrow-back"
        labelStyle={{ color: Colors.white }}
        disabled={inAction}
        onPress={() => {
          navigation.replace('MenuScreen')
        }}
        >Back</Button>
      </SafeAreaView>
    </Wrapper>
  );
}
