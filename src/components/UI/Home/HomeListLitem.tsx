import { PropertyGetData } from '../../../interfaces/appInterfaces';
import {
  imageUrl,
  propertyTypeTable,
  statusTable,
  statusColorTable,
  formatHelper
} from '../../../helpers';

import {
  Button,
  Card,
  Subheading,
  Headline,
  Text,
  IconButton,
  Colors,
  useTheme,
  Avatar,
  Chip
} from 'react-native-paper';
import { Linking, Share, View } from 'react-native';
import { privateApi, privateUrl } from '../../../api/propertiesApi';
import { useState, useContext, useMemo } from 'react';
import { PropertiesContext } from '../../../context';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  item: PropertyGetData;
  navigate: any;
}

export function HomeListLitem({ item, navigate }: Props) {
  const theme = useTheme();

  const { title } = useContext(PropertiesContext);

  const color = statusColorTable[item.status];

  const showBtns = useMemo(() => {
    switch (title) {
      case 'Mis propiedades':
        return false;
      case 'Mis borradores':
        return false;
      case 'Propiedades inactivas':
        return false;
      case 'Resultados':
        return true;
      case 'Favoritos':
        return true;
      default:
        return true;
    }
  }, [title]);

  const [isFav, setIsFav] = useState(item.favorite === 0 ? false : true);
  const [loading, setLoading] = useState(false);

  const firstImage = item.media.find((item) => item.order === 1)?.filename;

  const handleWhatsapp = () => {
    // const url = `whatsapp://send/?text=
    // *Mira esta propiedad*
    // Propiead: ${item.title}
    // Corredor: ${item.user[0].firstname} ${item.user[0].lastname}
    // Teléfono: ${item.user[0].cellphone}
    // Link: ${item.pdfUrl}
    // `;
    // Linking.openURL(url);

    const url = `https://wa.me/593${item.user[0].cellphone.substring(1)}/?text=
    Me interesa la propiedad *${item.title}*, hablemos.
    `;
    Linking.openURL(url);
  };

  const handleShare = async () => {
    Share.share({
      title: item.title,
      message: `${privateUrl}${item.pdfUrl}`
    });
  };

  const handleFavs = async () => {
    try {
      setLoading(true);

      await privateApi.post(
        isFav ? '/properties/removeFavorite' : '/properties/createFavorite',
        {
          property: item.id
        }
      );

      setIsFav(!isFav);

      setLoading(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  return (
    <Card style={{ marginBottom: 20, padding: 5 }}>
      {title === 'Mis propiedades' && (
        <Chip
          style={{
            // @ts-ignore
            backgroundColor: theme.colors[color],
            position: 'absolute',
            zIndex: 2,
            left: 10,
            top: 10
          }}
          icon="lock-open-outline"
        >
          {statusTable[item.status]}
        </Chip>
      )}

      {item.notification > 0 && (
        <Chip
          style={{
            // @ts-ignore
            backgroundColor: theme.colors.favorite,
            position: 'absolute',
            zIndex: 2,
            right: 10,
            top: 10
          }}
          icon="star"
        >
          Nuevo!
        </Chip>
      )}

      <Card.Cover
        source={
          item.media.length > 0
            ? {
                uri: imageUrl(firstImage || item.media[0].filename, 'img')
              }
            : require('../../../imgs/noimage.png')
        }
        resizeMode="contain"
        style={{ backgroundColor: theme.colors.background }}
      />
      <Card.Content>
        <Headline
          style={{
            marginTop: 10,
            fontWeight: 'bold'
          }}
        >
          {item.title}
        </Headline>

        <Subheading style={{ marginBottom: 10, color: theme.colors.secondary }}>
          {item.description}
        </Subheading>

        <View style={{ paddingLeft: 10 }}>
          <Text>
            ${' '}
            {formatHelper(
              item.attributes?.find((item) => item.name === 'Precio ')?.value
            )}
          </Text>
          <Text>{propertyTypeTable[item.type]}</Text>
          <Text>{item.attributes?.find((item) => item.id === 4)?.value}</Text>
        </View>

        <Subheading style={{ marginTop: 10, fontWeight: 'bold' }}>
          Corredor
        </Subheading>
        <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
          <Avatar.Image
            size={50}
            source={
              item.user[0].avatar
                ? {
                    uri: `${privateUrl}/images/img_${item.user[0].avatar}`
                  }
                : require('../../../imgs/noimage.png')
            }
            style={{
              backgroundColor: theme.colors.background,
              marginRight: 15
            }}
          />

          <View>
            <Text>
              <Icon name="person" size={15} /> {item.user[0].firstname}{' '}
              {item.user[0].lastname}
            </Text>
            <Text>
              <Icon name="call" size={15} /> {item.user[0].phone || '-'}
            </Text>
            <Text>
              <Icon name="phone-portrait" size={15} />{' '}
              {item.user[0].cellphone || '-'}
            </Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        {showBtns && (
          <>
            <IconButton
              icon="logo-whatsapp"
              onPress={handleWhatsapp}
              color={Colors.green800}
              disabled={item.user[0].cellphone ? false : true}
            />
            <IconButton
              icon="share-social-outline"
              onPress={handleShare}
              color={Colors.blue800}
            />
            <IconButton
              icon={isFav ? 'bookmark' : 'bookmark-outline'}
              onPress={handleFavs}
              color={theme.colors.favorite}
              disabled={loading}
            />
          </>
        )}

        <Button mode="contained" style={{ flexGrow: 1 }} onPress={navigate}>
          Ver
        </Button>
      </Card.Actions>
    </Card>
  );
}
