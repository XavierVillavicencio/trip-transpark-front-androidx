import {
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {AuthContext} from '../../context';
import {calcularTotalTarifa} from '../../helpers';
import {Button, Headline, Text, useTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React = require('react');

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function PaymentMethod({route, navigation}: Props) {
  const {errorMessage, removeError} = useContext(AuthContext);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [retrieve, setRetrieve] = useState(true);
  const [tarifa, setTarifa] = useState('');
  const [subtotal, setSubtotal] = useState('');
  const [IVA, setIVA] = useState('');
  const [duracion, setDuracion] = useState('');
  const [transactionNo, setTransactionNo] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [time, setTime] = useState('');
  const [codigoDescuento, setCodigoDescuento] = useState('');
  const [descuento, setDescuento] = useState(0);
  const {user} = useContext(AuthContext);
  const {testDiscount, customer, discountCode} = route.params;

  const saveInvoiceData = async transactionNo => {
    const token = await AsyncStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    var raw = JSON.stringify({
      ticid: transactionNo, // código del ticket
      ticketpaymentreference: '', // sale vacío porque leugo se actualiza con el pago del ticket
      ruc: customer ? '--' : user?.cedula,
      name: customer
        ? 'Consumidor Final'
        : ` ${user?.firstname} ${user?.lastname}`,
      email: customer ? '--' : user?.email,
      phone: customer ? '--' : user?.phone,
      address: customer ? '--' : user?.address,
      status: 'pending',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://app.transpark.br-st.net/invoices', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const ticketCodeTmp = await AsyncStorage.getItem('ticketCode');
        console.info('/** DiscountCode **/');
        console.info({discountCode});
        console.info('/** DiscountCode **/');
        let dataTicket = JSON.parse(ticketCodeTmp);
        const entryTime = new Date(dataTicket.data.entryDate);
        const currentTimeGMT = new Date();
        const offsetMs = -5 * 60 * 60 * 1000; // -5 hours in milliseconds
        const currentTime = new Date(); // new Date(currentTimeGMT.getTime() + offsetMs);
        const duration = Math.round((currentTime - entryTime) / (1000 * 60));
        const totalsArray = calcularTotalTarifa(
          duration,
          testDiscount,
          discountCode,
        );
        setDescuento(totalsArray.descuento);
        setTime(totalsArray.lostiempos);
        setTarifa(totalsArray.total);
        setDuracion(totalsArray.duration);
        setTransactionNo(dataTicket.data.transactionNo);
        setCarPlate(dataTicket.data.license);
        setIVA(totalsArray.iva);
        setSubtotal(totalsArray.subtotal);
        saveInvoiceData(dataTicket.data.transactionNo);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={require('../../imgs/Grupo_2280.png')}
          style={{width: '100%', alignSelf: 'flex-start'}}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../imgs/buttonBack.png')}
            style={styles.imageButtonBack}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {tarifa > 0 ? (
          <><Headline style={styles.mainTitle}>
            Selecciona tu método de pago
          </Headline><TouchableOpacity
            onPress={() => navigation.navigate('Paymentez', { testDiscount: testDiscount, discountCode })}>
              <Text style={styles.PaymentMethodLabel}>PAGA CON TARJETA DE CRÉDITO O DÉBITO</Text>
              <Image
                source={require('../../imgs/paga-con-tarjeta-credito-debito.png')}
                style={styles.imagePayment}
                resizeMode="contain"/>
            </TouchableOpacity></>
            ) : ( 
            <Button
              mode="contained"
              uppercase={true}
              buttonColor={theme.colors.primary}
              labelStyle={styles.buttonContinueLabel}
              style={styles.buttonContinue}
              onPress={() =>
                navigation.navigate('PaymentSuccess', {testDiscount: false, discountCode})
              }>
              Habilitar Salida
            </Button>
        )}
        {/**<TouchableOpacity
          onPress={() =>
            navigation.navigate('Paypal', {testDiscount: testDiscount})
          }>
          <Image
            source={require('../../imgs/paga-con-paypal.png')}
            style={styles.imagePayment}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
        <Text style={styles.subtitleData}>Datos de Facturación</Text>
        <View style={styles.containerColumns}>
          <View style={styles.itemColumnsRow}>
            <Text style={styles.itemColumnTitleNombres}>Ticket No.</Text>
          </View>
          <View style={styles.itemColumnsRowName}>
            <Text style={styles.itemColumnText}>{transactionNo}</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnTitle}>Tiempo de Estadía</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnText}>{time}</Text>
          </View>
          <View style={styles.itemColumnsRow}>
            <Text style={styles.itemColumnTitleNombres}>Nombres</Text>
          </View>
          <View style={styles.itemColumnsRowName}>
            <Text style={styles.itemColumnText}>
              {customer
                ? customer.name
                : ` ${user?.firstname} ${user?.lastname}`}
            </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnTitle}>Cédula</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnTitle}>Numero Celular</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnText}>
              {customer ? customer.cedula : user?.cedula}
            </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnText}>
              {customer ? customer.phone : user?.phone}
            </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnTitle}>Dirección</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnTitle}>Email</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnText}>
              {customer ? customer.address : user?.address}
            </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.itemColumnText}>
              {customer ? customer.email : user?.email}
            </Text>
          </View>
        </View>
        <Text style={styles.subtitleData}>Totales</Text>
        <View style={styles.containerColumns}>
          <View style={styles.itemColumnsRow}>
            <Text style={styles.descuento}>Código de Descuento: {
            (discountCode)? discountCode : (parseInt(descuento, 10) > 0)?'Factura de Compra': ' -- '}</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text> </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text> </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.descuentoLabel}>Subtotal</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.descuento}>$ {subtotal}</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.descuentoLabel}>Descuento</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.descuento}>$ {descuento}</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.descuentoLabel}>IVA</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.descuento}>$ {IVA}</Text>
          </View>
          <View style={styles.itemColumnsRow}>
            <Text> </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.totalLabel}>Total a pagar</Text>
          </View>
          <View style={styles.itemColumns}>
            <Text style={styles.total}>$ {tarifa}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemColumnTitle: {
    fontFamily: 'Lato-Black',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  itemColumnTitleNombres: {
    fontFamily: 'Lato-Black',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginLeft: '-7%',
  },
  itemColumnText: {
    fontFamily: 'Lato-Regular',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginLeft: '10%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  subtotalLabel: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: 'Lato-Regular',
    fontSize: 13,
    textAlign: 'left',
    width: '100%',
    marginHorizontal: '25%',
    color: '#666',
  },
  subtotal: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    textAlign: 'left',
    width: '100%',
    marginHorizontal: '25%',
    color: '#666',
  },
  descuentoLabel: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    textAlign: 'left',
    width: '100%',
    marginHorizontal: '25%',
    color: '#666',
  },
  descuento: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: 'Lato-Regular',
    fontSize: 13,
    textAlign: 'left',
    width: '100%',
    marginHorizontal: '25%',
    color: '#666',
  },
  totalLabel: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: 'Lato-Black',
    fontSize: 13,
    textAlign: 'left',
    width: '100%',
    marginHorizontal: '25%',
    color: '#000',
  },
  total: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: 'Lato-Black',
    fontSize: 14,
    textAlign: 'left',
    width: '50%',
    marginHorizontal: '25%',
    color: '#000',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  imageButtonBack: {
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 50,
  },
  containerColumns: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    width: '100%',
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
  itemColumns: {
    width: '50%', // is 50% of container width
  },
  itemColumnsRowName: {
    width: '75%', // is 50% of container width
    //borderBottomColor: '#aaa',
    //borderBottomWidth: 1,
    marginBottom: 0,
    marginHorizontal: '-3%',
    marginVertical: 0,
  },
  itemColumnsRow: {
    width: '75%', // is 50% of container width
    //borderBottomColor: '#aaa',
    //borderBottomWidth: 1,
    marginBottom: 0,
    marginHorizontal: '10%',
    marginVertical: 0,
  },
  imagePayment: {
    width: '75%',
    alignSelf: 'center',
    marginTop: 5,
  },
  subtitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 0,
    padding: 0,
  },
  subtitleData: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 5,
  },
  mainTitle: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    fontSize: 18,
    width: '100%',
    marginHorizontal: '1%',
    marginVertical: '2%',
  },
  PaymentMethodLabel: {
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontSize: 13,
    width: '100%',
    marginHorizontal: '1%',
    marginVertical: '0%',
  },
});
