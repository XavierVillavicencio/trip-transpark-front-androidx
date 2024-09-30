import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context';
import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';


import { View, ScrollView } from 'react-native';

import {
  Avatar,
  Card,
  Colors,
  Headline,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import { privateApi, privateUrl } from '../../api/propertiesApi';
import { Wrapper } from '../../components';
import { IInterestedItem } from '../../interfaces/appInterfaces';
interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function MenuScreen({ navigation }: Props) {
  const {user, logout} = useContext(AuthContext);
  // const { initialLoad, loadFavorites, loadDrafts, loadInactives } = useContext(PropertiesContext);
  const theme = useTheme();

  return (
    <Wrapper width="100%">
      <Headline
        style={{
          fontWeight: 'bold',
          marginBottom: 20,
          textTransform: 'uppercase',
          textAlign: 'center',
          width: '100%',
          backgroundColor: theme.colors.background,
        }}
      >
        Inicio
      </Headline>

      <View
        style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}
      >
        <Card.Title
          title="Usuario"
          subtitle={`${user?.firstname} ${user?.lastname}`}
        />
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 1,
          borderRadius: 100,
          marginTop: 5,
          marginBottom: 15,
        }}
      />

      <ScrollView style={{ width: '100%' }}>
        <List.Section style={{ flexGrow: 1 }}>
        <List.Item
            title="Manual Entry (Testing Propouses)"
            left={() => <List.Icon icon="alert-circle" />}
            onPress={() => {
              navigation.navigate('ManualInput');
            }}
          />
        <List.Item 
            title="Read NFC ticket"
            left={() => <List.Icon icon="hardware-chip" />}
            onPress={() => {
              navigation.navigate('NFC');
            }}
          />
        <List.Item
            title="Read QR Ticket"
            left={() => <List.Icon icon="barcode" />}
            onPress={() => {
              navigation.navigate('QrBarcode');
            }}
          />
          <List.Item
            title="Editar usuario"
            left={() => <List.Icon icon="person-outline" />}
            onPress={() => {
              navigation.navigate('Edit');
            }}
          />
          <List.Item
            title="Cerrar sesión"
            left={() => (
              <List.Icon color={Colors.red400} icon="log-out-outline" />
            )}
            style={{ marginTop: 'auto' }}
            titleStyle={{ color: Colors.red400 }}
            onPress={logout}
          />
        </List.Section>
      </ScrollView>
    </Wrapper>
  );
}
