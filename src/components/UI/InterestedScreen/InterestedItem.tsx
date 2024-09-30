import { View, Text } from 'react-native';
import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Colors,
  IconButton,
  Subheading,
  Title,
  useTheme
} from 'react-native-paper';
import { IInterestedItem } from '../../../interfaces/appInterfaces';
import { imageUrl } from '../../../helpers';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  inAction: boolean;
  item: IInterestedItem;
  toggleTextDialog: () => any;
  setInfo: any;
  handleNavToProperty: () => any;
  handleToggleFavorite: () => any;
  handleToggleView: () => any;
  handleWhatsapp: (number: string, title: string) => any;
}

export default function InterestedItem({
  inAction,
  item,
  toggleTextDialog,
  setInfo,
  handleNavToProperty,
  handleToggleFavorite,
  handleToggleView,
  handleWhatsapp
}: Props) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: '100%',
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.background,
        marginBottom: 10,
        padding: 10
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Title style={{ textAlign: 'center', flex: 1 }}>{item.title}</Title>
        <Button
          icon="open-outline"
          compact
          color={theme.colors.primary}
          mode="contained"
          onPress={handleNavToProperty}
        >
          Ver
        </Button>
      </View>

      <View
        style={{
          height: 2,
          backgroundColor: theme.colors.secondary,
          width: '100%',
          borderRadius: theme.roundness,
          marginVertical: 5
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          flexGrow: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginBottom: 10
        }}
      >
        <Avatar.Image
          size={40}
          source={
            item.avatar
              ? {
                  uri: imageUrl(item.avatar, 'img')
                }
              : require('../../../imgs/noimage.png')
          }
          style={{
            backgroundColor: theme.colors.background,
            alignSelf: 'center',
            marginRight: 20
          }}
        />

        <View style={{}}>
          <Subheading style={{ fontWeight: 'bold' }}>
            <Icon name="person" size={15} /> {item.firstname} {item.lastname}
          </Subheading>
          <Subheading>
            <Icon name="mail" size={15} /> {item.email}
          </Subheading>
          <Subheading>
            <Icon name="call" size={15} /> {item.phone || '---'}
          </Subheading>
          <Subheading>
            <Icon name="phone-portrait" size={15} /> {item.cellphone || '---'}
          </Subheading>
          <Subheading>
            <Icon name="calendar-outline" size={15} />{' '}
            {item.date?.split('T')[0] || '---'}
          </Subheading>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <IconButton
          icon={item.favorite === 1 ? 'star' : 'star-outline'}
          onPress={handleToggleFavorite}
          color={
            item.favorite === 1 ? theme.colors.favorite : theme.colors.secondary
          }
          disabled={inAction}
        />

        <IconButton
          icon="eye-outline"
          onPress={handleToggleView}
          color={item.read === 1 ? Colors.blue800 : theme.colors.secondary}
          disabled={inAction}
        />

        <IconButton
          icon="logo-whatsapp"
          onPress={() => handleWhatsapp(item.cellphone!, item.title)}
          color={Colors.green800}
          disabled={item.cellphone === null || inAction}
        />

        <IconButton
          icon={item.notes ? 'chatbox-ellipses-outline' : 'chatbox-outline'}
          onPress={() => {
            setInfo(item);
            toggleTextDialog();
          }}
          color={theme.colors.text}
          disabled={inAction}
        />
      </View>
    </View>
  );
}
