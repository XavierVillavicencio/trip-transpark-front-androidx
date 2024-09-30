import {useContext, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParams} from '../../navigation';
import {AuthContext} from '../../context';
import {ActivityIndicator} from 'react-native-paper';
import React = require('react');
import NetInfo from '@react-native-community/netinfo';

interface Props extends StackScreenProps<AuthStackParams, any> {}
export function Home({navigation}: Props) {
  const {status} = useContext(AuthContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
      alignContent: 'center',
    },
  });
  const {width} = useWindowDimensions();
  useEffect(() => {
    // Subscribe
    const IsConnected = NetInfo.addEventListener(state => {
      if (!(state.isConnected && state.isInternetReachable)) {
        navigation.navigate('ErrorConnection');
      }
    });
    setTimeout(() => {
      console.info('/**  isconnected  **/');
      if (status === 'checking') {
        return null;
      }
      if (status === 'not-authenticated') {
        navigation.navigate('Login');
      }
      console.info('/**  isNotConnected  **/');
    }, 5000);
  }, [navigation, status]);

  return (
    /*<!--    
   <ImageBackground
     source={require('../../imgs/')}
     resizeMode="cover"
     style={styles.image}>
     </ImageBackground>
   -->*/
    <View style={styles.container}>
      <ActivityIndicator
        color="#ffffff"
        style={{marginBottom: '45%', transform: [{scaleX: 2}, {scaleY: 2}]}}
      />
    </View>
  );
}
