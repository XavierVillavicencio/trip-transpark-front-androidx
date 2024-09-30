import { useState } from 'react';
import { Attribute } from '../../interfaces/appInterfaces';

import { View, Text, Platform } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';

interface Props {
  item: Attribute;
  eventHandler: (id: number, value: any) => void;
  valuesTable?: any;
}

export function Checks_({ item, eventHandler, valuesTable }: Props) {
  const theme = useTheme();

  const [checked, setChecked] = useState<any>(
    valuesTable ? valuesTable[item.id] : item.value || null
  );

  const Item = ({ value, label }: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Checkbox.Android
          // label={label}
          status={checked === value ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(checked === value ? null : value);
            eventHandler(item.id, checked === value ? '' : value);
          }}
          color={theme.colors.primary}
        />
        <Text style={{ marginLeft: 0, color: theme.colors.text }}>{label}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        marginBottom: 10,
        alignItems: 'flex-start'
      }}
    >
      <Text style={{ color: theme.colors.text }}>{item.name}</Text>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexGrow: 1
        }}
      >
        {item.name === 'Medios Baños' && <Item value="0" label="0" />}
        <Item value="1" label="1" />
        <Item value="2" label="2" />
        <Item value="3" label="3" />
        <Item value="4" label="4" />
        <Item value="5" label="+5" />
      </View>
    </View>
  );
}
