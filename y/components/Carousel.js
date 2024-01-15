import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";


// const Carousel = () => {
//     const images =[
//         "https://drive.google.com/file/d/15NKZboGm0-eEws8RNdJMag7ljU18gzkr/view",
//         "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.recyclingbristol.com%2Fhow-to-sell-scrap-metal%2F&psig=AOvVaw1NyVbDwuVABYIJdai_N_gA&ust=1701546916515000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiM3a2C74IDFQAAAAAdAAAAABAY"
//     ];
//   return (
//     <View>
//      <SliderBox images={images} />
//     </View>
//   )
// }

// export default Carousel

// const styles = StyleSheet.create({})
const Carousel = () => {
    const images = [
      "https://okcredit-blog-images-prod.storage.googleapis.com/2020/12/recycle1.jpg",
      "https://iasbabuji.com/wp-content/uploads/2022/02/E-WASTE.jpg",
  
    //   "https://www.recyclingbristol.com/wp-content/uploads/iStock-1213473751-600x400.jpg"
    ];
    return (
      <View>
        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={"#13274F"}
          inactiveDotColor="#90A4AE"
          ImageComponentStyle={{
            borderRadius: 6,
            width: "94%",
          }}
        />
      </View>
    );
  };
  
  export default Carousel;
  
  const styles = StyleSheet.create({});

