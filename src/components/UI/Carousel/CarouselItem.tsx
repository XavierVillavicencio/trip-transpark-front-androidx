import { StyleSheet, View, Dimensions, Easing, Image } from 'react-native';
import { imageUrl } from '../../../helpers';
import { Media } from '../../../interfaces/appInterfaces';

const { width } = Dimensions.get('screen');

const CarouselItem = ({ item }: { item: Media }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl(item.filename, 'img') }}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    width,
    height: 300
    // alignItems: 'center',
    // backgroundColor: '#ca2329'
  },
  image: {
    flex: 1,
    width: '100%'
  }
});
