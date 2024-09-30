import {
  Dialog,
  Paragraph,
  Portal,
  useTheme,
  Subheading,
  Button,
  Colors
} from 'react-native-paper';

export function DeleteDialog({
  dialog,
  hideDialog,
  deleteUser
}: {
  dialog: boolean;
  hideDialog: () => void;
  deleteUser: () => void;
}) {
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
        <Dialog.Title>Borrar usuario</Dialog.Title>
        <Dialog.Content style={{ flexGrow: 1, paddingBottom: 0 }}>
          <Subheading style={{ fontWeight: 'bold' }}>
            ¿ Estás seguro que deseas borrar tu usuario ?
          </Subheading>

          <Paragraph>
            La información se borrará de manera permanente, tanto tu información
            personal como la de tus propiedades, búsquedas e interesados
          </Paragraph>
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
            onPress={deleteUser}
          >
            Borrar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
