import { IconButton, Colors, useTheme, Text } from 'react-native-paper';

import { View, Image } from 'react-native';
import { useState } from 'react';

interface Props {
  index: number;
  item: any;
  id: string | number;
  uri: any;
  handleDelete: (id: any) => any;
  handleSort: (item: any, up: boolean) => any;
  sortUp: boolean;
  sortDown: boolean;
}

export function Picture({
  index,
  item,
  uri,
  id,
  handleDelete,
  handleSort,
  sortUp,
  sortDown
}: Props) {
  const theme = useTheme();

  const [erreasing, setErreasing] = useState(false);

  const localDelete = () => {
    setErreasing(true);
    const res = handleDelete(id);
    if (res === false) {
      setErreasing(false);
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      <IconButton
        icon="trash-outline"
        color={Colors.red400}
        style={{
          backgroundColor: Colors.red100,
          position: 'absolute',
          zIndex: 3,
          bottom: 15,
          left: 5
        }}
        onPress={localDelete}
        disabled={erreasing}
      />

      {item.isProp && (
        <View
          style={{
            position: 'absolute',
            zIndex: 3,
            bottom: 15,
            right: 5,
            flexDirection: 'row'
          }}
        >
          {sortDown && (
            <IconButton
              size={20}
              icon="caret-down-outline"
              color={Colors.white}
              style={{
                backgroundColor: theme.colors.secondary
              }}
              onPress={() => handleSort(item, false)}
            />
          )}
          {sortUp && (
            <IconButton
              size={20}
              icon="caret-up-outline"
              color={Colors.white}
              style={{
                backgroundColor: theme.colors.secondary
              }}
              onPress={() => handleSort(item, true)}
            />
          )}
        </View>
      )}

      <Text
        style={{
          backgroundColor: theme.colors.secondary,
          position: 'absolute',
          zIndex: 3,
          top: 15,
          left: 15,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 100,
          fontWeight: 'bold'
        }}
      >
        {index}
      </Text>

      <Image
        source={{
          uri
        }}
        style={{
          zIndex: 1,
          aspectRatio: 16 / 9,
          width: '100%',
          marginBottom: 10,
          borderRadius: 10
        }}
      />
    </View>
  );
}
