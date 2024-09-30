import { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';
import { StyleSheet, SafeAreaView } from 'react-native';
// import NfcManager, { NfcEvents, NfcTech } from 'react-native-nfc-manager';


import {
  ActivityIndicator,
  Colors,
  Divider,
  useTheme,
  Button,
  Text
} from 'react-native-paper';
import { privateApi, privateUrl } from '../../api/propertiesApi';
import { Wrapper } from '../../components';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}



export function NFC({ navigation }: Props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState('');
  const [inAction, setInAction] = useState(false);
  const [hasNfc, setHasNFC ] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    (() => {
      const checkIsSupported = async () => {
        NfcManager.start()
          .then(result => {
              console.log('start OK', result);
              setHasNFC(true)
          })
          .catch(error => {
              console.warn('device does not support nfc!');
              setHasNFC(false)
          })
      .then(() => {
        console.log('Mifare IsoDep is supported')
      })
      .catch(err => console.warn(err))
      }
  
      checkIsSupported() 
      
    })();
  }, []);

  async function readIsoDep() {
    try {
      // register for the NFC tag with IsoDep in it
      await NfcManager.requestTechnology(NfcTech.IsoDep);
      // the resolved tag object will contain `IsoDepMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
      setInAction(true);
      setResult(<ActivityIndicator animating={true} size={'large'} color={theme.colors.danger} />)
      sendThirdParty(tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  const sendThirdParty = async (transactionNo) => {
    try {
      const { data } = await privateApi.get(`/thirdparty/query/1/${transactionNo}`);
      console.info({ data });
      setResult(JSON.stringify(data));
    } catch (error: any) {
      setResult('There is an error sending the data; please check the console.');
      console.log(error.response.data);
    }
    setInAction(false);
  }

  return (
    <Wrapper>
      <Text>Aqui ve</Text>
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
    marginBottom: 40,
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