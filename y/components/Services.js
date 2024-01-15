import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'

const Services = () => {
    const services =[
    {
        id:"0",
        image: "https://as1.ftcdn.net/v2/jpg/06/14/72/86/1000_F_614728619_nEEaFGc0srEIHC5mvxOF9zdYt8XUEjJ9.jpg",
        name:"E-waste"
    },
    {
        id:"11",
        image: "https://as1.ftcdn.net/v2/jpg/06/31/94/08/1000_F_631940879_IQfXqU5TQbovuWrwF7IuLZAwu2pb2aR8.jpg",
        name:"House Hold"
    },
    {
        id:"12",
        image: "https://as1.ftcdn.net/v2/jpg/04/88/91/34/1000_F_488913424_CaHLhnJBI4X0LmEQrAF2nBDBDsJtn55s.jpg",
        name:"Spare Parts"
    },
    {
        id:"13",
        image: "https://as2.ftcdn.net/v2/jpg/02/50/84/53/1000_F_250845383_a58dc6o8zpiWeBbw6dAf8uwAJp6qrKIH.jpg",
        name:"Plastic"
    },
    ]



  return (
    <View style={{padding:10}}>
    <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Services Available</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service,index) => (
            <Pressable style={{margin:10,backgroundColor:"white",padding:20,borderRadius:7}} key={index}>
                <Image source={{uri:service.image}} style={{width:70,height:70}}/>

                <Text style={{textAlign:"center",marginTop:10,justifyContent:'center'}}>{service.name}</Text>
            </Pressable>
        ))} 
    </ScrollView>
</View>
  )
}

export default Services

const styles = StyleSheet.create({})