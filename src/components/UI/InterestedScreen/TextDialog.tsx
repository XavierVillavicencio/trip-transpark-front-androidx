import {
  Button,
  Colors,
  Dialog,
  HelperText,
  Paragraph,
  Portal,
  TextInput,
  useTheme
} from 'react-native-paper';
import { IInterestedItem } from '../../../interfaces/appInterfaces';
import { Subheading } from 'react-native-paper';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  inAction: boolean;
  dialog: boolean;
  hideDialog: () => any;
  info: IInterestedItem | null;
  handleNote: (itemId: number, note: string) => void;
}

export function TextDialog({
  dialog,
  hideDialog,
  info,
  handleNote,
  inAction
}: Props) {
  const theme = useTheme();

  const [note, setNote] = useState('');

  useEffect(() => {
    if (info === null) return;

    setNote(info?.notes!);
  }, [info]);

  return (
    <Portal>
      <Dialog
        visible={dialog}
        onDismiss={() => {
          hideDialog();
          setNote('');
        }}
        style={{
          height: 'auto',
          backgroundColor: theme.colors.screenBg
        }}
      >
        <Dialog.Title>Ver notas</Dialog.Title>
        <Dialog.Content style={{ flexGrow: 1, paddingBottom: 0 }}>
          <Subheading style={{ fontWeight: 'bold' }}>
            <Icon name="home" size={15} /> {info?.title}
          </Subheading>
          <Subheading style={{ fontWeight: 'bold' }}>
            <Icon name="person" size={15} /> {info?.firstname} {info?.lastname}
          </Subheading>
          <Subheading>
            <Icon name="mail" size={15} /> {info?.email}
          </Subheading>
          <Subheading style={{ marginBottom: 10 }}>
            <Icon name={info?.read === 1 ? 'eye' : 'eye-off'} size={15} />{' '}
            {info?.read === 1 ? 'Visto' : 'No visto'}
          </Subheading>

          <TextInput
            label="Nota"
            value={note}
            onChangeText={(text) => setNote(text)}
            numberOfLines={4}
            error={note?.length > 50}
          />
          {note?.length > 50 && (
            <HelperText visible={true} type="error">
              La nota debe de contener un máximo de 50 caracteres
            </HelperText>
          )}
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: 'flex-end' }}>
          <Button
            mode="outlined"
            style={{ borderColor: Colors.grey600, marginRight: 10 }}
            labelStyle={{ color: theme.colors.text }}
            onPress={hideDialog}
            disabled={inAction}
          >
            Cancelar
          </Button>

          <Button
            mode="contained"
            style={{ borderColor: theme.colors.primary }}
            onPress={() => {
              handleNote(info?.id!, note);
              setNote('');
            }}
            disabled={inAction || note?.length > 50 || note?.length === 0}
          >
            Guardar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
