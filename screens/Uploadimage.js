import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
export default function UploadImage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    checkForCameraRollPermission()
  }, []);
//   const addImage=()=>{};
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
      console.log(JSON.stringify(_image));
      if (!_image.cancelled) {
        setImage(_image.uri);
      }

  }
  const  checkForCameraRollPermission=async()=>{
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("","Please grant camera roll permissions inside your system's settings",[{text: "Allow"}]);
    }else{
      console.log('Media Permissions are granted')
    }

   
}
  return (
    <View style={{flex:1,
        justifyContent: 'center',
        alignItems: 'center',}}>
            <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 90, height: 90, borderRadius: 90 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
    </View>
  );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:100,
        width:100,
        backgroundColor:'#efefef',
        justifyContent: 'center', alignItems: 'center',
        position:'relative',
        borderRadius:100,
        resizeMode: 'contain',
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.5,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})