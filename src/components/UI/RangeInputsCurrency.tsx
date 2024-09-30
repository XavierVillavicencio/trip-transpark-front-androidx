import { View } from 'react-native';
import { currencyFormat, leftTableAffix } from '../../helpers';

import CurrencyInput, { formatNumber } from 'react-native-currency-input';
import { TextInput, useTheme, Text } from 'react-native-paper';

interface Props {
  item?: any;
  valuesTable?: any;
  onChangeFn?: any;
  label?: string;
  min?: string;
  leftAffix?: string;
  rightAffix?: string;
  max?: string;
}

export function RangeInputsCurrency({
  item,
  valuesTable,
  onChangeFn,
  label,
  min,
  leftAffix = '',
  rightAffix = '',
  max
}: Props) {
  const theme = useTheme();

  if (item) {
    return (
      <View
        style={{
          width: '100%',
          marginBottom: 10
        }}
      >
        <Text style={{ marginBottom: 7 }}>{item.name}</Text>
        <View
          style={{
            width: '100%',
            marginBottom: 10,
            flexDirection: 'column'
            // alignItems: 'center'
            // flexWrap: 'wrap'
          }}
        >
          <CurrencyInput
            value={
              valuesTable[item.id] ? valuesTable[item.id].min?.toString() : ''
            }
            onChangeValue={(value) => onChangeFn(item.id, value, 'min')}
            prefix=""
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            style={{ flexGrow: 1, marginBottom: 7 }}
            renderTextInput={({ onChangeText, value, style }) => (
              <TextInput
                // {...props}
                label="Mínimo"
                value={value}
                onChangeText={onChangeText}
                keyboardType={item.dataType === 'N' ? 'number-pad' : 'default'}
                style={style}
                left={
                  leftTableAffix[item.name] && (
                    <TextInput.Affix
                      textStyle={{ marginEnd: 5 }}
                      text="USD $"
                    />
                  )
                }
              />
            )}
          />

          <CurrencyInput
            value={
              valuesTable[item.id] ? valuesTable[item.id].max?.toString() : ''
            }
            onChangeValue={(value) => onChangeFn(item.id, value, 'max')}
            prefix=""
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            style={{ flexGrow: 1 }}
            renderTextInput={({ onChangeText, value, style }) => (
              <TextInput
                // {...props}
                label="Máximo"
                value={value}
                onChangeText={onChangeText}
                keyboardType={item.dataType === 'N' ? 'number-pad' : 'default'}
                style={style}
                left={
                  leftTableAffix[item.name] && (
                    <TextInput.Affix
                      textStyle={{ marginEnd: 5 }}
                      text="USD $"
                    />
                  )
                }
              />
            )}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        width: '100%',
        marginBottom: 10
      }}
    >
      <Text style={{ marginBottom: 7, color: theme.colors.text }}>{label}</Text>
      <View
        style={{
          width: '100%',
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <TextInput
          label="Mínimo"
          value={min?.toString()}
          keyboardType="number-pad"
          onChangeText={(value) => {
            onChangeFn(value.replace(/[^0-9.]/g, ''), 'min');
          }}
          style={{ flexGrow: 1, marginRight: 10 }}
          left={
            leftAffix && (
              <TextInput.Affix textStyle={{ marginEnd: 5 }} text={leftAffix} />
            )
          }
          right={rightAffix && <TextInput.Affix text={rightAffix} />}
        />
        <TextInput
          label="Máximo"
          value={max?.toString()}
          keyboardType="number-pad"
          onChangeText={(value) => {
            onChangeFn(value.replace(/[^0-9.]/g, ''), 'max');
          }}
          style={{ flexGrow: 1, marginRight: 10 }}
          left={
            leftAffix && (
              <TextInput.Affix textStyle={{ marginEnd: 5 }} text={leftAffix} />
            )
          }
          right={rightAffix && <TextInput.Affix text={rightAffix} />}
        />
      </View>
    </View>
  );
}
