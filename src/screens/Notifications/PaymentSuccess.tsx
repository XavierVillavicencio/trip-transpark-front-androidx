import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import LogoInternos from '../../imgs/logosInternos.svg';
import React = require('react');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useContext} from 'react';
import {PropertiesContext} from '../../context';
import {Md5} from 'md5-typescript';
import {calcularTotalTarifa} from '../../helpers';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function PaymentSuccess({route, navigation}: Props) {
  const theme = useTheme();
  const {testDiscount, discountCode} = route.params;
  const [retrieve, setRetrieve] = useState(true);
  const [ticketCode, setTicketCode] = useState('');
  const [ticketCodeSendQR, setTicketCodeSendQR] = useState('');
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const ticketCodeTmp = await AsyncStorage.getItem('ticketCode');
        setTicketCode(ticketCodeTmp);
        console.info({ticketCodeTmp});
        await paymentConfirmation(ticketCodeTmp);
      } catch (error) {
        console.log(error);
      }
    };
    // Retrieve if has new data
    if (retrieve) {
      retrieveData();
      setRetrieve(false);
    }
  }, [retrieve]);

  const confirmPaymentLogs = async data => {
    const token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    setTicketCodeSendQR(data.code);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
    const url = 'https://app.transpark.br-st.net/tickets/byCode/' + data.code;
    fetch(url, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({
        status: 'PAID',
        paymenttime: formattedDate.toString(),
        subtotal: data.subtotal,
        iva: data.iva,
        total: data.total,
      }),
      redirect: 'follow',
    })
      .then(response => response.text())
      .then(async resultsByCode => {
        console.log({resultsByCode});
      })
      .catch(error => console.log('error', error));
    return true;
  };

  const paymentConfirmation = async ticketCodeTmp => {
    const id_token = await AsyncStorage.getItem('id_token');
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

    const data = JSON.parse(ticketCodeTmp);
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + id_token);
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
    fetch(
      'https://thirdparty.transpark.br-st.net/api/v1/pms/general/Partner/PaymentConfirmation',
      {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      },
    )
      .then(response => response.text())
      .then(result => {
        /* Payment successful, this mark the completion of the process */
        console.log({result});
        /** Payment confirmation in backlog  **/
        const entryTime = new Date(data.data.entryDate);
        const currentTime = new Date();
        const duration = Math.round((currentTime - entryTime) / (1000 * 60));
        const totalDataOutput = calcularTotalTarifa(
          duration,
          testDiscount,
          discountCode,
        );
        let inputConfirmPaymentLogs = {
          subtotal: totalDataOutput.subtotal,
          iva: totalDataOutput.iva,
          total: totalDataOutput.total,
          code: data.data.transactionNo,
        };
        confirmPaymentLogs(inputConfirmPaymentLogs);
      })
      .catch(error => console.log('error', error));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%', alignSelf: 'center'}}>
        <LogoInternos width={'100%'} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}>
        <Image
          source={require('../../imgs/Check-In-Progress.png')}
          style={styles.imageIcon}
          resizeMode="contain"
        />
        <Text style={styles.HeaderColor}>!Pago Exitoso¡</Text>
        <Text style={styles.textColor}>
          Su pago a sido procesado con éxito tiene 15 minutos para salir sin
          generar recargo.
        </Text>
      </ScrollView>
      <Button
        mode="contained"
        uppercase={true}
        labelStyle={{fontSize: 12}}
        contentStyle={{paddingVertical: 1}}
        buttonColor={theme.colors.placeholder}
        style={{
          width: '70%',
          alignSelf: 'center',
          borderRadius: 80,
          marginTop: 5,
          marginHorizontal: '15%',
          marginVertical: 10,
        }}
        onPress={() => {
          navigation.navigate('QRCodeGenerator', {
            QR: ticketCodeSendQR,
          });
        }}>
        Mostrar código QR
      </Button>
      <Button
        contentStyle={{paddingVertical: 1}}
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
    color: '#0055A5',
    fontFamily: 'Lato-Black',
    fontSize: 40,
    marginBottom: 15,
    textAlign: 'center',
    alignContent: 'center',
  },
  textColor: {
    color: '#0055A5',
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
