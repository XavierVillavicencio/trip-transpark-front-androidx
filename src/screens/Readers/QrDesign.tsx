/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {SafeAreaView, Alert, ImageBackground, View, StyleSheet, Image,TouchableOpacity, ScrollView} from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {
  padWithLeadingZeros,
  calcularSubtotalYIVA,
  convertirMinutosAHorasYMinutos,
} from '../../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Camera, CameraType} from 'react-native-camera-kit';
import {
  ActivityIndicator,
  useTheme,
  Button,
  Text,
} from 'react-native-paper';
import React = require('react');
import { useContext } from 'react';
import { PropertiesContext, AuthContext } from '../../context';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function QrDesign({navigation}: Props) {
  const {logout} = useContext(AuthContext);
  const [isPermitted, setIsPermitted] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState('');
  const [inAction, setInAction] = useState(false);
  const [token, setToken] = useState(null);
  const theme = useTheme();
  const { loginThirdParty } = useContext(PropertiesContext);

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
      marginTop: '0%',
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

  useEffect(() => {
    (async () => {
        const valueString = await AsyncStorage.getItem('ticketCode');
        if (valueString != null) {
          try {
            const value = JSON.parse(valueString);
            const transactionNo  = value.data.transactionNo;
            if (transactionNo != null) {
              console.log('Nos vamos no mas QRDESIGNS');
              navigation.navigate('TabsHomeTicket');
              return null;
            }
          } catch (error) {
            console.error('Error al analizar JSON:', error);
          }
        }
        /*
        let newValueString = await sendThirdParty(value.data.transactionNo);
        value = JSON.parse(newValueString);*/

        const thirpartyToken = await loginThirdParty();
        if (!thirpartyToken) {
          navigation.navigate('ErrorConnection');
        } else {
          setToken(thirpartyToken);
        }
      if (await requestCameraPermission()) {
        setIsPermitted(true);
      } else {
        Alert.alert('Camara sin permiso');
        setIsPermitted(false);
      }
    })();
  }, []);

  const openCamera = async () => {
      if (await requestCameraPermission()) {
        setIsPermitted(true);
      } else {
        Alert.alert('Camara sin permiso');
      }
  };

  const requestCameraPermission = async () => {
    try {
      const cameraPermission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });
  
      const result = await check(cameraPermission);
  
      if (result === RESULTS.GRANTED) {
        // Permiso ya concedido, puedes continuar con la lógica de la cámara
        return result;
      } else {
        // El permiso no está concedido, solicítalo
        const permissionResult = await request(cameraPermission);
        console.info({permissionResult});
        return permissionResult;
        /*if (permissionResult === RESULTS.GRANTED) {
          // Permiso concedido, continúa con la lógica de la cámara
          console.log('Permiso de la cámara concedido');
        } else {
          // Permiso denegado por el usuario
          console.log('Permiso de la cámara denegado');
        }*/
      }
    } catch (error) {
      console.error('Error al solicitar el permiso de la cámara:', error);
    }
  };

  const handleBarCodeScanned = async (data: string) => {
    setIsCaptured(true);
    await sendThirdParty(data);
    // console.info(que);
  };

  const saveTicket = async (transactionDetails: string) => {
    const token = await AsyncStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " +token);
    let resultadoJson = JSON.parse(transactionDetails).data;
    
    let paymentStatus = resultadoJson.paymentStatus;
    const entryTime = new Date(resultadoJson.entryDate);
    const currentTimeGMT = new Date();
    const offsetMs = -5 * 60 * 60 * 1000; // -5 hours in milliseconds
    const currentTime = new Date(); // new Date(currentTimeGMT.getTime() + offsetMs);
    const duration = Math.round((currentTime - entryTime) / (1000 * 60));
    let tiemposminutos = convertirMinutosAHorasYMinutos(
      parseInt(duration, 10),
    );
    const horas = padWithLeadingZeros(tiemposminutos.horas, 2);
    const minutos = padWithLeadingZeros(tiemposminutos.minutos, 2);
    let horasTotales = horas;
    if (parseInt(minutos) > 0) {
      horasTotales++;
    }
    let tariff = resultadoJson.tariff;
    const tasaIVA = 0.12; // Cambia esto a la tasa de IVA aplicable en tu región
    tariff = horasTotales * 2;
    const IVAArray = calcularSubtotalYIVA(tariff, tasaIVA, 0);

    var raw = JSON.stringify({
      "code": resultadoJson.transactionNo,
      "status": paymentStatus,
      "entry": resultadoJson.entryDate,
      "plate": resultadoJson.license,
      "subtotal": IVAArray.subtotal.toFixed(2),
      "iva": IVAArray.iva.toFixed(2),
      "total": tariff,
    });
    console.info({raw});
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch("https://app.transpark.br-st.net/tickets", requestOptions)
      .then(response => response.text())
      .then(result => {
        let resultadoJson = JSON.parse(result);
        console.log("/*resultadoJson*/");
        console.log(result);
        console.log(resultadoJson.data.paymentStatus);
        console.log("/*resultadoJson*/");
        const trimmedPaymentStatus = resultadoJson.data.paymentStatus.toString().trim();

        if (trimmedPaymentStatus === 'DUPLICATE'){
          return false;
        }
        return true;
      })
      .catch(error => console.log('error', error));
  }

  const openBarrier = async (barrier, trnsactionId) => {
    const myHeaders = new Headers();
    const elNuevoToken = await AsyncStorage.getItem('id_token');
    myHeaders.append('Authorization', 'Bearer ' + elNuevoToken);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://thirdparty.transpark.br-st.net/api/v1/gates/"+barrier+"/"+trnsactionId+"/open", requestOptions)
      .then((response) => response.text())
      .then((barrierResult) => {console.log(barrierResult)})
      .catch((error) => console.error(error));
  }

  const splitStringSafely: (myString: string | unknown) => string[] | undefined = (
  myString: string | unknown
) => {
  if (typeof myString === "string") {
    const splitArray = myString.split(',');
    if (splitArray.length !== 2) {
      return myString;
    }

    const firstElement = splitArray[0];
    const secondElement = splitArray[1];

    if (firstElement.length !== 4 || isNaN(Number(firstElement))) {
      console.error(
        "Error: The first element must be a 4-digit number."
      );
      return undefined;
    }

    if (secondElement.length < 20 || isNaN(Number(secondElement))) {
      console.error(
        "Error: The second element must be at least 20 digits long."
      );
      return undefined;
    }
    console.info('abrimos la valla en este caso');
    return splitArray;
  } else {
    console.error("Error: Input must be a string.");
    return undefined;
  }
};

  const sendThirdParty = async (transactionNo: string) => {
    try {
      await AsyncStorage.removeItem('ticketCode'); // Para evitar que se nos quede guardado algo.
      let barrierId = 0;
      let transactionUpdate = splitStringSafely(transactionNo);
      if (transactionUpdate.length !== 2) {
        transactionNo = transactionUpdate;
      } else {
        transactionNo = transactionUpdate[1];
        barrierId = parseInt(transactionUpdate[0]);
      }

      console.info({transactionUpdate});
      console.info({transactionNo});

      let testInteger = parseInt(transactionNo);

      if (!Number.isInteger(testInteger)) {
        navigation.navigate('ErrorTicket');
        return null;
      }
      var myHeaders = new Headers();
      const elNuevoToken = await AsyncStorage.getItem('id_token');
      myHeaders.append('Authorization', 'Bearer ' + elNuevoToken);
      fetch(
        'https://thirdparty.transpark.br-st.net/api/v1/pms/general/Partner/InquiryTransaction?locationId=PS00000011&transactionNo=' +
          transactionNo,
          {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
          },
      )
      .then(response => response.text())
      .then(async resultado => {
        let resultadoJson = JSON.parse(resultado).data;
        let paymentStatus = resultadoJson.paymentStatus;
        let canSave = null;
        switch (paymentStatus) {
          case 'UNPAID':
            canSave = await saveTicket(resultado);
            if (canSave) {
              await AsyncStorage.setItem('ticketCode', resultado).then(
                async function (){
                  if (barrierId > 0 ) {
                    let barrier = await openBarrier(barrierId, transactionNo);
                    console.info(barrier);
                  }
                  navigation.push('TabsHomeTicket');
                }
              ); // el único que debe irse guardando
            } else {
              navigation.navigate('DuplicateTicket');
            }
            break;
          case 'PAID':
            navigation.navigate('PaidTicket');
            break;
          case 'FREE':
            canSave = await saveTicket(resultado);
            if (canSave) {
              await AsyncStorage.setItem('ticketCode', resultado).then(
                async function (){
                  if (barrierId > 0 ) {
                    let barrier = await openBarrier(barrierId, transactionNo);
                    console.info(barrier);
                  }
                  navigation.navigate('TabsHomeTicket');
                }
              ); // el único que debe irse guardando
            } else {
              navigation.navigate('GracePeriod');
            }
            break;
          case 'OVERTIME':
            navigation.navigate('OvertimeTicket');
            break;
          case 'DUPLICATE': // no sirve pero bueno
            navigation.navigate('DuplicateTicket');
            break;
          case 'EXITED':
            navigation.navigate('ExitedTicket');
            break;
          default: // marcamos como error de lectura
            navigation.navigate('ErrorTicket');
            break;
        }
      })
      .catch(error => {
        navigation.navigate('ErrorTicket');
        console.log('error', error);
      }
      );
    } catch (error: any) {
      console.error(
        'There is an error sending the data; please check the console.',
      );
      console.log(error.response.data);
    }
    setInAction(false);
  };

  // Remove item from AsyncStorage
  const removeItemFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('ticketCode');
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'QrDesign',
          },
        ],
      });
      console.log('Item removed successfully');
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
    }
  };


  return (
      <>
        {isPermitted ? (
          isCaptured ? (
            <>
              <ActivityIndicator
                color="#ABB8C3"
                style={{marginBottom: '45%', transform: [{scaleX: 2}, {scaleY: 2}]}}
              />
            </>
          ):(
            <SafeAreaView>
            <View style={styles.wrapperHomeTicket}>
            <Image
              source={require('../../imgs/Grupo_2280.png')}
              style={{width: '100%', alignSelf: 'center'}}
              resizeMode="contain"
            />
            <Text style={styles.textTitle}>¡Escanéa tu Ticket QR, con tu celular!</Text>
            <View style={{width: '80%', height: '60%'}}>
                <Camera
                ratioOverlay={'4:3'}
                cameraOptions={{
                  ratioOverlayColor: '#00000077',
                }}
                ref={(ref) => (this.camera = ref)}
                style={{flex: 1,width: '100%'}}
                cameraType={CameraType.Back} // front/back(default)
                flashMode="auto"
                scanBarcode={true}
                onReadCode={(event: any) => {
                    console.log("event=>", event?.nativeEvent.codeStringValue);
                    handleBarCodeScanned(event.nativeEvent.codeStringValue);
                }}
                showFrame={false} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
                laserColor='red' // (default red) optional, color of laser in scanner frame
                frameColor='white' // (default white) optional, color of border of scanner frame
              />
            </View>
            <ImageBackground
            source={require('../../imgs/navbar.png')}
            resizeMode="contain"
            style={styles.image}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  marginLeft: '10%',
                  height: 60,
                  width: 50,
                  backgroundColor: 'rgba(255,255,0,0)',
                }}
                onPress={() => removeItemFromStorage()}
              />
              <TouchableOpacity
                style={{
                  marginTop: -60,
                  marginLeft: '25%',
                  height: 60,
                  width: 50,
                  backgroundColor: 'rgba(255,0,255,0)',
                }}
                onPress={() =>
                  navigation.navigate('Transactions')
                }></TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: -70,
                  marginLeft: '40%',
                  height: 70,
                  width: 75,
                  backgroundColor: 'rgba(0,255,255,0)',
                }}
                onPress={() =>
                  navigation.navigate('Benefits')
                }></TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: -60,
                  marginLeft: '65%',
                  height: 60,
                  width: 50,
                  backgroundColor: 'rgba(0,255,0,0)',
                }}
                onPress={() => navigation.navigate('Edit')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: -60,
                  marginLeft: '80%',
                  height: 60,
                  width: 50,
                  backgroundColor: 'rgba(0,0,255,0)',
                }}
                onPress={logout}></TouchableOpacity>
            </ImageBackground>
          </View>
          </SafeAreaView>
          )
      ) : (
        <SafeAreaView style={styles.container}>
        <Image
        source={require('../../imgs/Grupo_2280.png')}
        style={{width: '100%', alignSelf: 'center'}}
        resizeMode="contain"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.textColor}>PERMISOS DE CÁMARA</Text>
        <Text style={styles.textColor}>
          No tiene permisos para utilizar la cámara
        </Text>
      </ScrollView>
      <Button
        contentStyle={{paddingVertical: 5}}
        mode="contained"
        onPress={openCamera}
        style={styles.returnBtn}>
        Solicitar permisos
      </Button>
      </SafeAreaView>
      )}
      </>
  );
}
