import { View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

//prettier-ignore
export function SkeletonHome() {
  const theme = useTheme()

  return (
    <Card style={{ marginBottom: 20 }}>
      <View style={{width: '100%', height: 194, marginBottom: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
    <Card.Content>
      <View style={{width: '100%', height: 27, marginBottom: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
      <View style={{width: '100%', height: 60, marginBottom: 20, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />

      <View style={{width: '40%', height: 16, marginBottom: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
      <View style={{width: '40%', height: 16, marginBottom: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
      <View style={{width: '40%', height: 16, marginBottom: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
    </Card.Content>
    <Card.Actions>
      <View style={{width: 34, height: 34, marginRight: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
      <View style={{width: 34, height: 34, marginRight: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
      <View style={{flex: 1, height: 34, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
    </Card.Actions>
  </Card>
  );
}
