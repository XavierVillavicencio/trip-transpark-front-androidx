import { useState } from 'react';
import { Share } from 'react-native';
import { FAB, Portal, Provider, useTheme } from 'react-native-paper';

interface Props {
  status: string;
  navPics: any;
  navEdit: any;
  navStatus: any;
  pdf: string;
}

export function FloatingMenu({
  status,
  navPics,
  navEdit,
  navStatus,
  pdf
}: Props) {
  const theme = useTheme();

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: pdf
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log(result.activityType);
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const activeBtn = {
    icon: status === 'I' ? 'check' : 'delete',
    label: status === 'I' ? 'Activar' : 'Desactivar',
    onPress: () => navStatus(status === 'I' ? 'A' : 'I'),
    style: {
      backgroundColor:
        status !== 'I' ? theme.colors.danger : theme.colors.success,
      marginBottom: 20
    },
    labelStyle: {
      backgroundColor:
        status !== 'I' ? theme.colors.danger : theme.colors.success,
      marginBottom: 30
    },
    labelTextColor: theme.colors.text,
    color: theme.colors.text
  };

  const shareBtn = {
    icon: 'share-variant',
    label: 'Compartir PDF',
    onPress: () => onShare(),
    style: {
      backgroundColor: theme.colors.background
    },
    labelStyle: {
      backgroundColor: theme.colors.background
    },
    labelTextColor: theme.colors.text,
    color: theme.colors.text
  };

  const arr = [
    {
      icon: 'pencil',
      label: 'Editar',
      onPress: () => navEdit(),
      style: {
        backgroundColor: theme.colors.background
      },
      labelStyle: {
        backgroundColor: theme.colors.background
      },
      labelTextColor: theme.colors.text,
      color: theme.colors.text
    },
    {
      icon: 'camera',
      label: 'Fotos',
      onPress: () => navPics(),
      style: {
        backgroundColor: theme.colors.background
      },
      labelStyle: {
        backgroundColor: theme.colors.background
      },
      labelTextColor: theme.colors.text,
      color: theme.colors.text
    }
  ];

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          visible
          open={open}
          icon={open ? 'close' : 'dots-vertical'}
          fabStyle={{ backgroundColor: theme.colors.primary }}
          actions={status !== 'D' ? [activeBtn, ...arr, shareBtn] : arr}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
}
