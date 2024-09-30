import { useContext, useState, useMemo, useEffect } from 'react';
import { useForm } from '../../hooks';
import { privateApi } from '../../api/propertiesApi';
import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';
import { AuthContext, PropertiesContext } from '../../context';

import {
  Attribute,
  GeographicArea,
  PropertyPostData,
  PropertyTypes
} from '../../interfaces/appInterfaces';

import { defaultPropertyData } from '../../data';

import { Wrapper } from '../../components';

import Form from '../../components/UI/Property/Form';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function NewPropertyScreen({ navigation }: Props) {
  const { user } = useContext(AuthContext);
  const { attributes } = useContext(PropertiesContext);

  const [propertyType, setPropertyType] = useState<PropertyTypes>('A');
  const [geographicAreas, setGeographicAreas] = useState<
    { name: string; id: string }[]
  >([]);

  const [submitting, setSubmitting] = useState(false);

  // prettier-ignore
  const { values, onChange, setState } = useForm<PropertyPostData>(defaultPropertyData);

  const [propertyAttributes, setPropertyAttributes] = useState<Attribute[]>([]);

  const filterAttributes = () => {
    setPropertyAttributes(
      attributes
        .filter((item) => item.propertyType.includes(propertyType))
        .map((item) => ({ ...item, value: item.dataType === 'C' ? '0' : '' }))
    );
  };

  const getGeographicAreas = async () => {
    try {
      const { data } = await privateApi.get<GeographicArea[]>(
        `/helpers/geographicAreas`
      );
      setGeographicAreas(
        data.map((item) => ({ name: item.name, id: item.id.toString() }))
      );
      setState({ ...values, geographicAreaId: data[0].id.toString() });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeAttribute = (id: number, value: any) => {
    setPropertyAttributes(
      propertyAttributes.map((item) =>
        item.id === id ? { ...item, value } : item
      )
    );
  };

  const handleSubmit = async () => {
    // setSubmitting(true);

    if (!propertyType) return;

    try {
      const { data } = await privateApi.post('/properties', {
        ...values,
        ownerId: user?.userId,
        clientName: `${user?.firstname} ${user?.lastname}`,
        attributes: propertyAttributes.map((item) => ({
          attributeId: item.id,
          attributeValue: item.value
        }))
      });

      console.log(data);

      // navigation.replace('Pictures', { id: data });
    } catch (error) {
      setSubmitting(false);
    }
  };

  // useEffect(() => {
  //   filterAttributes();
  // }, [propertyType]);

  useEffect(() => {
    getGeographicAreas();
  }, []);

  return (
    <Wrapper width="100%">
      <Form
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        geographicAreas={geographicAreas}
        submitting={submitting}
        values={values}
        onChange={onChange}
        propertyAttributes={propertyAttributes}
        onChangeAttribute={onChangeAttribute}
        handleSubmit={handleSubmit}
      />
    </Wrapper>
  );
}
