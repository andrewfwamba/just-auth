import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/core';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.navigate('Home')
            }
        })
        return unsubscribe;
    })

   
  // Handling log in with firebase
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('Logged in with:',user.email);

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
        }

  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding">

<View style={{justifyContent: 'center', alignContent: 'center', padding: 30}}>
            <Image source={require('../assets/firebaselg.png')} style={{height: 70, width: 70}}/>
        </View>

      <View style={styles.inputContainer}>
        <TextInput
        placeholder='Email'
        value={email}
        onChangeText={text=>setEmail(text) }
        style={styles.input}/>

<TextInput
        placeholder='Password'
        value={password}
        onChangeText={text=> setPassword(text) }
        style={styles.input}
        secureTextEntry/>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={handleLogin}
        style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>

        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> navigation.navigate('Signup')}
        style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Register</Text>

        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(24, 72, 6,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer:{
        width: '80%',
    },
input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    
},
buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    
},
button: {
    backgroundColor: '#0782f9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
},
buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    
},
buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782f9',
    borderWidth: 1,
    
},
buttonOutlineText: {
    color: '#0782f9',
    fontWeight: '700',
    fontSize: 16,
    
},
})