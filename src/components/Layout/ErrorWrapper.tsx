import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image } from 'react-native';
import { IconButton, useTheme,Text } from 'react-native-paper';
import { useContext } from 'react';
import { PropertiesContext } from '../../context';

interface Props {
  navigation: any;
  children: any;
}

export function ErrorWrapper({ navigation, children }: Props) {
  const theme = useTheme();

  const { historyItemEditTitle, cancelEditHistoryItem } =
    useContext(PropertiesContext);

  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.danger}}>
        <View style={{flex: 1, alignContent: 'center', alignSelf: 'center', justifyContent: 'center', width: '75%'}}>
        <Text style={{fontSize: 30, fontFamily: 'Lato-Black', color: theme.colors.white, marginBottom: 50}}>TENEMOS UN PROBLEMA</Text>
        {children}
        <Image
        source={require('../../imgs/ILLUSTRATION.png')}
        style={{ width: 550, height: 400, marginTop: 50, alignSelf: 'center' }}
        resizeMode="contain"
      />
        </View>
    </View>
  );
}
