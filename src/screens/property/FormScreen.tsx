import { useContext, useState, useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { useForm } from '../../hooks';
import { privateApi } from '../../api/propertiesApi';
import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';
import { AuthContext, PropertiesContext } from '../../context';
import { defaultPropertyData } from '../../data';
import { useNavigation } from '@react-navigation/native';

import { Headline, useTheme } from 'react-native-paper';
import { BackAlertDialog, Wrapper } from '../../components';
import Form from '../../components/UI/Property/Form';
import {
  Attribute,
  PropertyGetData,
  PropertyPostData,
  PropertyTypes
} from '../../interfaces/appInterfaces';

interface Props extends StackScreenProps<PropertiesStackParams, 'Form'> {}

export function FormScreen({ navigation, route }: Props) {
  const isNew = route.params?.new;
  const propertyData = route.params.data;

  const theme = useTheme();

  const nav = useNavigation();

  const scrollRef = useRef();

  const [backAlertDialog, setBackAlertDialog] = useState(false);

  const { user } = useContext(AuthContext);
  const { attributes } = useContext(PropertiesContext);

  const [error, setError] = useState('');

  const [submitting, setSubmitting] = useState(false);

  // prettier-ignore
  const { values, onChange, setState } = useForm<PropertyPostData | PropertyGetData>(propertyData ?? defaultPropertyData);

  const [typeAttribute, setTypeAttribute] = useState(
    attributes.find((item) => item.name === 'Tipo')
  );
  const [propertyAttributes, setPropertyAttributes] = useState<Attribute[]>([]);

  const filterAttributes = (type: PropertyTypes) => {
    const prevAttsValues: any = propertyData?.attributes.reduce(
      (acc, val) => ({
        ...acc,
        [val.id]: val.value
      }),
      {}
    );

    setTypeAttribute(
      attributes.find(
        (item) => item.name === 'Tipo' && item.propertyType.includes(type)
      )
    );

    setPropertyAttributes(
      attributes
        .filter((item) => item.propertyType.includes(type))
        .map((item) => {
          // if (item.name === 'Tipo') {
          //   if (propertyData) {
          //     return { ...item, value: item.value };
          //   }

          //   return { ...item, value: '' };
          // }

          return {
            ...item,
            value: isNew
              ? item.dataType === 'C'
                ? '0'
                : ''
              : prevAttsValues[item.id]
          };
        })
    );

    setState({ ...values, typeId: type });
  };

  const onChangeAttribute = (id: number, value: any) => {
    setPropertyAttributes(
      propertyAttributes.map((item) =>
        item.id === id ? { ...item, value } : item
      )
    );
  };

  const handleSubmit = async () => {
    const attributesMapped = propertyAttributes
      .filter((item) => item.value)
      .map((item) => {
        return {
          attributeId: item.id,
          attributeValue: item.value
        };
      });

    let err = '';

    if (values.title.replace(/[\r\n]/gm, '').trim().length === 0) {
      err = 'Titulo es requerido';
    }
    if (values.description.replace(/[\r\n]/gm, '').trim().length === 0) {
      err = 'Descripción es requerido';
    }
    if (!values.ownerCommision) {
      err = 'Descripción es requerido';
    }

    propertyAttributes
      .filter((item) => item.category !== 'AMENITIES')
      .map((item) => {
        if (item.isRequired === 1 && item.value === '') {
          return (err = `${item.name} es requerido`);
        }
      });

    if (err) {
      // @ts-ignore
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true
      });

      return setError(err);
    }

    setSubmitting(true);
    setError('');

    try {
      if (isNew) {
        const { data } = await privateApi.post('/properties', {
          ...values,
          ownerId: user?.userId,
          clientName: `${user?.firstname} ${user?.lastname}`,
          attributes: attributesMapped
        });

        await privateApi.post('/properties/updateStatus', {
          property: data,
          status: 'D'
        });

        navigation.replace('Pictures', { id: data, new: true });

        return;
      }

      await privateApi.put(`/properties/${propertyData?.id}`, {
        ...values,
        attributes: attributesMapped
      });

      navigation.goBack();
    } catch (error: any) {
      console.log(error.response.data);

      // @ts-ignore
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true
      });

      setSubmitting(false);
      setError(error.response.data.mensaje);
    }
  };

  useEffect(() => {
    filterAttributes(propertyData ? propertyData.type : 'A');
  }, []);

  useEffect(() => {
    const backAction = () => {
      setBackAlertDialog(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Wrapper width="100%">
        <Headline
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: 20,
            textTransform: 'uppercase',
            color: theme.colors.primary
          }}
        >
          {isNew ? 'Crear propiedad' : 'Editar propiedad'}
        </Headline>

        <Form
          isNew={!!isNew}
          filterAttributes={filterAttributes}
          submitting={submitting}
          values={values}
          onChange={onChange}
          propertyAttributes={propertyAttributes}
          onChangeAttribute={onChangeAttribute}
          handleSubmit={handleSubmit}
          error={error}
          scrollRef={scrollRef}
          setError={setError}
          typeAttribute={typeAttribute}
        />
      </Wrapper>

      <BackAlertDialog
        dialog={backAlertDialog}
        hideDialog={() => setBackAlertDialog(false)}
        back={() => {
          setBackAlertDialog(false);
          nav.goBack();
        }}
        message="Volver ahora hará que la información ingresada no se guarde ¿ Deseas continuar ?"
      />
    </>
  );
}
