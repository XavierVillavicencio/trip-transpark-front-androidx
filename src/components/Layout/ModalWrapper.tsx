import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { useContext } from 'react';
import { PropertiesContext } from '../../context';

interface Props {
  navigation: any;
  children: any;
}

export function ModalWrapper({ navigation, children }: Props) {
  const theme = useTheme();

  const { historyItemEditTitle, cancelEditHistoryItem } =
    useContext(PropertiesContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.background
      }}
    >
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingBottom: 20
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 30
          }}
        >
          <Image
            source={require('../../imgs/logo.png')}
            style={{ width: 150, height: 50 }}
            resizeMode="contain"
          />

          <IconButton
            icon="menu-outline"
            color={theme.colors.text}
            size={30}
            onPress={() => {
              if (historyItemEditTitle) {
                cancelEditHistoryItem();
                navigation.replace('History');
                return;
              }

              navigation.goBack();
            }}
          />
        </View>

        {children}
      </View>
    </SafeAreaView>
  );
}
