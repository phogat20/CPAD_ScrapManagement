import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Alert,
  Pressable,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

import React, { useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import ScrapItem from "../components/ScrapItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  // const cart = useSelector((state) => state.cart.cart);
  // const [items,setItems] = useState([]);
  // const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
  // const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);
  // const [items,setItems] = useState([]);
  // const total = items.quantity*items.price;
  const total = cart.map((items) => items.quantity * items.price).reduce((curr,prev) => curr + prev,0);
  
  const navigation = useNavigation();
  // console.log(total);
  // console.log(cart);




  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "VJTI College matunga 400019"
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log(response)

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);

  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = () => {
      services.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  console.log(product);

  const services = [
    {
      id: "0",
      image:
        "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/11/whatsapp-image-2019-11-24-at-16-1574593427.jpeg",
      name: "NEWSPAPER",
      quantity: 0,
      price: "RS 16/KG",
    },
    {
      id: "11",
      image:
        "https://rukminim2.flixcart.com/image/416/416/xif0q/paper/w/x/b/copier-paper-smoth-white-200-sheet-for-printing-work-a4-paper-1-original-imagp3hzuwbhepfs.jpeg?q=70",
      name: "OFFICE PAPER",
      quantity: 0,
      price: "RS 16/KG",
    },
    {
      id: "12",
      image:
        "https://rukminim2.flixcart.com/image/416/416/l3uhvgw0/diary-notebook/b/l/7/1234-per-day-original-imagevnxtxvzhke3.jpeg?q=70",
      name: "BOOKS",
      quantity: 0,
      price: "RS 14/KG",
    },
    {
      id: "13",
      image:
        "https://tiimg.tistatic.com/fp/1/008/425/1-14-gram-per-cubic-meter-polyvinyl-chloride-mixed-plastic-scrap-021.jpg",
      name: "PLASTIC",
      quantity: 0,
      price: "RS 10/KG",
    },
    {
      id: "14",
      image: "https://eurometal.net/wp-content/uploads/recycling_header.jpg",
      name: "STEEL",
      quantity: 0,
      price: "RS 37/KG",
    },
    {
      id: "15",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/5/306638203/ZK/NL/NK/40686215/cast-iron-scrap.png",
      name: "IRON",
      quantity: 0,
      price: "RS 27/KG",
    },
    {
      id: "18",
      image: "https://3.imimg.com/data3/UN/MS/MY-1447967/copper-scrap.jpg",
      name: "COPPER",
      quantity: 0,
      price: "RS 425/KG",
    },
    {
      id: "19",
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhASEBAQFQ0PEBUPDw8YEBAQDw8PFREWFhUVFRUYHiggGBolGxUVITEhJSkrLi4uFx8zODMtNygwLisBCgoKDg0OGhAQGy0fHx8tLS0tLS0tLTAtLSstLS0tLSstLS0tLSsrLS0tLS0uLS0tLS0tMTctLS0tLSstLS0tN//AABEIAPMAzwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUDBgcCAf/EAEMQAAIBAgIDCwgGCwEBAAAAAAABAgMRBCEFEjEHEyIyQVFhcYGRoQZCUnOxssHRFCMzQ3LhNFNiY2SCkpOio7PwJP/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHxEBAQACAgIDAQAAAAAAAAAAAAECERIxA1ETIUHw/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfG7bT6VOkcUozes7Rjay58gVOniktmfghGc5ZrVS7WU0MdrO0F2vZ8ydHD1Gs5pfyN+8xyiapiqs4vjPssiDUxVT0pd7MGkYyh962/wwXsZT1K0v1j7yfJDjVtUx1VbJy72YJaWrrz5dyZR4ivNfePvIVTE1OSozPy4tTCtlflJXjtcX1xXwMlPyzcePTi+ptfM0yrjqq8/wAERqmkp8qg/wCWxfkxXhXTcJ5X4aeUnKD6VePei8oV41FrQlGUedNNHEVjovbC3U/mWWitJSpyvSquMubZfrWxmtys6dgBS+TumvpCcZq1aCzyspLnRdAAAAAAAAAAAAAAAAAfJO3YaJh41K8pVJtJSk2m7vl2RXKb4a7hKCpuUVsjJxT6E7InHZvTHQwmrs133QXzJscDOS2Rt+1Uqy+J7RMhVtFGuM9JyqixWAcXZ712U7+0hTwv4P7US3xcrtldKV5aqeeVlbK/Wa4xnatrYVcmpb1UV4EGthFstSvt+zRaYyO9uUdbiytezkQqjettyayXx/8AcxLjF5KfEYH9in2a8fYysxGGt5sl1Tv7TYaxV4kxcY3Mqpp0el9sfijJQi109XCXdtJMmfaUU9pnhF5VsfkRpBwrwje9OXA59VvJdWdjppybyXw7lisPqtX328s+FqxWs9ZcqaTz5HY6yaiUABUAAAAAAAAAAAAAAoY8er6yXvMvihT4dT1kveZrFKzw2mTWyMUT6+U0yjVyBhZa1WCVlF1Lc71oyzv3E+sa9LFV6dRveoWU86mqotxVrO9yb0sw5JWmZfW1Mk5NuS5EkrIqlTd7vVtnLWz1pJ52a7efkPOk9ITbetClJt60eLPUXCupJyWeUFfLjPmMKxVWVk6Ti2opzylBSvLXs75pJRtz3Lekkeq5VYktKuzpKvFHNuIcj1RPEj1RIq/8hP06Hq6j/wAbfE6mct3P88d1Uaj8Yr4nUhEAAUAAAAAAAAAAAAAAoFx6nrJe8X5QJ8Op6yXvMuKVmQbPqPLNssFVkWoSqpEqEESu9pCqkysQ6pK0g1ipxRa12VGKkZqokj1SPEj3TIrY9zlXxsujDz9+mdQOZbmq/wDrq9GHfjUh8jpohQAFQAAAAAAAAAAAAADX48ep6yfvM2AoPPqesl7zNYpWZHmR9R5kaZYahEqkmoyLVYESqQ6pLrEOqzDSBinkU1ct8W8inrslVHkeqewxyZ7g8iK2zcwzxOIfNRS75r5HSjm+5YvrsU/3UPel8jpAhQAFQAAAAAAAAAAAAADX1x6vrJe02A1/z6vrJe8yxKynmR9PMjTKPUZpvlLpxxqbzCbpwStUrqDlw7XUI9NjcKhyvyhrYjC1atStCs8P9JdenKnGFSjk+Bvl5JqXXlkrEy3+O3guGOW8/wCpWoYmMac5fSoWbdatvrlweR73e6t1flZaA046rdOpdvOVGq46u/U09tufNbCjxOl9SDrXiqSWtTdneWXPdq97ruRh8nKGIqVaFZKtDC03LKq4rWjJWSpRSvy7Xla1jnJZ29Gfnw8mNmU1fzTcsWynrstsWynxBp5GByPcdhhZki8iK3TcpX1mLf7FJeMzoxzrcm42MfRRX/Q6KJ0UABUAAAAAAAAAAAAAA1/7yr6yXtNgNfn9pV/GyxKyHiR6ueZGoyjVSg0tjoUVeaerKTjlFy59qL+qUek4trgpvh5pbbcvwM5LGsVMRRUt81ZOnqRpqnvfBjGM9ZWj1pcnIS8JpCNdNxjJaskuFGUb9V0jLiKEna0WrrPJZHyNPVTWfaYti6rzi2VFctsYVNc1VRWe+TsMcj29nYZVvW5Kv0x9NJeFQ6Gc+3JOLjPx01/jL5nQSzooACoAAAAAAAAAAAAABr9T7Sr+NmwGv1vtKv42aiV6PMz6eZlZR6hVYptN8GTz5EWsyJVJZtY1jGYWpKtCqtdQileF5q7WtyJ6vncqPVRzd702um6LqsQqpm4xVXiypxBbYsqK4VGZ7fF7DHIyS4plW/7ki+rxb/fQX+v8zfjQ9yRfU4l/xC/5xN8LOigAKgAAAAAAAAAAAAAGvV/tKv42W2lcVvNGtVW2lSnNLncYto1nQmIjVpxlGV5NXmm+Frcr7yy/aWfSxueZs9NHiZplgqMi1WSajItQiotZkKsQNKYerKrrRUt7Uovj22L0djzt4k2o8iKrMYVFctcYyprslVHke5bDHJmSUW1kjLTom5J+j4h/xLX+qmb0c33IMen9MoJ3UJU61+TWmpQkl/bj3nSC436S9gAKgAAAAAAAAAAAAAxYmhGpCcJK8KkXCS54yVn7Tnq0TOjJ7024xbVllONnbZyrpOjlNpTANSdSEbp5ziuMn6UefqM3GZdrLYocJpSeyTvbbdZ9pYxx0Ws4031T1H/lYwS1Z7dWTW1SXCXRfajDUw0fRmuqSmu6WZNeSdXZvGstbF0/RmupqS70RJ4ql6TXWiNXwq9OS66b+BBq4b97T7XKPwJcvJPxdY+0ytiqX6xEKtiqP6zwINfCX+9o/wBf5ECrgv31H+t/InPP01xx9pWKxND05vqSKnE46gtkZPrkl7EY6+Djy1qfZrv4EOphI+lJ9Ube0zy8l/GuOHsqaUj5sIrsbfiYJ4qVTK7fR+SPf0aK83tb+CL3QHkxXxrSpx1aF+FWcdWkly29N9CJxyvdN4zps+41oh04YnEP76UaUeqndyffK3YdKIeiNGwwtGnRpLgU42XO3tbfS3dkw74zU05W7uwAFQAAAAAAAAAAAAAAABGxWApVePCLfpbJL+ZZkGpoGPmVKkehtTXir+JbgDU9JaIxMM6ShVjzX3ufjk+81TSOnpUJOFei4TTs05La0n7Gjq5wzdSr1JY6rCFGbm5QjTtGT1uBFJpJZ5i1rDx3LpnxflZGLs8NWfSoxkvAhVPKOMlnRcMrpyUYt9SO5YegtWGvGLmopSeqs5WzON7tu/RxVFwouVN4dRhJQm9aWvK8ctr2ZdJvDDLO6xYtkTsH5LY7EKMlRhCnNJqc5xS1XmnaN34F5h9zS/2uKl0qFNR8ZN+w2/ya3z6JhN+SVf6PS32NnHVnvaurPZZlkc9Nba5o7yIwVGz3nfJrzqknUz/DxfA2KMUkkkklkkskkfQVAAAAAAAAAAAAAAAAAAAAAAAAA+aq28vOfQAPlj6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q==",
      name: "GEYSER",
      quantity: 0,
      price: "RS 20/KG",
    },
    {
      id: "20",
      image:
        "https://3.imimg.com/data3/NW/RM/MY-1868038/fridge-scrap-500x500.jpg",
      name: "FRIDGE",
      quantity: 0,
      price: "RS 1000/PIECE",
    },
    {
      id: "24",
      image:
        "https://d15gv0os8mv68o.cloudfront.net/images/thumbnails/734/600/detailed/216/bea0fdd2d852f41a4810f4b6577268f8_shqr-ag.png?t=1696939074",
      name: "MICROWAVE",
      quantity: 0,
      price: "RS 200/PIECE",
    },
    {
      id: "25",
      image:
        "https://www.spasrecycling.com/wp-content/uploads/2019/12/Battery-Recycling.jpg",
      name: "BATTERY",
      quantity: 0,
      price: "RS 72/KG",
    },
  ];
  return (
    <>
      {/* // Location and profile */}
      <ScrollView style={{ backgroundColor: "F0F0F0", flex: 1, marginTop: 1 }}>
        <StatusBar hidden />

        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Ionicons name="location-sharp" size={30} color="#32712c" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable onPress={()=>navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AKPQZvzhvGMWRESqI4jU33yjRU876j-tzbgWV0948GYgVw=s32-c-mo",
              }}
            />
          </Pressable>
        </View>
        {/* Search bar */}

        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#32712c",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for items or More" />

          <Ionicons name="search" size={24} color="#32712c" />
        </View>

        {/* Image Carousel  */}

        <Carousel />

        {/* Services Component */}
        <Services />

        {/* Render all the products  */}
        {product.map((item, index) => (
          <ScrapItem item={item} key={index} />
        ))}
      </ScrollView>
      {total === 0 ? (
            null
          ) : (
            <Pressable
            style={{
              backgroundColor: "#32712C",
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between",
            }}
          >
            <View>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items |  Rs. 500</Text>
              <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges might apply</Text>
            </View>
    
            <Pressable onPress={() => navigation.navigate("PickUp")}>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to pickup</Text>
            </Pressable>
          </Pressable>
          )}
     
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});


