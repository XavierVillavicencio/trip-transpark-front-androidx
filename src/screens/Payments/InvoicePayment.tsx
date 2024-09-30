import {
  Keyboard,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {PropertiesStackParams} from '../../navigation';
import {useForm} from '../../hooks';
import {publicApi} from '../../api/propertiesApi';
import {errorsTable} from '../../helpers';
import {AuthContext} from '../../context';
import {SelectList} from 'react-native-dropdown-select-list';
import {Wrapper} from '../../components';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Button,
  Headline,
  HelperText,
  Subheading,
  TextInput,
  Text,
  useTheme,
  Searchbar,
} from 'react-native-paper';
import React = require('react');
import {TouchableOpacity} from 'react-native';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function InvoicePayment({navigation}: Props) {
  const {errorMessage, removeError} = useContext(AuthContext);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [hidden, setHidden] = useState(true);
  const [ticketCode, setTicketCode] = useState('000');
  const [error, setError] = useState('');
  const [customError, setCustomError] = useState('');
  const [retrieve, setRetrieve] = useState(true);
  const [selected, setSelected] = React.useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [descuento,setDescuento] = useState(0);
  const [valor, setValor] = useState('');

  const aplicarFormato = (input) => {
    
    // Eliminar caracteres no numéricos
    const soloNumeros = input.replace(/[^\d]/g, '');

    // Aplicar formato específico
    const formato = soloNumeros.replace(/^(\d{3})(\d{3})(\d{1,15})$/, '$1-$2-$3');
    console.info({formato});
    setValor(formato);
  };

  const data = [
    {key: '1793198585001', value: 'ACIUM ', ruc: '001-002-000002635'},
    {key: '179214456001', value: 'Montero', ruc: '016-302-000071924'},
    {
      key: '171478996001',
      value: 'Ambar Plata Hecha Joyas',
      ruc: '001-001-000009292',
    },
    {key: '0992676868001', value: 'AMERICAN CLASSIC', ruc: '009-002-000002257'},
    {key: '1792072018001', value: 'American Deli', ruc: '200-050-000036746'},
    {key: '1790349578001', value: 'ANETA', ruc: '072-002-000012021'},
    {key: '1790622207001', value: 'Banda', ruc: '003-002-000000001'},
    {key: '1792072018001', value: 'Cinnabon', ruc: '105-055-000049476'},
    {key: '0990987874001', value: 'Bassa', ruc: '006-001-000023315'},
    {key: '0993372239001', value: 'BURGER KING', ruc: '003-001-000000001'},
    {key: '1714035704001', value: 'Candy', ruc: '025-001-000078059'},
    {
      key: '1792049504001',
      value: 'Casa Res Steak House',
      ruc: '001-008-000119223',
    },
    {
      key: '1102127972001',
      value: 'Casita del Chocolate',
      ruc: '004-001-000026734',
    },
    {key: '0604627976001', value: 'Celular Box', ruc: '001-002-000000676'},
    {key: '1790241483001', value: 'Chaide', ruc: '038-003-000014405'},
    {key: '1793195709001', value: 'CHICBERRY', ruc: '007-001-000033961'},
    {key: '1791251237001', value: 'Claro', ruc: '001-222-004132120'},
    {key: '0990009732001', value: 'Comandato', ruc: '037-002-024501229'},
    {key: '1791354419001', value: 'DIBOND', ruc: '032-001-000022071'},
    {key: '0601831266001', value: 'Devia', ruc: '003-002-000000830'},
    {
      key: '179172083001',
      value: 'Digital Photo Express',
      ruc: '002-020-000079000',
    },
    {key: '1792538211001', value: 'ENTRESUEÑOS', ruc: '002-002-000001537'},
    {key: '1790985504001', value: 'ETAFASHION', ruc: '006-022-000084026'},
    {key: '1792043662001', value: 'Fatto', ruc: '004-001-000007746'},
    {key: '1792456851001', value: 'Five Stars', ruc: '002-002-00000xxxx'},
    {key: '1790710319001', value: 'Fybeca', ruc: '004-028-000006856'},
    {
      key: '1791415132001',
      value: 'KENTUCKY FRIED CHICKEN',
      ruc: '002-050-000463783',
    },
    {key: '1790646483001', value: 'KOAJ', ruc: '013-003-000070817'},
    {
      key: '0190345963001',
      value: 'Almacenes La Victoria',
      ruc: '011-101-000014328',
    },
    {key: '1790994708001', value: 'Lee', ruc: '003-002-000046410'},
    {key: '0990967946001', value: 'Loteria Nacional', ruc: '439-001-000356822'},
    {
      key: '1792642183001',
      value: 'Lucia Coffee Shop',
      ruc: '002-001-000018958',
    },
    {key: '1792253594001', value: 'MÄCHLER', ruc: '027-002-000000625'},
    {key: '1791413237001', value: 'MARATHON', ruc: '010-030-000151801'},
    {key: '1792755158001', value: 'MARCELO SPORTS', ruc: '007-002-000001910'},
    {key: '1790397815001', value: 'MARTINIZING', ruc: '004-101-000026699'},
    {key: '1791308832001', value: 'MC DONALDS', ruc: '007-001-000915695'},
    {key: '1791984722001', value: 'MEDICITY', ruc: '518-004-000065613'},
    {key: '1792397561001', value: 'MIX TWO', ruc: '008-011-000024812'},
    {key: '0601831266001', value: 'Mundo Display', ruc: '005-002-000000651'},
    {
      key: '1793204758001',
      value: 'MUNDO MAGICO DE LA MASCOTA',
      ruc: '009-003-000008453',
    },
    {
      key: '1792423309001',
      value: 'MY CASE (MOBILE ACCESORIES)',
      ruc: '002-004-000002664',
    },
    {key: '0502844905001', value: 'Optica Los Andes', ruc: '011-002-000004380'},
    {key: '0502844905001', value: 'Optica Los Andes', ruc: '011-002-000004380'},
    {
      key: '0502844905001',
      value: 'OPTICAS DEPORTIVAS',
      ruc: '011-002-000004380',
    },
    {key: '099241377001', value: 'GMO', ruc: '015-002-000036610'},
    {key: '1791253787001', value: 'PAT PRIMO', ruc: '008-082-0000038712'},
    {key: '1790027791001', value: 'Pical', ruc: '008-151-000008511'},
    {key: '0990000530001', value: 'POLIPAPEL', ruc: '092-101-000038951'},
    {key: '1791997891001', value: 'Pollo Campero', ruc: '003-004-000269267'},
    {
      key: '1791959523001',
      value: 'Promoimport Motos',
      ruc: '001-002-000002606',
    },
    {key: '1791253787001', value: 'PAT PRIMO', ruc: '008-082-0000038712'},
    {key: '1717467672001', value: 'Stone', ruc: '001-001-000000418'},
    {key: '1790016919001', value: 'Supermaxi', ruc: '002-101-000420776'},
    {key: '1792236894001', value: 'TATY', ruc: '029-001-0000889989'},
    {key: '1716848385001', value: 'Alonsso', ruc: '002-100-000000931'},
    {key: '0992952601001', value: 'DIPIUR', ruc: '032-002-000002865'},
    {key: '1792180910001', value: 'FUNDACION VISUAL', ruc: '017-100-000000776'},
    {key: '1715103949001', value: 'Gamers Pro', ruc: '004-002-000000380'},
    {key: '099021058001', value: 'Juan Marcet', ruc: '011-004-000584245'},
    {
      key: '0400536728001',
      value: 'KIKI NAILS&BEAUTY',
      ruc: '002-002-000000000',
    },
    {key: '1791256115001', value: 'Movistar', ruc: '048-333-004400492'},
    {key: '1710138296001', value: 'PUSH', ruc: '007-701-000000545'},
    {key: '0990000530001', value: 'PYCCA', ruc: '092-101-000038951'},
    {
      key: '0992106891001',
      value: 'SWEET & COFFEE LOCAL',
      ruc: '060-050-000004377',
    },
    {key: '1710793934001', value: 'ZAKY', ruc: '002-003-000001160'},
    {key: '1792003881001', value: 'BUFFALOS GRILL', ruc: '040-001-0000141108'},
    {key: '1792757887001', value: 'MONOBOLON ', ruc: '007-002-000012201'},
    {key: '1791274156001', value: 'Crepes & Wafles', ruc: '008-001-000168404'},
    {
      key: '1792813328001',
      value: 'EL PALACIO DE LA FRITADA EXPRESS',
      ruc: '002-201-000125324',
    },
    {key: '1792374945001', value: 'GO GREEN', ruc: '004-001-000020885'},
    {
      key: '1792689864001',
      value: 'HAMBURGUESAS DEL CORRAL',
      ruc: '008-200-000070567',
    },
    {key: '1792072018001', value: 'IL CAPO DI MANGI', ruc: '109-051-000234592'},
    {
      key: '1792141486001',
      value: 'JUAN VALDEZ LOCAL',
      ruc: '041-050-000219864',
    },
    {
      key: '1791891325001',
      value: 'Los Ceviches de la Rumiñahui',
      ruc: '006-001-000291014',
    },
    {key: '1792003881001', value: 'MAYFLOWER', ruc: '040-001-0000141108'},
    {key: '1792817854001', value: 'Shawarma Show', ruc: '001-001-000064733'},
    {key: '1791997891001', value: 'TEXAS CHICKEN', ruc: '002-002-000357116'},
    {key: '1793140238001', value: 'YOGURT AMAZONAS', ruc: '003-002-000026122'},
    {
      key: '1792723663001',
      value: 'FRUTERIA MONSERRATE',
      ruc: '015-100-000001294',
    },
    {key: '1802907731001', value: 'AMORECO', ruc: '002-001-000001379'},
    {key: '1792236894001', value: 'Taty', ruc: '017-001-000052075'},
    {key: '1002468377001', value: 'Najera', ruc: '003-003-000000409'},
    {key: '0590031984001', value: 'BUBBLE GUMMERS', ruc: '034-001-0000151375'},
    {key: '1755348883001', value: 'CAMPUS', ruc: '012-0001-000007906'},
    {
      key: '1705571204001',
      value: 'CREACIONES IMPERIO',
      ruc: '001-001-000000670',
    },
    {key: '1720778768001', value: 'ES PRINT PLOTTER', ruc: '004-010-000003494'},
    {key: '1793201381001', value: 'ESPIRITU LIBRE', ruc: '001-001-000000670'},
    {key: '1704833654001', value: 'Joyería D`amants', ruc: '002-002-000000727'},
    {key: '1791309863001', value: 'Multicines', ruc: '001-235-000165997'},
    {key: '1792468140001', value: 'Natura', ruc: '003-002-0000059742'},
    {key: '0991408843001', value: 'ONLY NATURAL', ruc: '018-002-0000034634'},
    {
      key: '1792673313001',
      value: 'RollerBike Sports',
      ruc: '002-002-000008989',
    },
    {key: '1792388198001', value: 'SHIKUELITOS', ruc: '003-002-000008629'},
    {key: '1713190138001', value: 'LOBOLUNAR', ruc: '001-044-000001016'},
    {
      key: '1717779639001',
      value: 'Clinica de Depilación/ Dermapill',
      ruc: '001-001-000000097',
    },
    {key: '1709976722001', value: 'PLATART', ruc: '017-010-000000312'},
  ];

  const doValidateInvoice = async () => {
    let value = parseFloat(lastname);
    let invoiceNumber = valor.slice(0, 3);
    let selectedValue = selected;
    if (!selectedValue) {
      alert('Debe seleccionar un establecimiento');
      return null;
    }
    const keyvalue = data.filter(item => selectedValue === item.value);
    if (invoiceNumber.length < 3) {
      alert('Debe ingresar el número de factura del establecimiento');
      return null;
    }

    const compareKeyValueNumer = keyvalue[0].ruc;
    const compareKeyValue = compareKeyValueNumer.slice(0, 3); // change validation from 8 chars to 3, the first numbers of an establishment
    if (compareKeyValue !== invoiceNumber) {
      alert('El número de factura no corresponde al establecimiento.');
      return null;
    }

    if (value <= 4.99) {
      alert('Debe ingresar un valor de compra mayor a $5');
      return null;
    }

    if (!date) {
      alert('Debe ingresar una fecha');
      return null;
    }

    let dataTicket = JSON.parse(ticketCode);
    let duration = parseInt(dataTicket.data.duration);
    if (duration > 180) {
      navigation.navigate('PaymentMethod', {
        testDiscount: true,
        customer: false,
      });
    } else {
      navigation.navigate('PaymentSuccess', {testDiscount: false, discountCode: null});
    }
  };

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const valueString = await AsyncStorage.getItem('ticketCode');
        //const value = JSON.parse(valueString);
        // console.info({valueString});
        console.info('//* useEffect trayendo codigo del ticket*/');
        setTicketCode(valueString);
        if (valueString === '') {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'QrDesign',
              },
            ],
          });
        }
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
  const {email, firstname, lastname, password, cedula, onChange} = useForm({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    cedula: '',
  });

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
        <Headline
          style={{
            fontSize: 16,
            fontFamily: 'Lato-Regular',
            marginTop: 0,
            marginBottom: 0,
            fontFamily: 'Lato-Bold',
            alignSelf: 'center',
          }}>
          Registra tu factura de compra
        </Headline>
        <Image
          source={require('../../imgs/leyendaPagoFactura.png')}
          style={{width: '100%', alignSelf: 'center', marginTop: 0}}
          resizeMode="contain"
        />
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 0,
            fontFamily: 'Lato-Bold',
          }}>
          Establecimiento CCI*
        </Text>
        <SelectList
          setSelected={val => setSelected(val)}
          data={data}
          save="value"
          placeholder="Elige un establecimiento"
          labelStyles={{color: '#000'}}
          inputStyles={{color: '#000'}}
          dropdownStyles={{color: '#000'}}
        />

        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 0,
            fontFamily: 'Lato-Bold',
          }}>
          Número de factura *
        </Text>
        <TextInput
          label={valor.length > 0 ? '' : '001-001-0000000000'}
          style={{
            width: '100%',
            marginTop: -10,
            backgroundColor: theme.colors.transparent,
          }}
          value={valor}
          onChangeText={aplicarFormato}
          keyboardType="numeric"
          error={error === 'AUTH017'}
        />
        {error === 'AUTH017' && (
          <HelperText type="error" visible={true}>
            {errorsTable[error]}
          </HelperText>
        )}
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 0,
            fontFamily: 'Lato-Bold',
          }}>
          Valor de compra*
        </Text>
        <TextInput
          keyboardType="numeric" // Permitir solo dígitos
          label={lastname.length > 0 ? '' : '$5.00'}
          onChangeText={text => onChange(text, 'lastname')}
          style={{
            width: '100%',
            marginTop: -10,
            backgroundColor: theme.colors.transparent,
          }}
          value={lastname}
          error={error === 'AUTH017'}
        />
        {error === 'AUTH017' && (
          <HelperText type="error" visible={true}>
            {errorsTable[error]}
          </HelperText>
        )}
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 0,
            fontFamily: 'Lato-Bold',
          }}>
          Fecha *
        </Text>
        <TextInput
          onChangeText={text => onChangeText(text)}
          readOnly={true}
          style={{
            width: '100%',
            marginTop: -10,
            backgroundColor: theme.colors.transparent,
          }}
          value={date.toLocaleDateString('en-US')}
          error={error === 'AUTH017'}
        />
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
          }}
          onPress={() => setOpen(true)}>
          Seleccionar fecha
        </Button>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        {error === 'AUTH017' && (
          <HelperText type="error" visible={true}>
            {errorsTable[error]}
          </HelperText>
        )}

        {/**
         *
         <Button
          buttonColor={theme.colors.primary}
          contentStyle={{paddingVertical: 10}}
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={() => navigation.navigate('InvoiceCamera')}
          style={{marginTop: 30, width: '100%', borderRadius: 20}}>
          Subir foto de factura
        </Button> 
         */}
        <Button
          buttonColor={theme.colors.secondary}
          labelStyle={{fontSize: 12}}
          contentStyle={{paddingVertical: 1}}
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={() => doValidateInvoice()}
          style={{ width: '100%',
          alignSelf: 'center',
          borderRadius: 80,
          marginTop: 5,
          marginHorizontal: '15%',}}>
          VALIDA TU FACTURA DE COMPRA
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
    marginVertical: 5,
  },
  imageButtonBack: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
});
