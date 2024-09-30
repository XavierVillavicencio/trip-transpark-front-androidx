import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PropertyGetData } from '../../../interfaces/appInterfaces';
import { formatHelper, propertyTypeTable } from '../../../helpers';

import { Headline, Subheading, useTheme, Text } from 'react-native-paper';
import { useContext, useMemo } from 'react';
import { Map } from './Map';
import { attributeSelector } from '../attributeSelector';
import { PropertiesContext } from '../../../context';

export function Description({
  propertyData
}: {
  propertyData: PropertyGetData;
}) {
  const theme = useTheme();

  const { attributes } = useContext(PropertiesContext);

  const hasPrice = useMemo(() => {
    return propertyData.attributes?.find((item) => item.name === 'Precio ')
      ?.value;
  }, [propertyData]);

  const hasLocation = useMemo(() => {
    const Provincia = propertyData.attributes?.find(
      (item) => item.name === 'Provincia'
    )?.value;
    const Ciudad = propertyData.attributes?.find(
      (item) => item.name === 'Ciudad'
    )?.value;
    const Sector = propertyData.attributes?.find(
      (item) => item.name === 'Sector'
    )?.value;
    const Dirección = propertyData.attributes?.find(
      (item) => item.name === 'Dirección'
    )?.value;

    return {
      Provincia,
      Ciudad,
      Sector,
      Dirección
    };
  }, [propertyData]);

  const propertyAttributes: any = useMemo(() => {
    const attrObj: any = attributes.reduce(
      (acc, val) => ({
        ...acc,
        [val.id]: { ...val }
      }),
      {}
    );

    return propertyData.attributes
      .map((item) => ({
        ...item,
        category: attrObj[item.id].category,
        propertyType: attrObj[item.id].propertyType
      }))
      .filter((item) => item.propertyType.includes(propertyData.type));
  }, [propertyData]);

  return (
    <View style={{ marginBottom: 10 }}>
      <Headline style={{ fontWeight: 'bold', marginBottom: 10 }}>
        Información
      </Headline>

      <Subheading style={{ fontWeight: 'bold', fontSize: 20 }}>
        {propertyData?.title}
      </Subheading>

      <Subheading style={{}}>
        {propertyData.attributes?.find((item) => item.name === 'Tipo')?.value}
      </Subheading>

      {hasPrice && (
        <Subheading style={{}}>USD $ {formatHelper(hasPrice)}</Subheading>
      )}

      {hasLocation.Provincia && (
        <Subheading style={{}}>Provincia: {hasLocation.Provincia}</Subheading>
      )}
      {hasLocation.Ciudad && (
        <Subheading style={{}}>Ciudad: {hasLocation.Ciudad}</Subheading>
      )}
      {hasLocation.Sector && (
        <Subheading style={{}}>Sector: {hasLocation.Sector}</Subheading>
      )}
      {hasLocation.Dirección && (
        <Subheading style={{}}>Dirección: {hasLocation.Dirección}</Subheading>
      )}

      <Map propertyData={propertyData} />

      <Headline style={{ fontWeight: 'bold', marginBottom: 10 }}>
        Descripción
      </Headline>

      <Subheading>{propertyData.description}</Subheading>

      <Subheading>Comisión: {propertyData.ownerCommision} %</Subheading>
      <Subheading>
        Exclusividad: {propertyData.exclusivity === true ? 'Si' : 'No'}
      </Subheading>
      <Subheading>
        Publicado: {propertyData.datePosted.split('T')[0]}
      </Subheading>

      <View style={{ marginBottom: 10 }} />

      {attributeSelector(
        'TRANSACCION',
        propertyAttributes,
        'Transacción',
        theme
      )}

      {attributeSelector('MEDIDAS', propertyAttributes, 'Medidas', theme)}

      {attributeSelector(
        'CARACTERISTICAS',
        propertyAttributes,
        'Características',
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
