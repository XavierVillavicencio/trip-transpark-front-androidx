import { useMemo } from 'react';
import { PropertyGetData } from '../../../interfaces/appInterfaces';

import { View } from 'react-native';

export function Map({ propertyData }: { propertyData: PropertyGetData }) {
  const coords = useMemo(() => {
    return propertyData.attributes.find((item) => item.id === 5);
  }, [propertyData]);

  if (!coords) {
    return <View></View>;
  }

  const lat = Number(coords.value.split(' ')[0]);
  const lng = Number(coords.value.split(' ')[1]);

  return (
    <View style={{ marginVertical: 10 }}>
    </View>
  );
}
