import { useContext } from 'react';
import { AuthContext } from '../../context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';
import { Text } from 'react-native-paper';
export function Wrapper({ children, width = '80%' }: any) {
  const { status } = useContext(AuthContext);

  if (status === 'authenticated') {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          paddingVertical: 10
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            width
          }}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width
          }}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
