import { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Auth/AuthContext';

import { privateApi } from '../../api/propertiesApi';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Attribute,
  Filters,
  PropertyGetData
} from '../../interfaces/appInterfaces';

type TitleTypes =
  | 'Mis propiedades'
  | 'Resultados'
  | 'Favoritos'
  | 'Mis borradores'
  | 'Propiedades inactivas';

type ContextProps = {
  loadingProperties: boolean;
  properties: PropertyGetData[];
  title: TitleTypes;
  imagesConsts: { min: string; max: string };
  attributes: Attribute[];
  initialLoad: () => Promise<void>;
  loadFilters: () => Promise<void>;
  loadFavorites: () => Promise<void>;
  loadDrafts: () => Promise<void>;
  loadInactives: () => Promise<void>;
  loadClear: () => Promise<void>;
  loadMore: () => Promise<void>;
  loadHistory: (title: string, query: any) => Promise<void>;
  historyTitle: string | null;
  noMoreData: boolean;
  loadingMore: boolean;
  filters: Filters;
  setFilters: any;
  getError: boolean;
  locations: { provincia: any[]; ciudad: any[]; sector: any[] };
  getProvincia: () => void;
  getCiudad: (id: number) => void;
  getSector: (id: number) => void;
  historyItemEditTitle: string;
  setHistoryItemEditTitle: any;
  cancelEditHistoryItem: any;
  clearFilters: any;
  historyItemEditID: any;
  setHistoryItemEditID: any;
  setAttributes: any;
  loginThirdParty: any;
  sendThirdParty: any;
  getThirdPartyToken: any;
};

const defaultFilters = {
  page: 1,
  pageSize: 10,
  filter: '',
  type: '',
  oportunityType: '',
  status: 'A',
  attributes: {},
  orderBy: { name: 'ASC' }
};

export const PropertiesContext = createContext({} as ContextProps);

