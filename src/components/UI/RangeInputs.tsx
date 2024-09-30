import { View } from 'react-native';
import { TextInput, useTheme, Text } from 'react-native-paper';
import { leftTableAffix } from '../../helpers';

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

export function RangeInputs({
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
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <TextInput
            label="Mínimo"
            value={
              valuesTable[item.id] ? valuesTable[item.id].min?.toString() : ''
            }
            defaultValue={item.value?.toString() || ''}
            keyboardType={item.dataType === 'N' ? 'number-pad' : 'default'}
            onChangeText={(value) => {
              onChangeFn(item.id, value.replace(/[^0-9.]/g, ''), 'min');
            }}
            style={{ flexGrow: 1, marginRight: 10 }}
            left={
              leftTableAffix[item.name] && (
                <TextInput.Affix textStyle={{ marginEnd: 5 }} text="USD $" />
              )
            }
          />
          <TextInput
            label="Máximo"
            value={
              valuesTable[item.id] ? valuesTable[item.id].max?.toString() : ''
            }
            defaultValue={item.value?.toString() || ''}
            keyboardType={item.dataType === 'N' ? 'number-pad' : 'default'}
            onChangeText={(value) => {
              onChangeFn(item.id, value.replace(/[^0-9.]/g, ''), 'max');
            }}
            style={{ flexGrow: 1 }}
            left={
              leftTableAffix[item.name] && (
                <TextInput.Affix textStyle={{ marginEnd: 5 }} text="USD $" />
              )
            }
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
