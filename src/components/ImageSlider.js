import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import SliderShow from 'react-native-image-slider-show';
// import img1 from require('../../assets/images/role1.png')
// import img2 from require('../../assets/images/role2.png')

const ImageSlider = ({ route }) => {
  
  const { images } = route.params;
  console.log(images);
  console.log(route.params)

// console.log(styles.paginationBoxStyle)
// console.log(images)
// const image = [
//   require('../../assets/images/role1.png'),
//   require('../../assets/images/role2.png'),
//   require('../../assets/images/role3.png'),
// ];

  return (
    // <View style={styles.container}>
      <View>
      <SliderShow
      dataSource={images}
      />
      {/* <Image source={img1}/> */}
      

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paginationBoxStyle: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default ImageSlider;
