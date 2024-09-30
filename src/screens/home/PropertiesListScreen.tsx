import { useContext, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RefreshControl, View, FlatList } from 'react-native';
import { PropertiesStackParams } from '../../navigation';
import { PropertiesContext } from '../../context';

import { HomeListLitem, SkeletonHome, Wrapper } from '../../components';

import {
  ActivityIndicator,
  Button,
  Headline,
  Subheading,
  Text,
  useTheme
} from 'react-native-paper';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function PropertiesListScreen({ navigation }: Props) {
  const theme = useTheme();

  const {
    loadingProperties,
    properties,
    title,
    initialLoad,
    loadFilters,
    loadFavorites,
    loadDrafts,
    loadInactives,
    loadMore,
    noMoreData,
    loadingMore,
    historyTitle,
    getError,
  } = useContext(PropertiesContext);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const reload = async () => {
    setIsRefreshing(true);

    switch (title) {
      case 'Mis propiedades':
        initialLoad();
        setIsRefreshing(false);
        break;
      case 'Resultados':
        loadFilters();
        setIsRefreshing(false);
        break;
      case 'Favoritos':
        loadFavorites();
        setIsRefreshing(false);
        break;
      case 'Mis borradores':
        loadDrafts();
        setIsRefreshing(false);
        break;
      case 'Propiedades inactivas':
        loadInactives();
        setIsRefreshing(false);
        break;

      default:
        initialLoad();
        setIsRefreshing(false);
        break;
    }
  };

  // const sendNotification = async () =>
  //   await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
  //     subID: '3',
  //     appId: 4989,
  //     appToken: '3XDQPKxYUyW0PqqA6cQm69',
  //     title: 'test axios',
  //     message: 'put your push notification message here as a string',
  //     pushData: { propertyId: 1 }
  //   });

  const Header = () => {
    return (
      <View style={{ width: '100%' }}>
        <Headline
          style={{
            marginTop: 0,
            marginBottom: !historyTitle ? 20 : 0,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            width: '100%',
            color: theme.colors.primary,
            textAlign: 'center'
          }}
        >
          {title}
        </Headline>
        {historyTitle && (
          <Subheading style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Búsqueda aplicada: </Text>{' '}
            {historyTitle}
          </Subheading>
        )}
      </View>
    );
  };

  const Footer = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {loadingMore && (
          <ActivityIndicator animating={true} color={theme.colors.primary} />
        )}
        {noMoreData && <Subheading>No hay más datos</Subheading>}
      </View>
    );
  };

  if (getError) {
    return (
      <Wrapper width="90%">
        <Header />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Button onPress={reload}>
            <Text>Error de carga, </Text>
            reintentar
          </Button>
        </View>
      </Wrapper>
    );
  }

  if (loadingProperties) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20
        }}
      >
        <SkeletonHome />
        <SkeletonHome />
      </View>
    );
  }

  if (!loadingProperties && properties.length === 0) {
    return (
      <Wrapper width="90%">
        <Header />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Button onPress={reload}>
            <Text>No hay datos, </Text>
            reintentar
          </Button>
        </View>
      </Wrapper>
    );
  }

  return (
    <Wrapper width="90%">
      <Header />

      <FlatList
        style={{
          flex: 1,
          // marginTop: 20,
          width: '100%'
        }}
        data={properties}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <HomeListLitem
            item={item}
            navigate={() =>
              navigation.navigate('View', {
                id: item.id.toString()
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={reload} />
        }
        onEndReached={!noMoreData ? loadMore : null}
        onEndReachedThreshold={0.01}
        ListFooterComponent={Footer}
      />
    </Wrapper>
  );
}
