import { useState, useMemo, useEffect } from 'react';
import { Attribute, PropertyTypes } from '../../../interfaces/appInterfaces';

import { ScrollView } from 'react-native';

import {
  Headline,
  Colors,
  TextInput,
  Text,
  RadioButton,
  Button,
  useTheme,
  Chip
} from 'react-native-paper';

import { PropertyTypeSelect } from './PropertyTypeSelect';

import { inputTypeSelector } from '../inputTypeSelector';
import { Dropdown_ } from '../Dropdown_';
interface Props {
  isNew: boolean;
  filterAttributes?: (type: PropertyTypes) => void;
  submitting: boolean;
  values: any;
  onChange: any;
  propertyAttributes: Attribute[];
  onChangeAttribute: (id: number, value: any) => void;
  handleSubmit: () => void;
  error: string;
  scrollRef: any;
  setError: any;
  typeAttribute: Attribute | undefined;
}

export default function Form({
  isNew,
  filterAttributes,
  submitting,
  values,
  onChange,
  propertyAttributes,
  onChangeAttribute,
  handleSubmit,
  error,
  scrollRef,
  setError,
  typeAttribute
}: Props) {
  const theme = useTheme();

  const [dialog, setDialog] = useState(false);
  const showDialog = () => setDialog(true);
  const hideDialog = () => setDialog(false);

  const [showTypeDropdown, setShowTypeDropdown] = useState(true);

  const { title, description, exclusivity, ownerCommision, oportunityType } =
    values;

  const coords = useMemo(() => {
    const value = propertyAttributes.find((item) => item.name === 'Ubicación');

    return value;
  }, [propertyAttributes]);

  const type = useMemo(() => {
    const value = propertyAttributes.find((item) => item.name === 'Tipo');

    return value;
  }, [propertyAttributes]);

  useEffect(() => {
    if (!type?.value) {
      setShowTypeDropdown(false);

      setTimeout(() => {
        setShowTypeDropdown(true);
      }, 50);
    }
  }, [type?.value]);

  return (
    <>
      

      <ScrollView
        ref={scrollRef}
        style={{ width: '100%', flex: 1, paddingHorizontal: '10%' }}
      >
        {isNew && (
          <PropertyTypeSelect
            filterAttributes={filterAttributes}
            type={values.typeId}
          />
        )}

        {showTypeDropdown && (
          <Dropdown_
            label="Tipo"
            data={typeAttribute?.content}
            defaultValue={type?.value || 'Escoge una opción'}
            onSelect={(value) => onChangeAttribute(typeAttribute?.id!, value)}
          />
        )}

        <Headline style={{ marginBottom: 10, fontWeight: 'bold' }}>
          Información
        </Headline>

        {error && (
          <Chip
            icon="alert-circle-outline"
            style={{
              marginBottom: 20,
              marginTop: 10,
              backgroundColor: theme.colors.danger
            }}
            onClose={() => setError(false)}
          >
            {error}
          </Chip>
        )}

        <TextInput
          label="Título para la propiedad *"
          style={{ marginBottom: 10 }}
          value={title}
          onChangeText={(value) => onChange(value, 'title')}
        />

        <TextInput
          label="Descripción *"
          value={description}
          multiline
          numberOfLines={5}
          style={{ marginBottom: 10 }}
          onChangeText={(value) => onChange(value, 'description')}
        />

        <TextInput
          label="Comisión *"
          style={{ marginBottom: 10 }}
          right={<TextInput.Affix text="%" />}
          keyboardType="number-pad"
          value={ownerCommision.toString()}
          onChangeText={(value) =>
            onChange(value.replace(/[,]/g, '.'), 'ownerCommision')
          }
        />

        <Text style={{ fontSize: 16 }}>Tipo de contrato</Text>
        <RadioButton.Group
          onValueChange={(value) => onChange(value, 'oportunityType')}
          value={oportunityType}
        >
          <RadioButton.Item
            label="Venta"
            value="S"
            uncheckedColor={Colors.grey600}
            color={theme.colors.primary}
          />
          <RadioButton.Item
            label="Arriendo"
            value="R"
            uncheckedColor={Colors.grey600}
            color={theme.colors.primary}
          />
        </RadioButton.Group>

        <Text style={{ fontSize: 16 }}>Exclusividad</Text>
        <RadioButton.Group
          onValueChange={(value) =>
            onChange(value === '1' ? true : false, 'exclusivity')
          }
          value={exclusivity ? '1' : '0'}
        >
          <RadioButton.Item
            label="Si"
            value="1"
            uncheckedColor={Colors.grey600}
            color={theme.colors.primary}
          />
          <RadioButton.Item
            label="No"
            value="0"
            uncheckedColor={Colors.grey600}
            color={theme.colors.primary}
          />
        </RadioButton.Group>

        {inputTypeSelector({
          title: 'Ubicación',
          categoryFilter: 'UBICACION',
          array: propertyAttributes,
          onChangeFn: onChangeAttribute,
          showDialog,
          hasCoords: !!coords?.value
        })}

        {inputTypeSelector({
          title: 'Características',
          categoryFilter: 'CARACTERISTICAS',
          array: propertyAttributes,
          onChangeFn: onChangeAttribute,
          oportunityType,
          showDialog
        })}

        {inputTypeSelector({
          title: 'Medidas',
          categoryFilter: 'MEDIDAS',
          array: propertyAttributes,
          onChangeFn: onChangeAttribute,
          showDialog
        })}

        {inputTypeSelector({
          title: 'Transacción',
          categoryFilter: 'TRANSACCION',
          array: propertyAttributes,
          onChangeFn: onChangeAttribute,
          showDialog
        })}

        {inputTypeSelector({
          title: 'Comodidades',
          categoryFilter: 'AMENITIES',
          array: propertyAttributes,
          onChangeFn: onChangeAttribute,
          showDialog
        })}

        {inputTypeSelector({
          title: 'Adicionales',
          categoryFilter: 'ADICIONALES',
          array: propertyAttributes,
          onChangeFn: onChangeAttribute,
          showDialog
        })}

        <Button
          loading={submitting}
          onPress={submitting ? () => {} : handleSubmit}
          mode="contained"
          color={submitting ? theme.colors.success : theme.colors.primary}
          labelStyle={{ color: theme.colors.text }}
        >
          {submitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </ScrollView>
    </>
  );
}
