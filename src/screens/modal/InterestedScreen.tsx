import { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { IInterestedItem } from '../../interfaces/appInterfaces';
import { privateApi } from '../../api/propertiesApi';

import { PropertiesStackParams } from '../../navigation';

import {
  ScrollView,
  View,
  Linking,
  FlatList,
  RefreshControl
} from 'react-native';

import {
  ConfirmationDialog,
  Dropdown_,
  ModalWrapper,
  TextDialog
} from '../../components';
import {
  ActivityIndicator,
  Button,
  Headline,
  Subheading,
  Text,
  useTheme
} from 'react-native-paper';
import InterestedItem from '../../components/UI/InterestedScreen/InterestedItem';
import InterestedSkeleton from '../../components/UI/InterestedScreen/InterestedSkeleton';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function InterestedScreen({ navigation }: Props) {
  const theme = useTheme();

  const [textDialog, setTextDialog] = useState(false);
  const [info, setInfo] = useState<IInterestedItem | null>(null);

  const [data, setData] = useState<IInterestedItem[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [inAction, setInAction] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [filters, setFilters] = useState({
    defaultValue: 'Todos',
    read: false,
    favorite: false,
    notes: false,
    recent: false,
    page: 1
  });

  const getData = async ({
    read,
    favorite,
    notes,
    recent,
    page = 1
  }: {
    read: boolean;
    favorite: boolean;
    notes: boolean;
    recent: boolean;
    page?: number;
  }) => {
    try {
      setLoading(true);
      const { data } = await privateApi.get<IInterestedItem[] | []>(
        `/propertiesLogs?page=${page}&PageSize=10&read=${read}&favorite=${favorite}&notes=${notes}&recent=${recent}`
      );

      if (data.length <= 10) setNoMoreData(true);

      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const reload = async () => {
    setNoMoreData(false);
    setIsRefreshing(true);
    await getData({
      read: filters.read,
      favorite: filters.favorite,
      notes: filters.notes,
      recent: filters.recent,
      page: 1
    });
    setIsRefreshing(false);
  };

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const res = await privateApi.get<IInterestedItem[] | []>(
        `/propertiesLogs?page=${filters.page}&PageSize=10&read=${filters.read}&favorite=${filters.favorite}&notes=${filters.notes}&recent=${filters.recent}`
      );

      if (data.length > 0) {
        setData([...data, ...res.data]);
        setLoadingMore(false);
        return;
      }

      if (data.length === 0) setNoMoreData(true);
    } catch (error) {
      console.log(error);
      setLoadingMore(false);
    }
  };

  const handleNote = (itemId: number, notes: string) => {
    try {
      setInAction(true);

      privateApi.put(`/propertiesLogs/${itemId}`, {
        notes
      });

      setData(
        data.map((item) => (item.id === itemId ? { ...item, notes } : item))
      );

      setTimeout(() => {
        setTextDialog(false);
      }, 1000);

      setInAction(false);
    } catch (error: any) {
      console.log(error.response.data);
      setInAction(false);
    }
  };

  const handleNavToProperty = (propertyId: number) => {
    navigation.navigate('View', { id: propertyId.toString() });
  };

  const handleToggleFavorite = (itemId: number, favorite: number) => {
    try {
      setInAction(true);

      privateApi.put(`/propertiesLogs/${itemId}`, {
        favorite
      });

      setData(
        data.map((item) => (item.id === itemId ? { ...item, favorite } : item))
      );

      setInAction(false);
    } catch (error: any) {
      console.log(error.response.data);
      setInAction(false);
    }
  };

  const handleToggleView = (itemId: number, read: number) => {
    try {
      setInAction(true);

      privateApi.put(`/propertiesLogs/${itemId}`, {
        read
      });

      setData(
        data.map((item) => (item.id === itemId ? { ...item, read } : item))
      );

      setInAction(false);
    } catch (error: any) {
      console.log(error.response.data);
      setInAction(false);
    }
  };

  const handleWhatsapp = (number: string, title: string) => {
    // const url = `whatsapp://send/?text=
    // ¿ Te interesa la propiedad *${title}* ? Hablemos
    // `;
    const url = `https://wa.me/593${number.substring(1)}/?text=
    ¿ Te interesa la propiedad *${title}* ? Hablemos
    `;
    Linking.openURL(url);
  };

  useEffect(() => {
    getData({ read: false, favorite: false, notes: false, recent: false });
  }, []);

  return (
    <>
      <ModalWrapper navigation={navigation}>
        <>
          <Headline
            style={{
              fontWeight: 'bold',
              marginBottom: 20,
              textTransform: 'uppercase',
              textAlign: 'center',
              color: theme.colors.primary
            }}
          >
            Interesados
          </Headline>

          {!loading && data.length > 0 && (
            <View
              style={{
                marginBottom: 10
              }}
            >
              <Dropdown_
                label="Filtro"
                data={[
                  'Recientes',
                  'Leidos',
                  'No leidos',
                  'Destacados',
                  'Notas',
                  'Todos'
                ]}
                defaultValue={filters.defaultValue}
                onSelect={(value) => {
                  if (value === 'Recientes') {
                    setFilters({
                      ...filters,
                      defaultValue: value,
                      read: false,
                      favorite: false,
                      notes: false,
                      recent: true
                    });
                    getData({
                      read: false,
                      favorite: false,
                      notes: false,
                      recent: true
                    });
                    return;
                  }
                  if (value === 'Leidos') {
                    setFilters({
                      ...filters,
                      defaultValue: value,
                      read: true,
                      favorite: false,
                      notes: false,
                      recent: false
                    });
                    getData({
                      read: true,
                      favorite: false,
                      notes: false,
                      recent: false
                    });
                    return;
                  }
                  if (value === 'No leidos') {
                    setFilters({
                      ...filters,
                      defaultValue: value,
                      read: false,
                      favorite: false,
                      notes: false,
                      recent: false
                    });
                    getData({
                      read: false,
                      favorite: false,
                      notes: false,
                      recent: false
                    });
                    return;
                  }
                  if (value === 'Destacados') {
                    setFilters({
                      ...filters,
                      defaultValue: value,
                      read: false,
                      favorite: true,
                      notes: false,
                      recent: false
                    });
                    getData({
                      read: false,
                      favorite: true,
                      notes: false,
                      recent: false
                    });
                    return;
                  }
                  if (value === 'Notas') {
                    setFilters({
                      ...filters,
                      defaultValue: value,
                      read: false,
                      favorite: false,
                      notes: true
                    });
                    getData({
                      read: false,
                      favorite: false,
                      notes: true,
                      recent: false
                    });
                    return;
                  }
                  if (value === 'Todos') {
                    setFilters({
                      ...filters,
                      defaultValue: value,
                      read: false,
                      favorite: false,
                      notes: false,
                      recent: false
                    });
                    getData({
                      read: false,
                      favorite: false,
                      notes: false,
                      recent: false
                    });
                    return;
                  }
                }}
              />
            </View>
          )}

          {loading && (
            <>
              {new Array(6).fill(1).map((_item, index) => (
                <InterestedSkeleton key={index} />
              ))}
            </>
          )}

          {!loading && data.length > 0 && (
            <FlatList
              style={{
                flexGrow: 1,
                // marginTop: 20,
                width: '100%'
              }}
              data={data}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <InterestedItem
                  key={item.id}
                  inAction={inAction}
                  item={item}
                  toggleTextDialog={() => setTextDialog(!textDialog)}
                  setInfo={setInfo}
                  handleNavToProperty={() => handleNavToProperty(item.propId)}
                  handleToggleFavorite={() =>
                    handleToggleFavorite(item.id, item.favorite === 1 ? 2 : 1)
                  }
                  handleToggleView={() =>
                    handleToggleView(item.id, item.read === 1 ? 2 : 1)
                  }
                  handleWhatsapp={handleWhatsapp}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={reload} />
              }
              onEndReached={!noMoreData ? loadMore : null}
              onEndReachedThreshold={0.01}
              ListFooterComponent={
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {loadingMore && (
                    <ActivityIndicator
                      animating={true}
                      color={theme.colors.primary}
                    />
                  )}
                  {noMoreData && <Subheading>No hay más datos</Subheading>}
                </View>
              }
            />
          )}

          {!loading && data.length === 0 && (
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text>No hay datos</Text>
            </View>
          )}
        </>
      </ModalWrapper>

      <TextDialog
        dialog={textDialog}
        hideDialog={() => {
          setTextDialog(false);
          setInfo(null);
        }}
        info={info ? info : null}
        handleNote={handleNote}
        inAction={inAction}
      />
    </>
  );
}
