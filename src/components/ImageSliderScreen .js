import React from 'react';
import { View, Dimensions, StyleSheet,Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ImageSliderScreen = () => {
  const route = useRoute();
  const { images } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.8}
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.75,
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default ImageSliderScreen;
