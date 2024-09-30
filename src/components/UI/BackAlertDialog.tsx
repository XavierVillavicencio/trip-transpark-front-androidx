import {
  Button,
  Colors,
  Dialog,
  Paragraph,
  Portal,
  useTheme
} from 'react-native-paper';

interface Props {
  dialog: boolean;
  hideDialog: () => any;
  back: () => any;
  message: string;
}

export function BackAlertDialog({ dialog, hideDialog, back, message }: Props) {
  const theme = useTheme();

  return (
    <Portal>
      <Dialog
        visible={dialog}
        onDismiss={hideDialog}
        style={{
          height: 'auto',
          backgroundColor: theme.colors.screenBg
        }}
      >
        <Dialog.Title>Advertencia</Dialog.Title>
        <Dialog.Content style={{ flexGrow: 1, paddingBottom: 0 }}>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: 'flex-end' }}>
          <Button
            mode="outlined"
            style={{ borderColor: Colors.grey600, marginRight: 10 }}
            labelStyle={{ color: theme.colors.text }}
            onPress={hideDialog}
          >
            Cancelar
          </Button>

          <Button
            mode="contained"
            style={{ borderColor: theme.colors.danger }}
            onPress={back}
          >
            Volver
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
