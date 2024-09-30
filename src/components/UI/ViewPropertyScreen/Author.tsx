import { View } from 'react-native';
import { PropertyGetData } from '../../../interfaces/appInterfaces';
import { privateUrl } from '../../../api/propertiesApi';

import { Avatar, Headline, Subheading, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export function Author({ propertyData }: { propertyData: PropertyGetData }) {
  const theme = useTheme();

  return (
    <View style={{ marginBottom: 20 }}>
      <Headline style={{ fontWeight: 'bold' }}>Corredor</Headline>

      <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
        <Avatar.Image
          size={100}
          source={
            propertyData.user[0].avatar
              ? {
                  uri: `${privateUrl}/images/img_${propertyData.user[0].avatar}`
                }
              : require('../../../imgs/noimage.png')
          }
          style={{
            backgroundColor: theme.colors.background,
            alignSelf: 'center',
            marginVertical: 10
          }}
        />

        {/* iconos en cosas y poner foto */}

        <Subheading>
          <Icon name="person" size={15} /> {propertyData.user[0].firstname}{' '}
          {propertyData.user[0].lastname}
        </Subheading>
        <Subheading>
          <Icon name="mail" size={15} /> {propertyData.user[0].email || '-'}
        </Subheading>
        <Subheading>
          <Icon name="call" size={15} /> {propertyData.user[0].phone || '-'}
        </Subheading>
        <Subheading>
          <Icon name="phone-portrait" size={15} />{' '}
          {propertyData.user[0].cellphone || '-'}
        </Subheading>
      </View>
    </View>
  );
}
