import { StyleSheet, Animated, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const Pagination = ({ data, scrollX, indexProp }: any) => {
  return (
    <View style={styles.container}>
      {data.map((_: any, index: number) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp'
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#80808080', '#878787', '#80808080'],
          extrapolate: 'clamp'
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { width: dotWidth, backgroundColor },
              index === indexProp && styles.dotActive
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#80808080',
    marginHorizontal: 3,
    marginBottom: 10
  },
  dotActive: {
    backgroundColor: '#878787'
  }
});
