import {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../../context';
import {PropertiesStackParams} from '../../navigation';
import {useForm} from '../../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  Headline,
  useTheme,
  Icon,
  ActivityIndicator,
  Subheading,
  Text,
} from 'react-native-paper';
import React = require('react');
import {PropertiesContext} from '../../context';
import {parseGMT5Date} from '../../helpers';
interface Props extends StackScreenProps<PropertiesStackParams, any> {}
export function TransactionUserScreen({navigation}: Props) {
  const {loginThirdParty} = useContext(PropertiesContext);
  const [token, setToken] = useState(null);
  const {user, logout} = useContext(AuthContext);
  const {errorMessage, removeError} = useContext(AuthContext);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [listTransactions, setListTransactions] = useState(
    <ActivityIndicator
      color="#000000"
      style={{
        height: 200,
        marginTop: '10%',
        transform: [{scaleX: 3}, {scaleY: 3}],
      }}
    />,
  );
  const {id, firstname, lastname, cedula, celular, direccion, onChange} =
    useForm({
      id: user?.userId,
      firstname: user?.firstname,
      lastname: user?.lastname,
      cedula: user?.cedula,
      celular: user?.phone,
      direccion: user?.address,
    });

  const emptyTransactions = () => {
    return (
      <View style={styles.ViewWrapper}>
        <Text style={styles.textWarningNotFound}>
          No encontramos transacciones.
        </Text>
      </View>
    );
  };

  const setTicketCodeIntoSession = async (ticketCode: string) => {
    await sendThirdParty(ticketCode);
  };

  const sendThirdParty = async (transactionNo: string) => {
    try {
      let testInteger = parseInt(transactionNo, 10);
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
          await AsyncStorage.setItem('ticketCode', resultado); // el único que debe irse guardando
          navigation.navigate('TabsHomeTicket');
        })
        .catch(error => {
          navigation.navigate('ErrorTicket');
          console.log('error', error);
        });
    } catch (error: any) {
      console.error(
        'There is an error sending the data; please check the console.',
      );
      console.log(error.response.data);
    }
  };

  const removeTicket = async (id) => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch("https://app.transpark.br-st.net/tickets/"+id, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('/* DELETE RESULT: */');
        console.log({result});
        loadTransactions();
      })
      .catch(error => console.log('error', error));
  };

  const loadTransactions = async () => {
    removeError();
    setError('');
    setLoading(true);
    Keyboard.dismiss();
    const token = await AsyncStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const dataRecepted = await fetch(
      'https://app.transpark.br-st.net/tickets/ownerid',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        if (result && result.length > 2) {
          let resultJson = JSON.parse(result);
          let dataParsed = resultJson.map((value: any, key: string) => {
            const cadenaFechaGMT5 = parseGMT5Date(value.entrytime);
            return (
              <View style={styles.transactionCard} key={'rowHistory-' + key}>
                <View style={styles.row}>
                  <Text style={styles.bold}>Estado:</Text>
                  <Text style={styles.text}>
                    {value.status === 'UNPAID' ? 'Pendiente' : null}
                    {value.status === 'PAID' ? 'Pagado' : null}
                    {value.status === 'FREE' ? 'Gratuito' : null}
                    {value.status === 'ABANDONED' ? 'Abandonado' : null}
                    {value.status === 'EXPIRED' ? 'Expirado' : null}
                    {value.status === 'EXITED'
                      ? 'Fuera del Establecimiento'
                      : null}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.bold}>Código del Ticket:</Text>
                  <Text style={styles.text}>{value.code}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.bold}>Fecha de Ingreso:</Text>
                  <Text style={styles.text}>{cadenaFechaGMT5}</Text>
                </View>
                {value && value.plate ? (
                  <View style={styles.row}>
                    <Text style={styles.bold}>Placa:</Text>
                    <Text style={styles.text}>{value.plate}</Text>
                  </View>
                ) : null}
                <View style={styles.row}>
                  <Text style={styles.bold}>Lectura:</Text>
                  <Text style={styles.text}>{value.type}</Text>
                </View>
                {value.status !== 'FREE' &&
                value.status !== 'ABANDONED' &&
                value.status !== 'EXPIRED' ? (
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.bold}>Subtotal:</Text>
                      <Text style={styles.text}>{value.subtotal}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.bold}>IVA:</Text>
                      <Text style={styles.text}>{value.iva}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.bold}>Total:</Text>
                      <Text style={styles.text}>{value.total}</Text>
                    </View>
                  </View>
                ) : null}
                {value.status === 'UNPAID' ? (
                  <Button
                    mode="contained"
                    uppercase={true}
                    labelStyle={styles.buttonContinueLabel}
                    buttonColor={theme.colors.primary}
                    style={styles.buttonContinue}
                    onPress={() => setTicketCodeIntoSession(value.code)}>
                    Consultar Ticket
                  </Button>
                ) : null}
                {value.status !== 'ABANDONED' &&
                value.status !== 'EXPIRED' &&
                value.status !== 'EXITED' ? (
                  <Button
                    mode="contained"
                    uppercase={true}
                    labelStyle={styles.buttonContinueLabel}
                    buttonColor={theme.colors.secondary}
                    style={styles.buttonContinue}
                    onPress={() =>
                      navigation.navigate('QRCodeGenerator', {
                        QR: value.code,
                      })
                    }>
                    Mostrar código QR
                  </Button>
                ) : null}
                {user?.role === 'A' ? (
                  <Button
                    mode="contained"
                    uppercase={true}
                    labelStyle={styles.buttonContinueLabel}
                    buttonColor={theme.colors.danger}
                    style={styles.buttonContinue}
                    onPress={() => removeTicket(value.id)}>
                    Eliminar Ticket
                  </Button>
                ) : null}
              </View>
            );
          });
          setListTransactions(dataParsed);
        } else {
          const merror = emptyTransactions();
          setListTransactions(merror);
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    (async () => {
      const thirpartyToken = await loginThirdParty();
      if (!thirpartyToken) {
        navigation.navigate('ErrorConnection');
      } else {
        setToken(thirpartyToken);
        loadTransactions();
      }
    })();
  }, []);

  const styles = StyleSheet.create({
    headline: {
      fontWeight: 'bold',
      fontFamily: 'Lato-Bold',
      marginHorizontal: 25,
    },
    imageButtonBack: {
      marginVertical: 10,
      marginHorizontal: 50,
    },
    imageLogos: {
      width: '90%',
      alignSelf: 'flex-start',
      marginHorizontal: 25,
    },
    TextTerms: {
      marginTop: 10,
      fontFamily: 'Lato-Bold',
      color: '#0093D0',
    },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      marginHorizontal: 25,
      marginVertical: 10,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    column: {
      flex: 1,
      flexDirection: 'column',
    },
    bold: {
      fontFamily: 'Lato-Bold',
      fontWeight: 'bold',
      marginRight: 5,
      fontSize: 12,
    },
    text: {
      fontFamily: 'Lato-Normal',
      fontSize: 10,
    },
    transactionCard: {
      paddingVertical: 20,
      paddingHorizontal: 10,
      marginTop: 10,
      fontFamily: 'Lato-Bold',
      borderWidth: 1,
      borderColor: '#000',
      borderStyle: 'solid',
    },
    ViewWrapper: {
      backgroundColor: theme.colors.favorite,
      padding: 15,
      borderRadius: 10,
      marginVertical: 50,
    },
    TextTitleTransactions: {
      marginTop: 0,
      marginBottom: 0,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      color: '#fff',
      textAlign: 'center',
    },
    textWarningNotFound: {
      marginTop: 0,
      marginBottom: 0,
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
    },
    subheading: {
      marginTop: 3,
      marginBottom: 3,
      fontFamily: 'Lato-light',
      fontSize: 17,
      marginHorizontal: 25,
    },
    buttonContinueLabel: {
      fontSize: 10,
    },
    buttonContinue: {
      width: '75%',
      alignSelf: 'center',
      borderRadius: 20,
      marginTop: 5,
      marginHorizontal: '10%',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../imgs/Grupo_2280.png')}
        style={styles.imageLogos}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../imgs/buttonBack.png')}
          style={styles.imageButtonBack}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      <Headline style={styles.headline}>HISTORIAL</Headline>
      <Subheading style={styles.subheading}>
        A continuación puedes observar un histórico de las transacciones
        realizadas por nuestra APP.
      </Subheading>
      <ScrollView style={styles.scrollView}>{listTransactions}</ScrollView>
    </SafeAreaView>
  );
}
