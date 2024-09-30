import { useRef, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import { Media } from '../../../interfaces/appInterfaces';

import CarouselItem from './CarouselItem';
import Pagination from './Pagination';

import { useTheme } from 'react-native-paper';

export function CarouselComponent({ data }: { data: Media[] }) {
  const theme = useTheme();

  const [index, setIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX
            }
          }
        }
      ],
      {
        useNativeDriver: false
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0]?.index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  return (
    <View style={{ position: 'relative' }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <CarouselItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={{ backgroundColor: theme.colors.background }}
      />
      <Pagination data={data} scrollX={scrollX} indexProp={index} />
    </View>
  );
}
