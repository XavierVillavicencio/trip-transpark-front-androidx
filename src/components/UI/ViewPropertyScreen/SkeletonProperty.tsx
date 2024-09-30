import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

//prettier-ignore
export function SkeletonProperty() {
  const theme = useTheme()

  return (
    <View style={{height: '100%', width: '100%'}} >
      <View style={{width: '100%', height: 300, marginBottom: 10, backgroundColor: theme.colors.background}} />
      <View style={{width: 80, height: 12, marginBottom: 10, backgroundColor: theme.colors.background, alignSelf: 'center'}} />

      <View
        style={{
          width: '80%',
          alignSelf: 'center',
        }}
      >
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}} >
          <View style={{width: 87, height: 32, backgroundColor: theme.colors.background, borderRadius: 100}} />
          <View style={{width: 87, height: 32, backgroundColor: theme.colors.background, borderRadius: 100}} />
        </View>

        <View style={{width: '60%', height: 27, marginBottom: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
        <View style={{width: '80%', height: 20,  marginBottom: 10,backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
        <View style={{width: '60%', height: 21, marginBottom: 20, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
        <View style={{width: '80%', height: 25, marginBottom: 30, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />

        <View style={{width: '60%', height: 27, marginBottom: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
        <View style={{width: '80%', height: 20, marginBottom: 20, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
        
        <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}} >
          <View style={{width: 70, height: 24, marginBottom: 10, marginRight: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
          <View style={{width: 80, height: 24, marginBottom: 10, marginRight: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
          <View style={{width: 75, height: 24, marginBottom: 10, marginRight: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
          <View style={{width: 72, height: 24, marginBottom: 10, marginRight: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
          <View style={{width: 85, height: 24, marginBottom: 10, marginRight: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
          <View style={{width: 70, height: 24, marginBottom: 10, marginRight: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
          <View style={{width: 80, height: 24, marginBottom: 10, marginRight: 10, backgroundColor: theme.colors.background, borderRadius: theme.roundness}} />
        </View>
      </View>
    </View>
  )
}
