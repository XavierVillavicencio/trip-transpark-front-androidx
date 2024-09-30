import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackScreenProps} from '@react-navigation/stack';
import {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  TextInput,
  Modal,
  Portal,
  Button,
  HelperText,
  Text,
  useTheme,
} from 'react-native-paper';
import {ErrorWrapper} from '../../components';
import {AuthContext, PropertiesContext} from '../../context';
import {PropertiesStackParams} from '../../navigation';
import NetInfo from '@react-native-community/netinfo';
import {useForm} from '../../hooks';
import React = require('react');
interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function TabsHomeTicket({navigation, result}: Props) {
  const {user, logout} = useContext(AuthContext);
  const {loginThirdParty} = useContext(PropertiesContext);
  const [data, setData] = useState('');
  const [time, setTime] = useState('');
  const [ticketCode, setTicketCode] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [ticketStatus, setTicketStatus] = useState('PAID');
  const [retrieve, setRetrieve] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [errorCoupon, setErrorCoupon] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 50,
    paddingVertical: 50,
  };
  
  const theme = useTheme();
  const styles = StyleSheet.create({
    textContent: {
      fontFamily: 'Lato-Regular',
      fontSize: 12,
      alignSelf: 'center',
      marginBottom: 3,
    },
    textTitle: {
      fontFamily: 'Lato-Bold',
      fontSize: 14,
      alignSelf: 'center',
      marginVertical: 0,
    },
    wrapperTexts: {
      marginTop: '-8%',
      width: '100%',
      marginBottom: '5%',
      height: '45%',
      fontFamily: 'Lato-Regular',
    },
    imageLogo: {
      width: '100%',
      height: '52%',
    },
    wrapperHomeTicket: {
      backgroundColor: '#ffffff',
      alignContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'space-between',
      alignContent: 'flex-end',
      width: '100%',
      height: 155,
    },
    fixToText: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
    },
    buttonContinueLabel: {
      fontSize: 10,
    },
    buttonContinue: {
      width: '75%',
      alignSelf: 'center',
      borderRadius: 20,
      marginTop: 3,
      marginHorizontal: '10%',
    },
    textWarningNotFound: {
      marginTop: 0,
      marginBottom: 0,
      fontFamily: 'Lato-Bold',
      fontSize: 14,
      color: '#fff',
      textAlign: 'center',
      width: '100%',
    },
    ViewWrapper: {
      backgroundColor: theme.colors.favorite,
      padding: 8,
      borderRadius: 20,
      marginVertical: 10,
      marginHorizontal: '12%',
      width: '75%',
    },
    TextTitleTransactions: {
      marginTop: 0,
      marginBottom: 0,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      color: '#fff',
      textAlign: 'center',
    },
  });

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

  /* Validamos si el ticket está en el día de hoy, caso contrario debería dar error */
  const isToday = (inTime: string): boolean => {
    // 1. Crea una nueva fecha en UTC -5
    const todayUTC5 = new Date();
    todayUTC5.setUTCHours(todayUTC5.getUTCHours() - 5);
    todayUTC5.setUTCMinutes(0, 0, 0); // Opcional: Poner minutos, segundos y milisegundos a 0

    // 2. Crea una nueva fecha a partir de la cadena de entrada (asumiendo UTC)
    const inputDate = new Date(inTime);

    // 3. Elimina las horas, minutos, segundos y milisegundos de ambas fechas
    todayUTC5.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    // 4. Compara solo año, mes y día
    return (
      todayUTC5.getFullYear() === inputDate.getFullYear() &&
      todayUTC5.getMonth() === inputDate.getMonth() &&
      todayUTC5.getDate() === inputDate.getDate()
    );
  };

  useEffect(() => {
    // Subscribe
    NetInfo.addEventListener(state => {
      //console.info('///********//********////');
      //console.info('///  TABSHOMETICKET  ////');
      //console.info('///********//********////');
      //console.info({state});
      if (!(state.isConnected && state.isInternetReachable)) {
        navigation.navigate('ErrorConnection');
      }
    });

    const intervalId = setInterval(async () => {
      await retrieveData();
      console.info('estamos consultando el ticket nuevamente');
    }, 60000);

    const unsubscribe = navigation.addListener('focus', async () => {
      console.log('Im focus tabshometicket');
      await retrieveData();
    });
    const retrieveData = async () => {
      try {
        const valueString = await AsyncStorage.getItem('ticketCode');
        if (valueString != null) {
          try {
            let value = JSON.parse(valueString);
            const transactionNo = value.data.transactionNo;
            value = await sendThirdParty(transactionNo);
            console.info(value);
            if (value != null) {
              value = JSON.parse(value);
              console.info('/* {value} */');
              console.info({value});
              console.info('/* {value} */');
              if (typeof value.data.inTime === 'undefined') {
                console.log('value.data is not defined');
                navigation.navigate('ErrorTicket');
              } else {
                setData(value.data);
                let dateTicket = new Date(value.data.inTime);
                if (isToday(value.data.inTime)) {
                  setTime(dateTicket.toLocaleTimeString('en-US'));
                  setTicketCode(value.data.transactionNo);
                  setCarPlate(value.data.license);
                  setTicketStatus(value.data.paymentStatus);
                  console.log('Estamos en el tabshometicket');
                } else {
                  await AsyncStorage.setItem('ticketCode', '');
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'QrDesign',
                      },
                    ],
                  });
                  console.log('ticket no está en el presente');
                }
              }
              return null;
            }
          } catch (error) {
            console.error('Error al analizar JSON:', error);
          }
        }
      } catch (error) {
        console.info('error log viene acá porque valueString is invalid');
        console.log({error});
      }
    };
    /** Is these needed? */
    /*if (result) {
      setData(result.data);
      if (result.data.paymentStatus !== 'UNPAID') {
        retrieveData();
      } else {
        let dateTicket = new Date(result.data.inTime);
        setTime(dateTicket.toLocaleTimeString('en-US'));
        setTicketCode(result.data.transactionNo);
        setCarPlate(result.data.license);
        setTicketStatus(result.data.paymentStatus);
      }*/
    //} else {
    if (retrieve) {
      retrieveData();
      setRetrieve(false);
    }
    //}
    unsubscribe();
    return () => clearInterval(intervalId);
    //return unsubscribe;
  }, [navigation, result, retrieve]);

  const sendThirdParty = async (transactionNo: string) => {
    try {
      let testInteger = parseInt(transactionNo, 10);
      if (!Number.isInteger(testInteger)) {
        navigation.navigate('ErrorTicket');
        return null;
      }
      var myHeaders = new Headers();
      // const elNuevoToken = await AsyncStorage.getItem('id_token');
      const elNuevoToken = await loginThirdParty();
      console.log({elNuevoToken});
      myHeaders.append('Authorization', 'Bearer ' + elNuevoToken);
      const resultadofinal = fetch(
        'https://thirdparty.transpark.br-st.net/api/v1/pms/general/Partner/InquiryTransaction?locationId=PS00000011&transactionNo=' +
          transactionNo,
        {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow',
        },
      )
        .then(response => response.text())
        .then(resultado => {
          console.info('/*****/');
          console.info('/*245*/');
          console.info('repetimos el bug');
          console.info('/*****/');
          console.info({resultado});
          return resultado;
        })
        .catch(error => {
          navigation.navigate('ErrorTicket');
          console.log('error', error);
        });
      return resultadofinal;
    } catch (error: any) {
      console.error(
        'There is an error sending the data; please check the console.',
      );
      console.log(error.response.data);
    }
  };

  const checkDiscountCode = async () => {
    const palabrasClave = [
      'freeforall',
      'twentyfivediscount',
      'fiftydiscount',
      'singleexit',
    ];
    const contienePalabraClave = palabrasClave.some(
      palabra => email.toLowerCase() === palabra,
    );
    if (contienePalabraClave) {
      setEmail('');
      navigation.navigate('InvoiceDetails', {discountCode: email.toLowerCase()});
      hideModal();
    } else {
      setErrorCoupon('Código inválido - Por favor, intenta nuevamente');
    }
    return contienePalabraClave;
  };

  return (
    <SafeAreaView>
      {isValid ? (
        <View style={styles.wrapperHomeTicket}>
          <Image
            source={require('../../imgs/imageIntro.png')}
            style={styles.imageLogo}
            resizeMode="stretch"
          />
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <Text>
                Si recibiste un código de descuento, por favor ingresalo en el
                cuadro de texto a continuación:
              </Text>
              {user?.role === 'A' ? (
                <Text>
                  Códigos de prueba: freeforall, twentyfivediscount,
                  fiftydiscount y singleexit (100 salidas); el presente texto
                  solo se muestra para administradores, quienes podría realizar
                  las pruebas.
                </Text>
              ) : null}
              <TextInput
                error={!!errorCoupon}
                label="MiCodigo"
                onChangeText={text => setEmail(text)}
                style={{
                  width: '100%',
                  marginVertical: 20,
                  backgroundColor: theme.colors.background,
                  fontFamily: 'Lato-Regular',
                }}
                value={email}
                autoCapitalize="none"
                right={<TextInput.Icon icon="ticket" />}
              />
              <HelperText type="error" visible={!!errorCoupon}>
                {errorCoupon}
              </HelperText>
              <Button
                mode="contained"
                uppercase={true}
                buttonColor={theme.colors.primary}
                labelStyle={styles.buttonContinueLabel}
                style={styles.buttonContinue}
                onPress={() => checkDiscountCode()}>
                Enviar código
              </Button>
              <Button
                mode="contained"
                uppercase={true}
                buttonColor={theme.colors.placeholder}
                labelStyle={styles.buttonContinueLabel}
                style={styles.buttonContinue}
                onPress={hideModal}>
                Cerrar
              </Button>
            </Modal>
          </Portal>
          <View style={styles.wrapperTexts}>
            <Text style={styles.textContent}>
              !HOLA¡ {`${user?.firstname} ${user?.lastname}`}
            </Text>
            <Text style={styles.textTitle}>Hora de ingreso:</Text>
            <Text style={styles.textContent}>{time}</Text>
            <Text style={styles.textTitle}>Número de Ticket:</Text>
            <Text style={styles.textContent}>{ticketCode}</Text>
            {carPlate !== '' ? (
              <>
                <Text style={styles.textTitle}>Placa:</Text>
                <Text style={styles.textContent}>{carPlate}</Text>
              </>
            ) : (
              <></>
            )}
            {user?.role === 'A' ? (
              <Button
                mode="contained"
                uppercase={true}
                buttonColor={theme.colors.primary}
                labelStyle={styles.buttonContinueLabel}
                style={styles.buttonContinue}
                onPress={() => removeItemFromStorage()}>
                Abandonar Ticket (Solo administradores)
              </Button>
            ) : null}
            {user?.role === 'A' && ticketStatus === 'UNPAID' ? (
              <View>
                <Button
                  mode="contained"
                  uppercase={true}
                  buttonColor={theme.colors.primary}
                  labelStyle={styles.buttonContinueLabel}
                  style={styles.buttonContinue}
                  onPress={() =>
                    navigation.navigate('PaymentSuccess', {testDiscount: false, discountCode: null})
                  }>
                  Habilitar Ticket (Solo administradores)
                </Button>
              </View>
            ) : null}
            {ticketStatus === 'UNPAID' ? (
              <View>
                <Button
                  mode="contained"
                  uppercase={true}
                  buttonColor={theme.colors.secondary}
                  labelStyle={styles.buttonContinueLabel}
                  style={styles.buttonContinue}
                  onPress={() => navigation.navigate('InvoiceCamera')}>
                  Paga con factura de consumo
                </Button>
                <Button
                  mode="contained"
                  uppercase={true}
                  labelStyle={styles.buttonContinueLabel}
                  buttonColor={theme.colors.primary}
                  style={styles.buttonContinue}
                  onPress={() =>
                    navigation.navigate('InvoiceDetails', {discountCode: null})
                  }>
                  Paga sin factura de consumo
                </Button>
                <Button
                  mode="contained"
                  uppercase={true}
                  labelStyle={styles.buttonContinueLabel}
                  buttonColor={theme.colors.placeholder}
                  style={styles.buttonContinue}
                  onPress={showModal}>
                  Ingresar código de descuento
                </Button>
              </View>
            ) : null}

            {ticketStatus === 'FREE' ? (
              <View>
                <View style={styles.ViewWrapper}>
                  <Text style={styles.textWarningNotFound}>
                      Ticket Gratuito
                  </Text>
                </View>
                <Button
                  mode="contained"
                  uppercase={true}
                  labelStyle={styles.buttonContinueLabel}
                  buttonColor={theme.colors.secondary}
                  style={styles.buttonContinue}
                  onPress={() =>
                    navigation.navigate('QRCodeGenerator', {
                      QR: ticketCode,
                    })
                  }>
                  Mostrar código QR de Salida
                </Button>
              </View>
            ) : null}
            {ticketStatus === 'PAID' ? (
              <View>
                <View style={styles.ViewWrapper}>
                  <Text style={styles.textWarningNotFound}>
                      Ticket Pagado
                  </Text>
                </View>
                <Button
                  mode="contained"
                  uppercase={true}
                  labelStyle={styles.buttonContinueLabel}
                  buttonColor={theme.colors.secondary}
                  style={styles.buttonContinue}
                  onPress={() =>
                    navigation.navigate('QRCodeGenerator', {
                      QR: ticketCode,
                    })
                  }>
                  Mostrar código QR de Salida
                </Button>
              </View>
            ) : null}
            {/**
             *
             *
             */}
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
              onPress={() => navigation.navigate('Benefits')}
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
        </View>
      ) : (
        <ErrorWrapper>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Lato-Regular',
              color: theme.colors.white,
            }}>
            El ticket no es válido por favor intenta nuevamente.
          </Text>
          <Button
            style={{marginTop: 50, borderRadius: 20}}
            mode="contained"
            color={theme.colors.primary}
            onPress={() => navigation.navigate('TabsHome')}>
            Regresar
          </Button>
        </ErrorWrapper>
      )}
    </SafeAreaView>
  );
}
