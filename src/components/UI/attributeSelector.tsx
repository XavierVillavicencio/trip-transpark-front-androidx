import { Attribute, AttributeCategory } from '../../interfaces/appInterfaces';
import { sortByTextField } from '../../helpers/sortByTextField';

import { Colors, Headline, Text } from 'react-native-paper';

import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  formatHelper,
  iconsTable,
  leftTableAffix,
  rightTableAffix
} from '../../helpers';

export const attributeSelector = (
  categoryFilter: AttributeCategory,
  array: Attribute[],
  title: string,
  theme: any
) => {
  const filteredArr = array.filter((item) => item.category === categoryFilter);

  if (filteredArr.length === 0) return;

  if (
    categoryFilter === 'AMENITIES' &&
    filteredArr.filter((item) => item.value !== '0').length === 0
  )
    return;

  return (
    <View
      style={{
        // backgroundColor: theme.colors.inputBg,
        // borderRadius: theme.roundness,
        // paddingHorizontal: 10,
        // paddingVertical: 5,
        // flexGrow: 1,
        marginRight: 15,
        marginBottom: 15
      }}
    >
      <Headline style={{ fontWeight: 'bold', marginBottom: 10 }}>
        {title}
      </Headline>

      <View style={{ paddingLeft: 20 }}>
        {array
          .filter((item) => item.category === categoryFilter)
          // .sort(sortByTextField('dataType'))
          .map((item) => {
            if (
              item.name === 'Ubicación' ||
              item.name === 'Precio ' ||
              item.name === 'Tipo'
            )
              return;

            if (
              item.name === 'Metraje Total' ||
              item.name === 'Metraje Construido' ||
              item.name === 'Valor Alicuota'
            ) {
              return (
                <View
                  key={item.id}
                  style={{
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
                    {leftTableAffix[item.name] && leftTableAffix[item.name]}{' '}
                    {item.value ? formatHelper(item.value.toString()) : ''}{' '}
                    {rightTableAffix[item.name] && rightTableAffix[item.name]} -{' '}
                    {item.name}
                  </Text>
                </View>
              );
            }

            if (item.dataType !== 'C') {
              return (
                <View
                  key={item.id}
                  style={{
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
                    {leftTableAffix[item.name] && leftTableAffix[item.name]}{' '}
                    {item.value}{' '}
                    {rightTableAffix[item.name] && rightTableAffix[item.name]} -{' '}
                    {item.name}
                  </Text>
                </View>
              );
            }

            if (item.dataType === 'C' && item.value === '1') {
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
    </View>
  );
};
