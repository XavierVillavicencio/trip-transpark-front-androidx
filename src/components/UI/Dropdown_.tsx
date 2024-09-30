import { View, Text } from 'react-native';

import { HelperText, useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import { useContext } from 'react';
import { PropertiesContext } from '../../context';

interface Props {
  label: string;
  data?: any;
  defaultValue?: any;
  onSelect?: (value: any, index: any) => void;
  error?: string;
}

export function Dropdown_({
  label,
  data = [],
  defaultValue,
  onSelect = (value, index) => console.log(value, index),
  error
}: Props) {
  const theme = useTheme();

  const { locations, getCiudad, getSector } = useContext(PropertiesContext);

  return (
    <View
      style={{
        width: '100%',
        marginBottom: 10
      }}
    >
      <Text
        style={{
          marginBottom: 3,
          fontSize: 16,
          color: !!error ? theme.colors.danger : theme.colors.text
        }}
      >
        {label}
      </Text>
      <SelectDropdown
        disabled={
          label === 'Provincia'
            ? locations.provincia.length === 0
            : label === 'Ciudad'
            ? locations.ciudad.length === 0
            : label === 'Sector'
            ? locations.sector.length === 0
            : data.length === 0
        }
        buttonStyle={{
          width: '100%',
          height: 64,
          borderRadius: 5,
          backgroundColor: theme.colors.background,
          borderBottomWidth: !!error ? 1 : 0,
          borderBottomColor: theme.colors.danger
        }}
        dropdownIconPosition="right"
        renderDropdownIcon={() => (
          <Icon color={theme.colors.text} name="caret-down-outline" />
        )}
        selectedRowTextStyle={{
          color: theme.colors.primary
        }}
        dropdownOverlayColor="#585858a4"
        data={
          label === 'Provincia'
            ? locations.provincia
            : label === 'Ciudad'
            ? locations.ciudad
            : label === 'Sector'
            ? locations.sector
            : data
        }
        defaultButtonText={defaultValue || 'Escoge una opción'}
        onSelect={(value, index) => {
          onSelect(value, index);
          if (label === 'Provincia') getCiudad(value.id);
          if (label === 'Ciudad') getSector(value.id);
        }}
        onChangeSearchInputText={() => {}}
        buttonTextStyle={{
          color: theme.colors.text
        }}
        rowStyle={{
          backgroundColor: theme.colors.inputBg
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.name ?? selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name ?? item;
        }}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
}
