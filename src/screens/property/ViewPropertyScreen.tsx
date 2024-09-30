import { useState, useEffect, useContext } from 'react';
import { PropertyGetData } from '../../interfaces/appInterfaces';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { PropertiesStackParams } from '../../navigation';
import { privateApi, privateUrl } from '../../api/propertiesApi';

import { ScrollView, View } from 'react-native';

import {
  Attributes,
  Author,
  CarouselComponent,
  Chips,
  Description,
  FloatingMenu,
  Map,
  SkeletonProperty
} from '../../components';
import { AuthContext } from '../../context';

interface Props extends StackScreenProps<PropertiesStackParams, 'View'> {}

export function ViewPropertyScreen({ navigation, route }: Props) {
  const { id } = route.params;

  const { user } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [propertyData, setPropertyData] = useState<PropertyGetData | null>(
    null
  );
  const [images, setImages] = useState<any>([]);
  const [loadingProperty, setLoadingProperty] = useState(true);

  const getPropertyData = async () => {
    try {
      const res = await privateApi.get<PropertyGetData>(`/properties/${id}`);

      if (res.data.media.length > 0) {
        const arr = res.data.media
          .sort((a, b) => a.order - b.order)
          .map((item) => ({
            id: item.id,
            uri: `${privateUrl}/images/img_${item.filename}`,
            filename: item.filename
          }));
        setImages(arr);
      }

      setPropertyData(res.data);

      setLoadingProperty(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoadingProperty(false);
    }
  };

  const navPics = () => {
    navigation.navigate('Pictures', {
      id,
      name: propertyData?.title,
      images,
      status: propertyData?.status
    });
  };

  const navEdit = () => {
    navigation.navigate('Form', {
      data: propertyData!
    });
  };

  const navStatus = async (status: 'I' | 'A') => {
    try {
      await privateApi.post('/properties/updateStatus', {
        property: id,
        status
      });

      // @ts-ignore
      setPropertyData({ ...propertyData, status });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getPropertyData();
    }
  }, [isFocused]);

  if (loadingProperty || !propertyData) {
    return <SkeletonProperty />;
  }

  return (
    <>
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <CarouselComponent data={propertyData.media} />

        <View
          style={{
            width: '80%',
            alignSelf: 'center',
            paddingBottom: 50
          }}
        >
          <Author propertyData={propertyData} />

          <Chips propertyData={propertyData} />

          <Description propertyData={propertyData} />

          {/* <Attributes propertyData={propertyData} /> */}
        </View>
      </ScrollView>

      {user?.userId === propertyData.user[0].userId && (
        <FloatingMenu
          navPics={navPics}
          navEdit={navEdit}
          navStatus={navStatus}
          pdf={`${privateUrl}${propertyData.pdfUrl}`}
          status={propertyData.status}
        />
      )}
    </>
  );
}
