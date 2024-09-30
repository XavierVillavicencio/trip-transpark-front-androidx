import { useMemo } from 'react';
import { Attribute, IHistoryItem } from '../../../interfaces/appInterfaces';
import {
  iconsTable,
  propertyTypeTable,
  rightTableAffix
} from '../../../helpers';

import {
  Badge,
  Button,
  Card,
  Chip,
  Colors,
  Paragraph,
  Subheading,
  Text,
  useTheme
} from 'react-native-paper';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { formatHelper } from '../../../helpers/currencyFormat';

interface Props {
  inAction: boolean;
  item: IHistoryItem;
  attributes: Attribute[];
  handlePress: (id: number) => any;
  handleDelete: (id: number) => any;
  handleResults: (title: string, query: any) => any;
  editItem: (itemData: IHistoryItem) => any;
  handleDialog: (action: any, info: any) => any;
  hideDialog: () => any;
}

export function HistoryListItem({
  inAction,
  item,
  attributes,
  handlePress,
  handleDelete,
  handleResults,
  editItem,
  handleDialog,
  hideDialog
}: Props) {
  const theme = useTheme();

  const attributesList = useMemo(() => {
    const itemAttributes = Object.entries(item.query.attributes).map(
      (item) => ({ id: Number(item[0]), value: item[1] })
    );

    return itemAttributes.map((itemAttr) => {
      const itemData = attributes.find((item) => item.id === itemAttr.id);

      return {
        ...itemAttr,
        name: itemData?.name,
        dataType: itemData?.dataType
      };
    });
  }, [item]);

  const hasPrice = useMemo(() => {
    return !!item.query.attributes['10'];
  }, [item]);

  const typeAttr = useMemo(() => {
    return attributesList.find((item) => item.name === 'Tipo')?.value || '';
  }, [attributesList]);

  return (
    <Card
      style={{ marginBottom: 15, backgroundColor: theme.colors.background }}
    >
      <Card.Content>
        {item.notification > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10
            }}
          >
            <Chip
              style={{ backgroundColor: theme.colors.favorite }}
              icon="star"
            >
              {item.notification} Nuevo{item.notification > 1 ? 's' : ''}!
            </Chip>
          </View>
        )}

        <Subheading>
          <Text style={{ fontWeight: 'bold' }}>Fecha:</Text>{' '}
          {item.datePosted.split('T')[0]}
        </Subheading>
        <Subheading>
          <Text style={{ fontWeight: 'bold' }}>Nombre:</Text> {item.name}
        </Subheading>
        <Subheading>
          <>
            <Text style={{ fontWeight: 'bold' }}>Tipo:</Text> {typeAttr}
          </>
        </Subheading>
        {item.query.age && (
          <Subheading>
            <Text style={{ fontWeight: 'bold' }}>Antigüedad:</Text>{' '}
            {item.query.age}
          </Subheading>
        )}
        {hasPrice && (
          <Subheading>
            <Text style={{ fontWeight: 'bold' }}>Precio:</Text> Desde $
            {formatHelper(item.query.attributes[9].min)}
            {item.query.attributes[9].max
              ? ` - Hasta $${formatHelper(item.query.attributes[9].max)}`
              : ''}
          </Subheading>
        )}
        {item.query.oportunityType && (
          <Subheading>
            <Text style={{ fontWeight: 'bold' }}>Transacción:</Text>{' '}
            {item.query.oportunityType === 'S' ? 'Venta' : 'Renta'}
          </Subheading>
        )}

        <Subheading
          style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}
        >
          Adicional
        </Subheading>

        <View
          style={{
            width: '100%'
          }}
        >
          {attributesList.map((item: any) => {
            if (item.name === 'Precio ') return;
            if (item.name === 'Tipo') return;

            if (item.dataType !== 'C') {
              if (item.name === 'Dormitorios') {
                return (
                  <View
                    key={item.id}
                    style={{
                      marginRight: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 7
                    }}
                  >
                    <Icon
                      color={theme.colors.text}
                      name={iconsTable[item.name]}
                      size={15}
                      brand
                    />
                    <Text style={{ marginLeft: 5 }}>
                      {`Desde ${item.value.min} ${
                        rightTableAffix[item.name] || ''
                      } ${
                        item.value.max
                          ? `- Hasta ${item.value.max} ${
                              rightTableAffix[item.name] || ''
                            }`
                          : ''
                      }`}
                      - {item.name}
                    </Text>
                  </View>
                );
              }

              return (
                <View
                  key={item.id}
                  style={{
                    marginRight: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 7
                  }}
                >
                  <Icon
                    color={theme.colors.text}
                    name={iconsTable[item.name]}
                    size={15}
                    brand
                  />
                  <Text style={{ marginLeft: 5 }}>
                    {typeof item.value === 'object'
                      ? `Desde ${formatHelper(item.value.min)} ${
                          rightTableAffix[item.name] || ''
                        } ${
                          item.value.max
                            ? ` - Hasta ${formatHelper(item.value.max)} ${
                                rightTableAffix[item.name] || ''
                              }`
                            : ''
                        }`
                      : item.value}{' '}
                    - {item.name}
                  </Text>
                </View>
              );
            } else if (item.value !== '0') {
              return (
                <View
                  key={item.id}
                  style={{
                    marginRight: 15,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon
                    color={theme.colors.text}
                    name={iconsTable[item.name]}
                    size={15}
                    brand
                  />
                  <Text style={{ marginLeft: 5, lineHeight: 30 }}>
                    {item.name}
                  </Text>
                </View>
              );
            }
          })}
        </View>
      </Card.Content>

      <Card.Actions>
        <Button
          color={theme.colors.danger}
          mode="contained"
          // onPress={() => handleDelete(item.id)}
          onPress={() =>
            handleDialog(
              () => {
                handleDelete(item.id);
                hideDialog();
              },
              {
                title: 'Eliminar elemento',
                text: '¿ Deseas eliminar este elemento ?'
              }
            )
          }
          icon="trash"
          disabled={inAction}
          style={{ marginRight: 10 }}
          labelStyle={{ color: theme.colors.text }}
        >
          {/*  */}
        </Button>

        {item.status === 'I' ? (
          <Button
            style={{ flex: 1 }}
            color={Colors.lightGreen700}
            mode="contained"
            // onPress={() => handlePress(item.id)}
            onPress={() =>
              handleDialog(
                () => {
                  handlePress(item.id);
                  hideDialog();
                },
                {
                  title: 'Activar búsqueda',
                  text: '¿ Deseas activar esta búsqueda ?'
                }
              )
            }
            icon="play-outline"
            labelStyle={{ color: Colors.white }}
            disabled={inAction}
          >
            Activar
          </Button>
        ) : (
          <Button
            style={{ flex: 1 }}
            color={theme.colors.danger}
            mode="contained"
            // onPress={() => handlePress(item.id)}
            onPress={() =>
              handleDialog(
                () => {
                  handlePress(item.id);
                  hideDialog();
                },
                {
                  title: 'Detener búsqueda',
                  text: '¿ Deseas detener esta búsqueda ?'
                }
              )
            }
            icon="stop-circle-outline"
            labelStyle={{ color: Colors.white }}
            disabled={inAction}
          >
            Detener
          </Button>
        )}

        <Button
          style={{ marginLeft: 10 }}
          color={theme.colors.secondary}
          labelStyle={{ color: theme.colors.text }}
          mode="contained"
          onPress={() => editItem(item)}
          icon="create"
          disabled={inAction}
        >
          {/*  */}
        </Button>

        <Button
          style={{ marginLeft: 10 }}
          color={theme.colors.primary}
          labelStyle={{ color: theme.colors.text }}
          mode="contained"
          onPress={() => handleResults(item.name, item.query)}
          disabled={inAction}
        >
          Ver
        </Button>
      </Card.Actions>
    </Card>
  );
}
