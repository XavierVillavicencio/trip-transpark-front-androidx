import { useContext, useMemo } from 'react';
import { PropertyGetData } from '../../../interfaces/appInterfaces';
import { PropertiesContext } from '../../../context';

import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { attributeSelector } from '../attributeSelector';

export function Attributes({
  propertyData
}: {
  propertyData: PropertyGetData;
}) {
  const theme = useTheme();

  const { attributes } = useContext(PropertiesContext);

  const attrObj: any = attributes.reduce(
    (acc, val) => ({
      ...acc,
      [val.id]: { ...val }
    }),
    {}
  );

  const propertyAttributes: any = useMemo(() => {
    return propertyData.attributes
      .map((item) => ({
        ...item,
        category: attrObj[item.id].category,
        propertyType: attrObj[item.id].propertyType
      }))
      .filter((item) => item.propertyType.includes(propertyData.type));
  }, [propertyData]);

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      {attributeSelector('UBICACION', propertyAttributes, 'Ubicación', theme)}

      {attributeSelector(
        'CARACTERISTICAS',
        propertyAttributes,
        'Características',
        theme
      )}

      {attributeSelector('MEDIDAS', propertyAttributes, 'Medidas', theme)}

      {attributeSelector(
        'TRANSACCION',
        propertyAttributes,
        'Transacción',
        theme
      )}

      {attributeSelector('AMENITIES', propertyAttributes, 'Comodidades', theme)}

      {attributeSelector(
        'ADICIONALES',
        propertyAttributes,
        'Adicionales',
        theme
      )}
    </View>
  );
}
