import {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PropertyGetData} from '../interfaces/appInterfaces';
import {AuthContext} from '../context';
import {Image, Linking} from 'react-native';
import {
  IconButton,
  useTheme,
  Button,
  Menu,
  Divider,
  PaperProvider,
  Text,
} from 'react-native-paper';
import logosBlancosrequire from '../imgs/logo-white.png';
import {
  CameraPermissions,
  EditUserScreen,
  TransactionUserScreen,
  BenefitsScreen,
  FiltersScreen,
  FormScreen,
  HistoryScreen,
  InterestedScreen,
  MenuScreen,
  QrDesign,
  QrBarcode,
  NFC,
  ManualInput,
  PaymentFailed,
  PaymentSuccess,
  ViewPropertyScreen,
  InvoiceCamera,
  TabsHome,
  TabsHomeTicket,
  PaymentMethod,
  PaymentTotals,
  InvoiceDetails,
  HomeB,
  InvoicePayment,
  Paypal,
  Paymentez,
  TermsConditions,
  Privacy,
  ErrorConnection,
  ErrorPermissons,
  ErrorTicket,
  PaidTicket,
  OvertimeTicket,
  DuplicateTicket,
  ExitedTicket,
  GracePeriod,
  TicketRead,
  QRCodeGenerator,
} from '../screens';
import React = require('react');

export type PropertiesStackParams = {
  CameraPermissions: undefined;
  TabsHome: undefined;
  TabsHomeTicket: undefined;
  MenuScreen: undefined;
  HomeB: undefined;
  List: undefined;
  Form: {new?: boolean; data?: PropertyGetData};
  Pictures: {
    id: string;
    name?: string;
    images?: {id: number; uri: string; filename: string}[];
    new?: boolean;
    status?: string;
  };
  Camera: {setImages: any};
  View: {id: string; name?: string};

  Modal: undefined;
  Filters: undefined;
  History: undefined;
  Interested: undefined;
  Edit: undefined;
};

const Stack = createStackNavigator<PropertiesStackParams>();

export default function PropertiesNavigator() {
  const {logout} = useContext(AuthContext);
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          height: 80,
          elevation: 7,
          backgroundColor: '#0055A5',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 4,
        },
        headerTintColor: theme.colors.text,
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
        headerRightContainerStyle: {
          paddingRight: 10,
        },
        headerLeft: () => (
          <Image
            source={logosBlancosrequire}
            style={{width: 170, height: 65}}
            resizeMode="contain"
          />
        ),
        headerRight: () => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                mode="outline"
                icon="menu"
                iconColor="#ffffff"
                rippleColor="#ffffff"
                size={40}
                onPress={() => {
                  if (!visible) {
                    openMenu();
                  }
                }}
              />
            }>
            <Menu.Item
              onPress={() => {
                navigation.navigate('QrDesign');
                closeMenu();
              }}
              title="Inicio"
            />
            <Menu.Item
              onPress={() => {
                navigation.navigate('TermsConditions');
                closeMenu();
              }}
              title="Términos y condiciones"
            />
            <Menu.Item
              onPress={() => {
                navigation.navigate('Privacy');
                closeMenu();
              }}
              title="Política de Protección"
            />
            <Menu.Item
              onPress={() => {
                navigation.navigate('Edit');
                closeMenu();
              }}
              title="Perfil"
            />
            <Menu.Item
              onPress={() => {
                Linking.openURL('https://transpark.com.ec/faq-tp/');
                closeMenu();
              }}
              title="FAQ"
            />
            <Menu.Item
              onPress={() => {
                Linking.openURL('https://transpark.com.ec/contactos');
                closeMenu();
              }}
              title="Contactos"
            />
            <Menu.Item onPress={logout} title="Cerrar Sesión" />
          </Menu>
        ),
      })}
      initialRouteName="QrDesign">
      <Stack.Group>
        <Stack.Screen
          name="TabsHomeTicket"
          component={TabsHomeTicket}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="QrBarcode"
          component={QrBarcode}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="HomeB"
          component={HomeB}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="NFC"
          component={QrDesign}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="ManualInput"
          component={ManualInput}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="CameraPermissions"
          component={CameraPermissions}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={() => ({title: ''})}
        />
        <Stack.Screen
          name="View"
          component={ViewPropertyScreen}
          options={{
            title: '',
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="QRCodeGenerator"
          component={QRCodeGenerator}
          options={navigator} />
        <Stack.Screen name="TicketRead" component={TicketRead} />
        <Stack.Screen name="TabsHome" component={TabsHome} />
        <Stack.Screen name="Filters" component={FiltersScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Interested" component={InterestedScreen} />
        <Stack.Screen
          name="Benefits"
          component={BenefitsScreen}
          options={{
            title: '',
          }} />
        <Stack.Screen
          name="Transactions"
          component={TransactionUserScreen}
          options={{
            title: '',
          }} />
        <Stack.Screen
          name="Edit"
          component={EditUserScreen}
          options={{
            title: '',
          }} />
        <Stack.Screen
          name="QrDesign"
          component={QrDesign}
          options={navigator}
        />
        <Stack.Screen
          name="InvoiceDetails"
          component={InvoiceDetails}
          options={navigator}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={navigator}
        />
        <Stack.Screen
          name="PaymentTotals"
          component={PaymentTotals}
          options={navigator}
        />
        <Stack.Screen
          name="PaymentFailed"
          component={PaymentFailed}
          options={navigator}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccess}
          options={navigator}
        />
        <Stack.Screen
          name="InvoicePayment"
          component={InvoicePayment}
          options={navigator}
        />
        <Stack.Screen
          name="InvoiceCamera"
          component={InvoiceCamera}
          options={navigator}
        />
        <Stack.Screen
          name="Paymentez"
          component={Paymentez}
          options={navigator}
        />
        <Stack.Screen name="Paypal" component={Paypal} options={navigator} />
        <Stack.Screen
          name="ErrorPermissons"
          component={ErrorPermissons}
          options={navigator}
        />
        <Stack.Screen
          name="ErrorTicket"
          component={ErrorTicket}
          options={navigator}
        />
        <Stack.Screen
          name="PaidTicket"
          component={PaidTicket}
          options={navigator}
        />
        <Stack.Screen
          name="OvertimeTicket"
          component={OvertimeTicket}
          options={navigator}
        />
        <Stack.Screen
          name="DuplicateTicket"
          component={DuplicateTicket}
          options={navigator}
        />
        <Stack.Screen
          name="ExitedTicket"
          component={ExitedTicket}
          options={navigator}
        />
        <Stack.Screen
          name="ErrorConnection"
          component={ErrorConnection}
          options={navigator}
        />
        <Stack.Screen
          name="GracePeriod"
          component={GracePeriod}
          options={navigator}
        />
        <Stack.Screen name="TermsConditions" component={TermsConditions} />
        <Stack.Screen name="Privacy" component={Privacy} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/*
<Stack.Screen
          name="QrDesign"
          component={QrDesign}
          options={navigator}
        />
* */