export const PropertiesProvider = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  const navigation = useNavigation();

  const [title, setTitle] = useState<TitleTypes>('Mis propiedades');
  const [historyTitle, setHistoryTitle] = useState<null | string>(null);
  const [historyItemEditTitle, setHistoryItemEditTitle] = useState('');
  const [historyItemEditID, setHistoryItemEditID] = useState('');
  const [imagesConsts, setImagesConsts] = useState({
    min: '',
    max: ''
  });

  const [locations, setLocations] = useState({
    provincia: [],
    ciudad: [],
    sector: []
  });

  const [properties, setProperties] = useState<PropertyGetData[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(false);

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const [noMoreData, setNoMoreData] = useState(false);
  const [loadingMore, setLoadingMore] = useState(true);
  const [attributes, setAttributes] = useState<Attribute[] | []>([]);

  const [getError, setGetError] = useState(false);
  const [getThirdPartyToken, setGetThirdPartyToken] = useState(false);

  useEffect(() => {
    if (user) {
      //loadAttributes();
      //loadImagesConsts();
      //getProvincia();
    }
  }, [user]);

  const sendThirdParty = async (transactionNo: string) => {
    try {
      let testInteger = parseInt(transactionNo);
      if (!Number.isInteger(testInteger)) {
        navigation.navigate('ErrorTicket');
        return null;
      }

      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + token);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        'https://thirdparty.transpark.br-st.net/api/v1/pms/general/Partner/InquiryTransaction?locationId=PS00000011&transactionNo=' +
          transactionNo,
        requestOptions,
      )
        .then(response => response.text())
        .then(async resultado => {
          let resultadoJson = JSON.parse(resultado).data;
          let paymentStatus = resultadoJson.paymentStatus;
          switch (paymentStatus) {
            case 'UNPAID':
              await AsyncStorage.setItem('ticketCode', resultado); // el único que debe irse guardando
              navigation.navigate('TabsHomeTicket');
              break;
            case 'PAID':
              navigation.navigate('PaidTicket');
              break;
            case 'FREE':
              navigation.navigate('GracePeriod');
              break;
            case 'OVERTIME':
              navigation.navigate('OvertimeTicket');
              break;
            default: // marcamos como error de lectura
              navigation.navigate('ErrorTicket');
              break;
          }
        })
        .catch(error => {
          navigation.navigate('ErrorTicket');
          console.log('error', error);
        });
    } catch (error: any) {
      console.error(
        'There is an error sending the data; please check the console.',
      );
      console.log(error.response.data);
    }
  };

  const loginThirdParty = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      username: 'admin',
      password: '123456',
    });

    return fetch('https://thirdparty.transpark.br-st.net/api/authenticate', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then(response => response.text())
      .then(async result => {
        console.info('loginThirdPart');
        let r = JSON.parse(result);
        console.info({r});
        await AsyncStorage.setItem('id_token', r.id_token);
        return r.id_token;
      })
      .catch(error => {
        console.log('error', error);
        return false;
      });
  };

  const getProvincia = async () => {
    const res = await privateApi.get('/locations');
    setLocations({
      provincia: res.data,
      ciudad: [],
      sector: [],
    });
  };

  const getCiudad = async (id: number) => {
    const res = await privateApi.get(`/locations/ciudades/${id}`);
    setLocations({
      ...locations,
      ciudad: res.data,
    });
  };

  const getSector = async (id: number) => {
    const res = await privateApi.get(`/locations/sectores/${id}`);
    setLocations({
      ...locations,
      sector: res.data,
    });
  };

  const loadAttributes = async () => {
    try {
      const { data } = await privateApi.get<Attribute[]>(`/helpers/attributes`);
      setAttributes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadImagesConsts = async () => {
    try {
      const { data } = await privateApi.get(`/params/PROPERTIES_CONST_UPLOADS`);
      setImagesConsts({
        min: data[0].value.split('-')[0],
        max: data[0].value.split('-')[1]
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const initialLoad = async () => {
    setTitle('Mis propiedades');

    setGetError(false);

    setLoadingProperties(true);

    setLoadingMore(true);
    setNoMoreData(false);

    try {
      const { data } = await privateApi.post(`/properties/query`, {
        ...defaultFilters,
        page: 1,
        ownerId: user?.userId
      });

      setProperties(data);
      setHistoryTitle(null);

      if (data.length < 10) {
        setFilters({
          ...defaultFilters,
          ownerId: user?.userId!
        });

        setNoMoreData(true);
        setLoadingMore(false);
        setLoadingProperties(false);
        return;
      }

      setFilters({
        ...defaultFilters,
        ownerId: user?.userId!,
        page: defaultFilters.page + 1
      });

      setLoadingProperties(false);
    } catch (error) {
      setProperties([]);
      setNoMoreData(true);
      setLoadingMore(false);
      setLoadingProperties(false);
      setGetError(true);

      console.log(error);
    }
  };

  const loadFilters = async () => {
    setGetError(false);

    setLoadingProperties(true);

    setLoadingMore(true);
    setNoMoreData(false);

    try {
      const { data } = await privateApi.post(`/properties/query`, {
        ...filters,
        onlyFavorite: false,
        page: 1,
        ownerId: '',
        status: 'A'
      });

      setProperties(data);

      setTitle('Resultados');

      if (data.length < 10) {
        setFilters({
          ...filters,
          onlyFavorite: false,
          ownerId: '',
          status: 'A'
        });

        setNoMoreData(true);
        setLoadingMore(false);
        setLoadingProperties(false);
        return;
      }

      setFilters({
        ...filters,
        ownerId: '',
        page: defaultFilters.page + 1,
        onlyFavorite: false,
        status: 'A'
      });

      setLoadingProperties(false);
    } catch (error) {
      setTitle('Resultados');

      setProperties([]);
      setNoMoreData(true);
      setLoadingMore(false);
      setLoadingProperties(false);
      setGetError(true);

      console.log(error);
    }
  };

  const loadFavorites = async () => {
    setGetError(false);

    setLoadingProperties(true);

    setLoadingMore(true);
    setNoMoreData(false);

    try {
      const { data } = await privateApi.post(`/properties/query`, {
        ...defaultFilters,
        page: 1,
        ownerId: '',
        onlyFavorite: true,
        status: 'A',
        type: ''
      });

      setProperties(data);

      setTitle('Favoritos');
      setHistoryTitle(null);

      if (data.length < 10) {
        setFilters({
          ...defaultFilters,
          ownerId: '',
          onlyFavorite: true,
          status: 'A',
          type: ''
        });

        setNoMoreData(true);
        setLoadingMore(false);
        setLoadingProperties(false);
        return;
      }

      setFilters({
        ...defaultFilters,
        ownerId: '',
        onlyFavorite: true,
        page: defaultFilters.page + 1,
        status: 'A'
      });

      setLoadingProperties(false);
    } catch (error) {
      setTitle('Favoritos');

      setProperties([]);
      setNoMoreData(true);
      setLoadingMore(false);
      setLoadingProperties(false);
      setGetError(true);

      console.log(error);
    }
  };

  const loadDrafts = async () => {
    setGetError(false);

    setLoadingProperties(true);

    setLoadingMore(true);
    setNoMoreData(false);

    try {
      const { data } = await privateApi.post(`/properties/query`, {
        ...defaultFilters,
        page: 1,
        ownerId: user?.userId,
        status: 'D'
      });

      setProperties(data);

      setTitle('Mis borradores');
      setHistoryTitle(null);

      if (data.length < 10) {
        setFilters({
          ...defaultFilters,
          page: 1,
          ownerId: user?.userId,
          status: 'D'
        });

        setNoMoreData(true);
        setLoadingMore(false);
        setLoadingProperties(false);
        return;
      }

      setFilters({
        ...defaultFilters,
        page: defaultFilters.page + 1,
        ownerId: user?.userId,
        status: 'D'
      });

      setLoadingProperties(false);
    } catch (error) {
      setTitle('Mis borradores');

      setProperties([]);
      setNoMoreData(true);
      setLoadingMore(false);
      setLoadingProperties(false);
      setGetError(true);

      console.log(error);
    }
  };

  const loadInactives = async () => {
    setGetError(false);

    setLoadingProperties(true);

    setLoadingMore(true);
    setNoMoreData(false);

    try {
      const { data } = await privateApi.post(`/properties/query`, {
        ...defaultFilters,
        page: 1,
        ownerId: user?.userId,
        status: 'I'
      });

      setProperties(data);

      setTitle('Propiedades inactivas');
      setHistoryTitle(null);

      if (data.length < 10) {
        setFilters({
          ...defaultFilters,
          page: 1,
          ownerId: user?.userId,
          status: 'I'
        });

        setNoMoreData(true);
        setLoadingMore(false);
        setLoadingProperties(false);
        return;
      }

      setFilters({
        ...defaultFilters,
        page: defaultFilters.page + 1,
        ownerId: user?.userId,
        status: 'I'
      });

      setLoadingProperties(false);
    } catch (error) {
      setTitle('Propiedades inactivas');

      setProperties([]);
      setNoMoreData(true);
      setLoadingMore(false);
      setLoadingProperties(false);
      setGetError(true);

      console.log(error);
    }
  };

  const loadHistory = async (title: string, query: any) => {
    setGetError(false);

    setLoadingProperties(true);

    setLoadingMore(true);
    setNoMoreData(false);

    try {
      const { data } = await privateApi.post(`/properties/query`, {
        ...query,
        page: 1
      });

      setProperties(data);

      setFilters({
        ...query,
        page: defaultFilters.page + 1
      });

      setTitle('Resultados');
      setHistoryTitle(title);

      setLoadingProperties(false);

      if (data.length < 10) {
        setNoMoreData(true);
        setLoadingMore(false);
      }
    } catch (error: any) {
      setTitle('Resultados');
      setHistoryTitle(title);

      setFilters({
        ...query,
        page: defaultFilters.page + 1
      });

      setProperties([]);
      setNoMoreData(true);
      setLoadingMore(false);
      setLoadingProperties(false);
      setGetError(true);

      console.log(error.response.data);
    }
  };

  const cancelEditHistoryItem = async () => {
    setFilters(defaultFilters);
    setHistoryItemEditTitle('');
    setHistoryItemEditID('')
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const loadClear = async () => {
    setLoadingProperties(true);

    setLoadingMore(true);
    setNoMoreData(false);

    try {
      const { data } = await privateApi.post(`/properties/query`, {
        ownerId: user?.userId,
        ...defaultFilters
      });

      setProperties(data);

      setFilters(defaultFilters);

      setLoadingProperties(false);

      setTitle('Mis propiedades');

      setHistoryTitle(null);

      if (data.length < 10) {
        setNoMoreData(true);
        setLoadingMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      const { data } = await privateApi.post(`/properties/query`, {
        ...filters
      });

      if (data.length > 0) {
        setFilters({
          ...filters,
          page: filters.page! + 1
        });
        setProperties([...properties, ...data]);
        return;
      }

      setLoadingMore(false);
      setNoMoreData(true);

      // setLoadingProperties(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <PropertiesContext.Provider
      value={{
        loadingProperties,
        properties,
        title,
        initialLoad,
        loadFilters,
        loadFavorites,
        loadDrafts,
        loadInactives,
        loadClear,
        loadMore,
        noMoreData,
        loadingMore,
        imagesConsts,
        attributes,
        filters,
        setFilters,
        loadHistory,
        historyTitle,
        getError,
        locations,
        getProvincia,
        loginThirdParty,
        sendThirdParty,
        getCiudad,
        getSector,
        historyItemEditTitle,
        setHistoryItemEditTitle,
        cancelEditHistoryItem,
        clearFilters,
        historyItemEditID,
        setHistoryItemEditID,
        setAttributes,
        getThirdPartyToken,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};
