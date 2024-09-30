/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Md5} from 'md5-typescript';

import { Camera, CameraType } from 'react-native-camera-kit';

import {
  ActivityIndicator,
  Colors,
  Divider,
  useTheme,
  Button,
  Text,
} from 'react-native-paper';
import {privateApi, privateUrl} from '../../api/propertiesApi';
import {Wrapper} from '../../components';


interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function QrBarcode({navigation}: Props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState('');
  const [inAction, setInAction] = useState(false);
  const [token, setToken] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      // const {status} = await BarCodeScanner.requestPermissionsAsync();
      // setHasPermission(status === 'granted');
      // loginThirdParty();
    })();
  }, []);

  /*const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    sendThirdParty(data);
    setResult(
      <ActivityIndicator
        animating={true}
        size={'large'}
        color={theme.colors.danger}
      />,
    );
  }; */

  const loginThirdParty = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      username: 'admin',
      password: '123456',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch(
      'https://thirdparty.transpark.br-st.net/api/authenticate',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let r = JSON.parse(result);
        setToken(r.id_token);
      })
      .catch(error => console.log('error', error));
  };

  const sendThirdParty = async (transactionNo: string) => {
    try {
      console.info('token');
      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + token);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        'https://thirdparty.transpark.br-st.net/api/v1/pms/general/Partner/InquiryTransaction?locationId=PS00000011&transactionNo=' +
          transactionNo,
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          setResult(result);
        })
        .catch(error => console.log('error', error));
    } catch (error: any) {
      setResult(
        'There is an error sending the data; please check the console.',
      );
      console.log(error.response.data);
    }
    setInAction(false);
  };

  const paymentConfirmation = () => {
    // Create a new Date object to represent the current date and time
    const currentDate = new Date();

    // Define the format you want for date and time (e.g., "YYYY-MM-DD HH:MM:SS")
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const formattedTime = `${currentDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    //console.log(`Date: ${formattedDate}`);
    //console.log(`Time: ${formattedTime}`);

    const data = JSON.parse(result);
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);
    myHeaders.append('Content-Type', 'application/json');

    const signDateText = formattedDate + formattedTime;
    let signTezxt = 'amount=' + data.data.tariff + '&';
    signTezxt += 'locationId=PS00000011&';
    signTezxt += 'paymentDate=' + signDateText + '&';
    signTezxt += 'paymentStatus=PAID&';
    signTezxt += `referenceNo=${data.data.referenceNo}&`;
    signTezxt += `transactionNo=${data.data.transactionNo}`;
    signTezxt += '24c1d2c5f5912c2ca2d5899c10060d62';
    let sign = Md5.init(signTezxt);
    var raw = JSON.stringify({
      locationId: 'PS00000011',
      transactionNo: data.data.transactionNo,
      referenceNo: data.data.referenceNo,
      amount: data.data.tariff,
      paymentStatus: 'PAID',
      paymentDate: `${formattedDate} ${formattedTime}`,
      sign: sign.toUpperCase(),
    });

    console.info({signTezxt, raw});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://thirdparty.transpark.br-st.net/api/v1/pms/general/Partner/PaymentConfirmation',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => setResult(result))
      .catch(error => console.log('error', error));
  };

  const renderCamera = () => {
    return (
      <Camera
        ref={(ref) => (this.camera = ref)}
        cameraType={CameraType.Back} // front/back(default)
        flashMode='auto'
        scanBarcode={true}
        onReadCode={(event) => Alert.alert('QR code found yeah')} // optional
        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        laserColor="red" // (default red) optional, color of laser in scanner frame
        frameColor='white' // (default white) optional, color of border of scanner frame
      />
    );
  };

  

  return (
    <Wrapper>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}>
        <Text style={styles.paragraph}>Validamos un ticket bien alajo</Text>
        {renderCamera()}
        <Divider />
        <Text>Result:</Text>
        <Text>{result}</Text>
        <Divider />
        <Divider />
        <Button
          style={{marginTop: 50, float: 'left'}}
          color={Colors.lightGreen700}
          mode="contained"
          icon="play-outline"
          labelStyle={{color: Colors.white}}
          disabled={inAction}
          onPress={() => paymentConfirmation()}>
          Pay Ticket
        </Button>
        <Button
          style={{marginTop: 50, float: 'left'}}
          color={Colors.lightGreen700}
          mode="contained"
          icon="play-outline"
          labelStyle={{color: Colors.white}}
          disabled={inAction}
          onPress={() => setScanned(false)}>
          Reload capture
        </Button>

        <Button
          style={{margin: 10, float: 'left'}}
          color={Colors.redA700}
          mode="contained"
          icon="arrow-back"
          labelStyle={{color: Colors.white}}
          disabled={inAction}
          onPress={() => {
            navigation.replace('MenuScreen');
          }}>
          Back
        </Button>
      </SafeAreaView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
