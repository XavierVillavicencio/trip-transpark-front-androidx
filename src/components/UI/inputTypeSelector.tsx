import {
  Attribute,
  AttributeCategory,
  TOportunityType
} from '../../interfaces/appInterfaces';
import { leftTableAffix, rightTableAffix } from '../../helpers/tableAffix';

import { View } from 'react-native';
import { Button, Colors, Headline, TextInput } from 'react-native-paper';
import { Checkbox_ } from './Checkbox_';
import { Checks_ } from './Checks_';
import { Dropdown_ } from './Dropdown_';
import { RangeInputs } from './RangeInputs';
import { RangeInputsCurrency } from './RangeInputsCurrency';
import CurrencyInput from 'react-native-currency-input';
import { currencyFormat, formatHelper } from '../../helpers';

interface Props {
  title: string;
  categoryFilter: AttributeCategory;
  array: Attribute[];
  onChangeFn: any;
  valuesTable?: any;
  isFiltersScreen?: boolean;
  showDialog?: () => any;
  hasCoords?: boolean;
  oportunityType?: TOportunityType;
}

export const inputTypeSelector = ({
  title,
  categoryFilter,
  array,
  onChangeFn,
  valuesTable,
  isFiltersScreen,
  showDialog,
  oportunityType = 'S',
  hasCoords
}: Props) => {
  const filtered = array.filter((item) => item.category === categoryFilter);

  if (filtered.length === 0) return;

  return (
    <View>
      <Headline style={{ marginBottom: 10, fontWeight: 'bold' }}>
        {title}
      </Headline>

      <View>
        {filtered
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            if (isFiltersScreen && item.name === 'Ubicación') return;
            if (isFiltersScreen && item.name === 'Dirección') return;
            if (isFiltersScreen && item.name === 'Valor Alicuota') return;
            if (item.name === 'Tipo') return;

            if (
              item.name === 'Provincia' ||
              item.name === 'Ciudad' ||
              item.name === 'Sector'
            ) {
              return (
                <Dropdown_
                  key={item.id}
                  label={item.name}
                  defaultValue={
                    valuesTable ? valuesTable[item.id] : item.value || ''
                  }
                  onSelect={(value) => onChangeFn(item.id, value.name)}
                />
              );
            }

            if (item.name === 'Ubicación') {
              return (
                <Button
                  key={item.id}
                  mode="contained"
                  onPress={showDialog}
                  style={{
                    marginBottom: 10,
                    justifyContent: 'center'
                  }}
                  color={hasCoords ? Colors.green600 : '#444444'}
                  labelStyle={{ paddingVertical: 14.6 }}
                >
                  {hasCoords
                    ? 'Ubicación señalada'
                    : `Señalar ubicación ${item.isRequired === 1 ? '*' : ''}`}
                </Button>
              );
            }

            if (isFiltersScreen && item.name === 'Metraje Construido') {
              return (
                <RangeInputsCurrency
                  key={item.id}
                  item={item}
                  valuesTable={valuesTable}
                  onChangeFn={onChangeFn}
                  rightAffix="mts."
                />
              );
            }

            if (isFiltersScreen && item.name === 'Metraje Total') {
              return (
                <RangeInputsCurrency
                  key={item.id}
                  item={item}
                  valuesTable={valuesTable}
                  onChangeFn={onChangeFn}
                  rightAffix="mts."
                />
              );
            }

            if (
              item.name === 'Precio ' ||
              item.name === 'Metraje Total' ||
              item.name === 'Metraje Construido' ||
              item.name === 'Valor Alicuota'
            ) {
              if (isFiltersScreen) {
                return (
                  <RangeInputsCurrency
                    key={item.id}
                    item={item}
                    valuesTable={valuesTable}
                    onChangeFn={onChangeFn}
                  />
                );
              }

              return (
                <CurrencyInput
                  key={item.id}
                  style={{ marginBottom: 10 }}
                  defaultValue={item.value?.toString()}
                  // @ts-ignore
                  value={item.value ? item.value : ''}
                  keyboardType="number-pad"
                  onChangeValue={(value) => {
                    onChangeFn(item.id, value);
                  }}
                  renderTextInput={({
                    style,
                    defaultValue,
                    value,
                    keyboardType,
                    onChangeText
                  }) => (
                    <TextInput
                      key={item.id}
                      label={`${item.name}${item.isRequired ? ' *' : ''}`}
                      right={
                        rightTableAffix[item.name] && (
                          <TextInput.Affix text={rightTableAffix[item.name]} />
                        )
                      }
                      left={
                        leftTableAffix[item.name] && (
                          <TextInput.Affix
                            textStyle={{ marginEnd: 5 }}
                            text={leftTableAffix[item.name]}
                          />
                        )
                      }
                      style={style}
                      defaultValue={defaultValue}
                      value={value}
                      keyboardType={keyboardType}
                      onChangeText={onChangeText}
                    />
                  )}
                />
              );
            }

            if (
              item.name === 'Baños' ||
              item.name === 'Dormitorios' ||
              item.name === 'Medios Baños' ||
              item.name === 'Parqueaderos'
            ) {
              if (isFiltersScreen && item.name === 'Dormitorios') {
                return (
                  <RangeInputs
                    key={item.id}
                    item={item}
                    valuesTable={valuesTable}
                    onChangeFn={onChangeFn}
                  />
                );
              }

              return (
                <Checks_
                  key={item.id}
                  item={item}
                  eventHandler={onChangeFn}
                  valuesTable={valuesTable}
                />
              );
            }

            if (item.dataType === 'S' || item.dataType == 'N') {
              if (valuesTable) {
                return (
                  <TextInput
                    key={item.id}
                    label={item.name}
                    value={
                      valuesTable[item.id]
                        ? valuesTable[item.id]?.toString()
                        : ''
                    }
                    style={{ marginBottom: 10 }}
                    defaultValue={item.value?.toString() || ''}
                    keyboardType={
                      item.dataType === 'N' ? 'number-pad' : 'default'
                    }
                    onChangeText={(value) => {
                      onChangeFn(
                        item.id,
                        item.dataType === 'N'
                          ? value.replace(/[^0-9.]/g, '')
                          : value
                      );
                    }}
                    right={
                      rightTableAffix[item.name] && (
                        <TextInput.Affix text={rightTableAffix[item.name]} />
                      )
                    }
                    left={
                      leftTableAffix[item.name] && (
                        <TextInput.Affix
                          textStyle={{ marginEnd: 5 }}
                          text={leftTableAffix[item.name]}
                        />
                      )
                    }
                  />
                );
              }

              return (
                <TextInput
                  key={item.id}
                  label={item.name}
                  style={{ marginBottom: 10 }}
                  defaultValue={item.value?.toString() || ''}
                  value={item.value?.toString() || ''}
                  keyboardType={
                    item.dataType === 'N' ? 'number-pad' : 'default'
                  }
                  onChangeText={(value) => {
                    onChangeFn(
                      item.id,
                      item.dataType === 'N'
                        ? value.replace(/[^0-9.]/g, '')
                        : value
                    );
                  }}
                  right={
                    rightTableAffix[item.name] && (
                      <TextInput.Affix text={rightTableAffix[item.name]} />
                    )
                  }
                  left={
                    leftTableAffix[item.name] && (
                      <TextInput.Affix
                        textStyle={{ marginEnd: 5 }}
                        text={leftTableAffix[item.name]}
                      />
                    )
                  }
                />
              );
            }

            if (item.dataType === 'C') {
              if (
                oportunityType === 'S' &&
                item.name === 'Arriendo incluye alícuota '
              )
                return;

              if (valuesTable) {
                return (
                  <Checkbox_
                    key={item.id}
                    item={item}
                    eventHandler={onChangeFn}
                    defaultValue={valuesTable[item.id]}
                  />
                );
              }

              return (
                <Checkbox_
                  key={item.id}
                  item={item}
                  eventHandler={onChangeFn}
                />
              );
            }

            if (item.dataType === 'D') {
              return (
                <Dropdown_
                  key={item.id}
                  label={item.name}
                  data={item.content}
                  defaultValue={item.value || ''}
                  onSelect={(value) => onChangeFn(item.id, value)}
                />
              );
            }
          })}
      </View>
    </View>
  );
};
