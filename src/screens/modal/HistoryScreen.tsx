import { useEffect, useState, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { IHistoryItem } from '../../interfaces/appInterfaces';
import { privateApi } from '../../api/propertiesApi';
import { PropertiesContext } from '../../context';

import { PropertiesStackParams } from '../../navigation';

import { ScrollView, View } from 'react-native';

import {
  ConfirmationDialog,
  HistoryListItem,
  ModalWrapper,
  SkeletonHistory
} from '../../components';
import { Button, Headline, Text, useTheme } from 'react-native-paper';

interface Props extends StackScreenProps<PropertiesStackParams, any> {}

export function HistoryScreen({ navigation }: Props) {
  const theme = useTheme();

  const {
    attributes,
    loadHistory,
    setFilters,
    setHistoryItemEditTitle,
    setHistoryItemEditID,
  } = useContext(PropertiesContext);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [info, setInfo] = useState({
    title: '',
    text: '',
    action: () => {}
  });

  const [history, setHistory] = useState<IHistoryItem[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [inAction, setInAction] = useState(false);

  const redirect = () => {
    navigation.replace('Filters');
  };

  const getHistory = async () => {
    try {
      const { data } = await privateApi.get<IHistoryItem[] | []>('/queries');
      setHistory(data);
      setLoading(false);

      console.log(data[0]);
    } catch (error: any) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  const handleDialog = (action: any, info: { title: string; text: string }) => {
    setInfo({ ...info, action });
    setConfirmationModal(true);
  };

  const handlePress = async (id: number) => {
    try {
      setInAction(true);
      await privateApi.put(`/queries/${id}`);
      setHistory(
        history.map((item) =>
          item.id === id
            ? { ...item, status: item.status === 'A' ? 'I' : 'A' }
            : item
        )
      );
      setInAction(false);
    } catch (error) {
      console.log(error);
      setInAction(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setInAction(true);
      await privateApi.delete(`/queries/${id}`);
      setHistory(history.filter((item) => item.id !== id));
      setInAction(false);
    } catch (error) {
      console.log(error);
      setInAction(false);
    }
  };

  const handleResults = (title: string, query: any) => {
    loadHistory(title, query);
    navigation.navigate('List');
  };

  const editItem = (itemData: IHistoryItem) => {
    setFilters(itemData.query);
    setHistoryItemEditTitle(itemData.name);
    setHistoryItemEditID(itemData.id);
    navigation.replace('Filters');
  };

  useEffect(() => {
    getHistory();
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
            Búsquedas guardadas
          </Headline>

          {loading && (
            <>
              {new Array(6).fill(1).map((_item, index) => (
                <SkeletonHistory key={index} />
              ))}
            </>
          )}

          {!loading && history.length > 0 && (
            <ScrollView style={{ width: '100%', flexGrow: 1 }}>
              {history.map((item) => (
                <HistoryListItem
                  key={item.id}
                  item={item}
                  inAction={inAction}
                  attributes={attributes}
                  handlePress={handlePress}
                  handleDelete={handleDelete}
                  handleResults={handleResults}
                  editItem={editItem}
                  handleDialog={handleDialog}
                  hideDialog={() => setConfirmationModal(false)}
                />
              ))}
            </ScrollView>
          )}

          {!loading && history.length === 0 && (
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button onPress={redirect}>
                <Text>Sin búsquedas, crea una </Text>
                aquí
              </Button>
            </View>
          )}
        </>
      </ModalWrapper>

      <ConfirmationDialog
        dialog={confirmationModal}
        hideDialog={() => setConfirmationModal(false)}
        info={info}
      />
    </>
  );
}
