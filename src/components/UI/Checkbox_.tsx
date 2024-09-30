import { useState } from 'react';
import { Attribute } from '../../interfaces/appInterfaces';

import { View, Text } from 'react-native';
import {
  Checkbox,
  Divider,
  TouchableRipple,
  useTheme
} from 'react-native-paper';

interface Props {
  item: Attribute;
  eventHandler: (id: number, value: any) => void;
  defaultValue?: string;
}

export function Checkbox_({ item, eventHandler, defaultValue }: Props) {
  const theme = useTheme();

  const [status, setStatus] = useState(
    item.value === '1' || defaultValue === '1' ? true : false
  );

  return (
    <View
      style={{
        width: '100%'
      }}
    >
      <TouchableRipple
        rippleColor="rgba(255, 255, 255, .32)"
        onPress={() => {
          eventHandler(item.id, status ? '0' : '1');
          setStatus(!status);
        }}
        style={{ borderRadius: theme.roundness }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Text style={{ color: theme.colors.text }}>{item.name}</Text>
          <Checkbox.Android
            color={theme.colors.primary}
            status={status ? 'checked' : 'unchecked'}
            // onPress={() => {
            //   eventHandler(item.id, status ? '0' : '1');
            //   setStatus(!status);
            // }}
          />
        </View>
      </TouchableRipple>
      <Divider style={{ marginVertical: 10 }} />
    </View>
  );
}
