import { View, Text } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

export default function InterestedSkeleton() {
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
      <View
        style={{
          height: 30,
          backgroundColor: theme.colors.secondary,
          borderRadius: theme.roundness
        }}
      />

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
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 100,
            backgroundColor: theme.colors.secondary,
            marginRight: 20
          }}
        />

        <View style={{ flexGrow: 1 }}>
          <View
            style={{
              height: 25,
              backgroundColor: theme.colors.secondary,
              marginBottom: 5,
              borderRadius: theme.roundness
            }}
          />
          <View
            style={{
              height: 25,
              backgroundColor: theme.colors.secondary,
              marginBottom: 5,
              borderRadius: theme.roundness
            }}
          />
          <View
            style={{
              height: 25,
              backgroundColor: theme.colors.secondary,
              marginBottom: 5,
              borderRadius: theme.roundness
            }}
          />
          <View
            style={{
              height: 25,
              backgroundColor: theme.colors.secondary,
              marginBottom: 5,
              borderRadius: theme.roundness
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            height: 25,
            width: 25,
            borderRadius: 100,
            backgroundColor: theme.colors.secondary
          }}
        />
        <View
          style={{
            height: 25,
            width: 25,
            borderRadius: 100,
            backgroundColor: theme.colors.secondary
          }}
        />
        <View
          style={{
            height: 25,
            width: 25,
            borderRadius: 100,
            backgroundColor: theme.colors.secondary
          }}
        />
      </View>
    </View>
  );
}
