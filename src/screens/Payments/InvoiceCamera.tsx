/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState, useRef} from 'react';
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
import {Camera, CameraType } from 'react-native-camera-kit';
import {
  ActivityIndicator,
  useTheme,
  Button,
  Text,
} from 'react-native-paper';
import {ErrorWrapper} from '../../components';
import React = require('react');
import { useContext } from 'react';
import { PropertiesContext, AuthContext } from '../../context';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function InvoiceCamera({navigation}: Props) {
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
    returnBtnNoBackground: {
      marginHorizontal: '15%',
      width: '70%',
      borderRadius: 40,
      marginTop: 10,
    },
    returnBtn: {
      marginHorizontal: '15%',
      width: '70%',
      borderRadius: 40,
      color: '#ffffff',
      backgroundColor: '#0093D0',
      marginTop: 20,
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

  const takePhoto = async () => {
    if (this.camera) {
      const cam = this.camera;
      const options = { quality: 0.5, base64: true };
      const  data  = await cam.capture(options);
      console.log({data});
      setResult(data.uri);
      setScanned(true);
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
            <Text style={styles.textTitle}>!Envíanos una foto de tu factura de consumo!</Text>
            <View style={{width: '80%', height: '60%'}}>
              {!scanned ? (
              <>
                <Camera
                  ratioOverlay={'4:3'}
                  cameraOptions={{
                    ratioOverlayColor: '#00000077',
                  }}
                  ref={(ref) => (this.camera = ref)}
                  style={{flex: 1,width: '100%'}}
                  cameraType={CameraType.Back} // front/back(default)
                  flashMode="auto"
                  scanBarcode={false}
                />
                <Button
                  contentStyle={{paddingVertical: 5}}
                  mode="contained"
                  style={{marginTop: 25}}
                  onPress={() => takePhoto()}
                  style={styles.returnBtn}>
                  Tomar Foto de Factura
                </Button>
              </>
            ):(
              <>
                <Image style={{width: '100%', alignSelf: 'center', height: '90%'}} resizeMode="contain" source={{uri: result}} />
                <Button
                  contentStyle={{paddingVertical: 1}}
                  mode="contained"
                  style={{marginTop: 20}}
                  onPress={() => {
                    setScanned(false);
                  }}
                  style={styles.returnBtnNoBackground}
                  buttonColor={theme.colors.placeholder}>
                  Tomar foto nuevamente
                </Button>
                <Button
                  contentStyle={{paddingVertical: 1}}
                  mode="contained"
                  style={{marginTop: 5}}
                  onPress={() => {
                    navigation.push('InvoicePayment');
                  }}
                  buttonColor={theme.colors.secondary}
                  style={styles.returnBtnNoBackground}>
                  Continuar
                </Button>
              </>
              ) }
              {/** InvoicePayment */}
            </View>
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
