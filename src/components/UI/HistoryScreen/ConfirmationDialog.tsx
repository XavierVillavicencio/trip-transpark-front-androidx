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
  info: { title: string; text: string; action: () => void };
}

export function ConfirmationDialog({ dialog, hideDialog, info }: Props) {
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
        <Dialog.Title>{info.title}</Dialog.Title>
        <Dialog.Content style={{ flexGrow: 1, paddingBottom: 0 }}>
          <Paragraph>{info.text}</Paragraph>
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
            onPress={info.action}
          >
            Confirmar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
