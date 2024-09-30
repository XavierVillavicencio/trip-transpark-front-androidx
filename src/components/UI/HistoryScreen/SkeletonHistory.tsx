import { View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

export function SkeletonHistory() {
  const theme = useTheme();

  return (
    <Card style={{ marginBottom: 15 }}>
      <Card.Content>
        <View
          style={{
            width: '40%',
            height: 15,
            marginBottom: 5,
            backgroundColor: theme.colors.background,
            borderRadius: theme.roundness
          }}
        />
        <View
          style={{
            width: '80%',
            height: 24,
            marginBottom: 10,
            backgroundColor: theme.colors.background,
            borderRadius: theme.roundness
          }}
        />
        <View
          style={{
            width: '100%',
            height: 40,
            marginBottom: 10,
            backgroundColor: theme.colors.background,
            borderRadius: theme.roundness
          }}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              width: '40%',
              height: 30,
              marginRight: 10,
              backgroundColor: theme.colors.background,
              borderRadius: theme.roundness
            }}
          />
          <View
            style={{
              flex: 1,
              height: 30,
              marginRight: 10,
              backgroundColor: theme.colors.background,
              borderRadius: theme.roundness
            }}
          />
          <View
            style={{
              width: '10%',
              height: 30,
              backgroundColor: theme.colors.background,
              borderRadius: theme.roundness
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );
}
