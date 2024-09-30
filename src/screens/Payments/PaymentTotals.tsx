import {
  Keyboard,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';
import { useForm } from '../../hooks';
import { publicApi } from '../../api/propertiesApi';
import { errorsTable } from '../../helpers';
import { AuthContext } from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wrapper } from '../../components';

import {
  Button,
  Headline,
  HelperText,
  Subheading,
  TextInput,
  Text,
  useTheme
} from 'react-native-paper';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function PaymentTotals({ navigation }: Props) {
  const { errorMessage, removeError } = useContext(AuthContext);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const [hidden, setHidden] = useState(true);
  const [passConfirm, setPassConfirm] = useState('');
  const [error, setError] = useState('');
  const [customError, setCustomError] = useState('');

  const [retrieve, setRetrieve] = useState(true);
  const [tarifa, setTarifa] = useState('');
  const [duracion, setDuracion] = useState('');
  const [transactionNo, setTransactionNo] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const ticketCodeTmp = await AsyncStorage.getItem('ticketCode');
        let dataTicket = JSON.parse(ticketCodeTmp);
        let tariff = dataTicket.data.tariff;
        let transactionNo = dataTicket.data.transactionNo;
        let carPlate = dataTicket.data.license;
        let duration = dataTicket.data.duration;
        let dateTicket = new Date(dataTicket.data.inTime);
        setTime(dateTicket.toLocaleTimeString('en-US'));
        console.info({tariff});
        console.info({duration});
        console.info({transactionNo});
        
        setTarifa(tariff);
        setDuracion(duration);
        setTransactionNo(transactionNo);
        setCarPlate(carPlate);
        //await paymentConfirmation(ticketCodeTmp);
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
        style={{ width: '100%', alignSelf: 'flex-start' }}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../imgs/buttonBack.png')}
            style={styles.imageButtonBack}
            resizeMode="stretch"
          />
      </TouchableOpacity>
      <Image
        source={require('../../imgs/tutorialTotales.png')}
        style={{ width: '100%', alignSelf: 'flex-start', marginTop: 10 }}
        resizeMode="contain"
      />
      <View
          style={{marginVertical: 10}}
        >
        <View style={styles.itemColumnsRow}>
          <Text
              style={{
                fontFamily: 'Lato-Black',
                fontSize: 23,
                alignSelf: 'center',
              }}> Nombre del titular:
              
            </Text>
            <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              alignSelf: 'center',
              marginTop: 10
            }}>
              {` ${user?.firstname} ${user?.lastname}`}
            </Text>
        </View>
        <View style={styles.itemColumnsRow}>
            <Text
              style={{
                fontFamily: 'Lato-Black',
                fontSize: 22,
                alignSelf: 'center',
              }}>
              Hora de Entrada:
            </Text>
            </View>
            <View style={styles.itemColumnsRow}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                fontSize: 20,
                alignSelf: 'center',
              }}>
                {time}
            </Text>
            </View>
            <View style={styles.itemColumnsRow}>
            <Text
              style={{
                fontFamily: 'Lato-Black',
                fontSize: 22,
                alignSelf: 'center',
              }}>
              Número de Ticket:
            </Text>
            </View>
            <View style={styles.itemColumnsRow}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                fontSize: 20,
                alignSelf: 'center',
                marginBottom: 0,
              }}>
              {transactionNo}
            </Text>
            </View>
            
            { carPlate !== '' ?
            <View style={styles.itemColumnsRow}><Text
                style={{
                  fontFamily: 'Lato-Black',
                  fontSize: 22,
                  alignSelf: 'center',
                }}>
                Placa:
              </Text><Text
                style={{
                  fontFamily: 'Lato-Regular',
                  fontSize: 20,
                  alignSelf: 'center',
                  marginBottom: 15,
                }}>
                  {carPlate}
                </Text></View> : <></>}
        </View>
        <View style={styles.containerColumns}>
          <View style={styles.itemColumns}>
            <Text 
            style={{
            marginTop: 0,
            marginBottom: 0,
            fontFamily: 'Lato-Regular',
            fontSize: 20,
            textAlign: 'left',
            width: '100%',
            marginHorizontal: '25%',
            color: '#666'
          }}>
              Subtotal:
            </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontFamily: 'Lato-Regular',
              fontSize: 28,
              textAlign: 'left',
              width: '100%',
              marginHorizontal: '25%',
              color: '#666',
            }}
            >
              ${tarifa}
            </Text>
          </View>
          <View style={styles.itemColumnsRow}>
            <Text> </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text 
            style={{
            marginTop: 0,
            marginBottom: 0,
            fontFamily: 'Lato-Regular',
            fontSize: 20,
            textAlign: 'left',
            width: '100%',
            marginHorizontal: '25%',
            color: '#666'
          }}>
              Descuento:
            </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontFamily: 'Lato-Regular',
              fontSize: 28,
              textAlign: 'left',
              width: '100%',
              marginHorizontal: '25%',
              color: '#666',
            }}
            >
              $0.00
            </Text>
          </View>
          <View style={styles.itemColumnsRow}>
            <Text> </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text 
            style={{
            marginTop: 0,
            marginBottom: 0,
            fontFamily: 'Lato-Black',
            fontSize: 20,
            textAlign: 'left',
            width: '100%',
            marginHorizontal: '25%',
            color: '#000'
          }}>
              Total a pagar:
            </Text>
          </View>
          <View style={styles.itemColumns}>
            <Text
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontFamily: 'Lato-Black',
              fontSize: 30,
              textAlign: 'left',
              width: '100%',
              marginHorizontal: '25%',
              color: '#000',
            }}
            >
              ${tarifa}
            </Text>
          </View>
      </View>
      <Button
          buttonColor={theme.colors.secondary}
          contentStyle={{paddingVertical: 10, fontSize: 30}}
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={() => navigation.navigate('PaymentMethod')}
          style={{marginTop: 10, width: '100%', borderRadius: 20, fontSize: 30}}>
          Realizar Pago
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  imageButtonBack: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
  containerColumns: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    width: '100%',
  },
  itemColumns: {
    width: '50%', // is 50% of container width
  },
  itemColumnsRow: {
    width: '100%', // is 50% of container width
    borderBottomColor: '#ddd',
    borderBottomWidth: 2,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
