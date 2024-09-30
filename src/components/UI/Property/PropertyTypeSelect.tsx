import { useState, useContext, useEffect } from 'react';

import { View } from 'react-native';
import { Headline, List, useTheme } from 'react-native-paper';
import { PropertiesContext } from '../../../context';
import { propertyTypeTable } from '../../../helpers';

interface Props {
  filterAttributes?: (type: any) => void;
  type: any;
}

export function PropertyTypeSelect({ filterAttributes, type }: Props) {
  const theme = useTheme();

  const [propertyType, setPropertyType] = useState<any>('A');
  const { historyItemEditTitle } = useContext(PropertiesContext);

  useEffect(() => {
    setPropertyType(type);
  }, [type]);

  return (
    <View style={{ width: '100%' }}>
      <Headline style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Categoría
      </Headline>

      <List.Section style={{ marginBottom: 10 }}>
        <List.Item
          disabled={!!historyItemEditTitle}
          title={propertyTypeTable.A}
          left={() => (
            <List.Icon
              color={
                propertyType === 'A' ? theme.colors.primary : theme.colors.text
              }
              icon="home-outline"
            />
          )}
          onPress={() => {
            setPropertyType('A');
            filterAttributes?.('A');
          }}
          style={{
            backgroundColor:
              propertyType === 'A'
                ? theme.colors.background
                : theme.colors.screenBg,
            borderRadius: theme.roundness,
            marginBottom: 10
          }}
          titleStyle={{
            color:
              propertyType === 'A' ? theme.colors.primary : theme.colors.text
          }}
        />
        <List.Item
          disabled={!!historyItemEditTitle}
          title={propertyTypeTable.B}
          left={() => (
            <List.Icon
              color={
                propertyType === 'B' ? theme.colors.primary : theme.colors.text
              }
              icon="business-outline"
            />
          )}
          onPress={() => {
            setPropertyType('B');
            filterAttributes?.('B');
          }}
          style={{
            backgroundColor:
              propertyType === 'B'
                ? theme.colors.background
                : theme.colors.screenBg,
            borderRadius: theme.roundness,
            marginBottom: 10
          }}
          titleStyle={{
            color:
              propertyType === 'B' ? theme.colors.primary : theme.colors.text
          }}
        />
        <List.Item
          disabled={!!historyItemEditTitle}
          title={propertyTypeTable.C}
          left={() => (
            <List.Icon
              color={
                propertyType === 'C' ? theme.colors.primary : theme.colors.text
              }
              icon="leaf-outline"
            />
          )}
          onPress={() => {
            setPropertyType('C');
            filterAttributes?.('C');
          }}
          style={{
            backgroundColor:
              propertyType === 'C'
                ? theme.colors.background
                : theme.colors.screenBg,
            borderRadius: theme.roundness
          }}
          titleStyle={{
            color:
              propertyType === 'C' ? theme.colors.primary : theme.colors.text
          }}
        />
      </List.Section>
    </View>
  );
}
