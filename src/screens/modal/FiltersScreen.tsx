import { useContext, useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesContext } from '../../context';
import { PropertiesStackParams } from '../../navigation';
import { inputTypeSelector, ModalWrapper, RangeInputs } from '../../components';
import { privateApi } from '../../api/propertiesApi';
import {
  Attribute,
  Filters,
  PropertyTypes
} from '../../interfaces/appInterfaces';

import { View, ScrollView, Keyboard, BackHandler } from 'react-native';

import {
  Button,
  Colors,
  Dialog,
  Headline,
  HelperText,
  Paragraph,
  Portal,
  Subheading,
  Text,
  TextInput,
  useTheme
} from 'react-native-paper';

import { Dropdown_ } from '../../components';
import { PropertyTypeSelect } from '../../components/UI/Property/PropertyTypeSelect';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function FiltersScreen({ navigation }: Props) {
  const theme = useTheme();

  const {
    loadFilters,
    attributes,
    filters,
    setFilters,
    historyItemEditTitle,
    cancelEditHistoryItem,
    clearFilters,
    historyItemEditID
  } = useContext(PropertiesContext);

  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [emptyFields, setEmptyFields] = useState('');

  const [searchData, setSearchData] = useState({
    name: historyItemEditTitle || '',
    query: {}
  });

  const [errors, setErrors] = useState({
    name: ''
  });

  const [saveStatus, setSaveStatus] = useState({
    loading: false,
    error: false,
    success: false
  });

  const [typeAttribute, setTypeAttribute] = useState(
    attributes.find((item) => item.name === 'Tipo')
  );
  const [attributesByType, setAttributesByType] = useState<Attribute[]>([]);

  const filterAttributes = (type: PropertyTypes) => {
    if (!historyItemEditTitle) setFilters({ ...filters, type, attributes: {} });

    setTypeAttribute(
      attributes.find(
        (item) => item.name === 'Tipo' && item.propertyType.includes(type)
      )
    );

    setAttributesByType(
      attributes
        .filter((item) => item.propertyType.includes(type))
        .map((item) => ({
          ...item,
          value: item.dataType === 'C' ? '0' : ''
        }))
    );
  };

  const handleFilter = <T extends Filters>(value: string, key: keyof T) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleAttribute = (id: number, value: string, minOrMax?: string) => {
    if (!value) {
      if (minOrMax) {
        return setFilters({
          ...filters,
          attributes: {
            ...filters.attributes,
            [id]: {
              ...filters.attributes[id],
              [minOrMax]: ''
            }
          }
        });
      }

      const copy = { ...filters.attributes };
      delete copy[id];
      return setFilters({ ...filters, attributes: copy });
    }

    if (minOrMax) {
      return setFilters({
        ...filters,
        attributes: {
          ...filters.attributes,
          [id]: {
            ...filters.attributes[id],
            [minOrMax]: value
          }
        }
      });
    }

    setFilters({
      ...filters,
      attributes: { ...filters.attributes, [id]: value }
    });
  };

  const checkFields = () => {
    const price = filters.attributes[9];
    const rooms = filters.attributes[10];

    if (filters.type === 'A') {
      if (!price || !price.min || !rooms || !rooms.min) {
        setEmptyFields(
          `${!price || !price.min ? 'Precio' : ''}${
            !rooms || !rooms.min ? ' Dormitorios' : ''
          }`
        );

        setShowAlertModal(true);

        Keyboard.dismiss();
        return false;
      }
    }

    if (!price || !price.min) {
      setEmptyFields(`${!price || !price.min ? 'Precio' : ''}`);

      setShowAlertModal(true);

      Keyboard.dismiss();
      return false;
    }

    return true;
  };

  const search = () => {
    const check = checkFields();

    if (!check) return;

    loadFilters();
    navigation.replace('List');
  };

  const saveSearch = async () => {
    if (saveStatus.error) return;

    setErrors({ name: '' });

    if (searchData.name === '')
      return setErrors({ ...errors, name: 'Campo requerido' });

    try {
      setSaveStatus({ error: false, success: false, loading: true });

      await privateApi.post('/queries', {
        ...searchData,
        status: 'A',
        query: { ...filters, ownerId: '' }
      });

      Keyboard.dismiss();

      setSaveStatus({ error: false, success: true, loading: false });

      setTimeout(() => {
        clearFilters();
        navigation.replace('History');
      }, 3000);
    } catch (error: any) {
      console.log(error.response.data);
      setSaveStatus({ error: true, success: false, loading: false });

      setTimeout(() => {
        setSaveStatus({ error: false, success: false, loading: false });
      }, 3000);
    }
  };

  const editSearch = async () => {
    if (saveStatus.error) return;

    setErrors({ name: '' });

    if (searchData.name === '')
      return setErrors({ ...errors, name: 'Campo requerido' });

    try {
      setSaveStatus({ error: false, success: false, loading: true });

      await privateApi.put(`/queries/${historyItemEditID}`, {
        ...searchData,
        status: 'A',
        query: { ...filters, ownerId: '' }
      });

      Keyboard.dismiss();

      setSaveStatus({ error: false, success: true, loading: false });

      setTimeout(() => {
        cancelEditHistoryItem();
        clearFilters();
        navigation.replace('History');
      }, 3000);
    } catch (error) {
      console.log({ error });
      setSaveStatus({ error: true, success: false, loading: false });

      setTimeout(() => {
        setSaveStatus({ error: false, success: false, loading: false });
      }, 3000);
    }
  };

  useEffect(() => {
    if (historyItemEditTitle) {
      //@ts-ignore
      filterAttributes(filters.type);
      return;
    }

    clearFilters();
    filterAttributes('A');
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (historyItemEditTitle) {
        cancelEditHistoryItem();
        clearFilters();
        navigation.replace('History');
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const { oportunityType } = filters;

  return (
    <>
      <ModalWrapper navigation={navigation}>
        <>
          <Headline
            style={{
              fontWeight: 'bold',
              marginBottom: !historyItemEditTitle ? 20 : 0,
              textTransform: 'uppercase',
              color: theme.colors.primary,
              textAlign: 'center'
            }}
          >
            Búsqueda avanzada
          </Headline>

          {historyItemEditTitle && (
            <Subheading style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                Editando:
              </Text>{' '}
              {historyItemEditTitle}
            </Subheading>
          )}

          <ScrollView style={{ flex: 1, width: '100%', marginBottom: 20 }}>
            <PropertyTypeSelect
              type={filters.type}
              filterAttributes={filterAttributes}
            />

            <Dropdown_
              label="Tipo"
              data={typeAttribute?.content}
              defaultValue={
                filters.attributes
                  ? filters.attributes[typeAttribute?.id || '']
                  : ''
              }
              onSelect={(value) =>
                handleAttribute(typeAttribute?.id!, value, undefined)
              }
            />

            <Headline style={{ marginBottom: 10, fontWeight: 'bold' }}>
              General
            </Headline>

            <Dropdown_
              label="Tipo de contrato"
              data={[
                { name: 'Venta', value: 'S' },
                { name: 'Renta', value: 'R' }
              ]}
              defaultValue={
                oportunityType
                  ? oportunityType === 'R'
                    ? 'Renta'
                    : 'Venta'
                  : ''
              }
              onSelect={(value) => handleFilter(value.value, 'oportunityType')}
            />

            {inputTypeSelector({
              title: 'Ubicación',
              categoryFilter: 'UBICACION',
              array: attributesByType,
              onChangeFn: handleAttribute,
              valuesTable: filters.attributes,
              isFiltersScreen: true
            })}

            {inputTypeSelector({
              title: 'Características',
              categoryFilter: 'CARACTERISTICAS',
              array: attributesByType,
              onChangeFn: handleAttribute,
              valuesTable: filters.attributes,
              isFiltersScreen: true
            })}

            {inputTypeSelector({
              title: 'Medidas',
              categoryFilter: 'MEDIDAS',
              array: attributesByType,
              onChangeFn: handleAttribute,
              valuesTable: filters.attributes
            })}

            {inputTypeSelector({
              title: 'Transacción',
              categoryFilter: 'TRANSACCION',
              array: attributesByType,
              onChangeFn: handleAttribute,
              valuesTable: filters.attributes
            })}

            {inputTypeSelector({
              title: 'Comodidades',
              categoryFilter: 'AMENITIES',
              array: attributesByType,
              onChangeFn: handleAttribute,
              valuesTable: filters.attributes
            })}
            {inputTypeSelector({
              title: 'Adicionales',
              categoryFilter: 'ADICIONALES',
              array: attributesByType,
              onChangeFn: handleAttribute,
              valuesTable: filters.attributes
            })}
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            {historyItemEditTitle && (
              <Button
                icon="close-outline"
                mode="contained"
                color={theme.colors.secondary}
                style={{ width: '45%' }}
                onPress={() => {
                  cancelEditHistoryItem();
                  clearFilters();
                  navigation.replace('History');
                }}
                labelStyle={{ color: Colors.white }}
              >
                Cancelar
              </Button>
            )}

            {!historyItemEditTitle && (
              <Button
                icon="star"
                mode="contained"
                color={theme.colors.favorite}
                style={{ width: '45%' }}
                onPress={() => {
                  const check = checkFields();

                  if (!check) return;

                  Keyboard.dismiss();

                  setShowModal(true);
                }}
                labelStyle={{ color: Colors.white }}
              >
                Guardar
              </Button>
            )}

            {historyItemEditTitle && (
              <Button
                icon="save-outline"
                mode="contained"
                onPress={() => {
                  const check = checkFields();

                  if (!check) return;

                  setShowModal(true);
                }}
                style={{ width: '45%' }}
              >
                Guardar
              </Button>
            )}

            {!historyItemEditTitle && (
              <Button
                icon="search"
                mode="contained"
                onPress={search}
                style={{ width: '45%' }}
              >
                Buscar
              </Button>
            )}
          </View>
        </>
      </ModalWrapper>

      <Portal>
        <Dialog visible={showModal} onDismiss={() => setShowModal(false)}>
          <Dialog.Title>Guardar búsqueda</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nombre"
              value={searchData.name}
              onChangeText={(text) =>
                setSearchData({ ...searchData, name: text })
              }
              style={{ marginBottom: !!errors.name ? 0 : 10 }}
              error={!!errors.name}
            />
            {!!errors.name && (
              <HelperText
                type="error"
                visible={!!errors.name}
                style={{ marginBottom: 10 }}
              >
                {errors.name}
              </HelperText>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            {!saveStatus.success && (
              <Button
                mode="contained"
                color={theme.colors.secondary}
                onPress={() => setShowModal(false)}
                style={{ marginRight: 10 }}
                loading={saveStatus.loading}
                disabled={saveStatus.loading}
              >
                Cancelar
              </Button>
            )}

            {saveStatus.success && (
              <Button mode="contained" color={theme.colors.success}>
                ¡Guardado!
              </Button>
            )}

            {!saveStatus.success && (
              <Button
                mode="contained"
                onPress={historyItemEditID ? editSearch : saveSearch}
                loading={saveStatus.loading}
                disabled={saveStatus.loading}
                color={saveStatus.error ? Colors.red400 : theme.colors.primary}
              >
                {saveStatus.error ? '¡Hubo un error!' : 'Guardar'}
              </Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={showAlertModal}
          onDismiss={() => setShowAlertModal(false)}
        >
          <Dialog.Title>Alerta</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Debes agregar un valor mínimo en los siguientes campos:{' '}
              {emptyFields}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              color={theme.colors.secondary}
              onPress={() => setShowAlertModal(false)}
              style={{ marginRight: 10 }}
              loading={saveStatus.loading}
              disabled={saveStatus.loading}
            >
              Continuar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
