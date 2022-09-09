import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {db, auth } from '../firebase';
import { collection,addDoc } from 'firebase/firestore';

const usersCollection = collection(db, "users");

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

     useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.replace('Hometabs')
            }
        })
        return unsubscribe;
    })



     //Handle Registration with firebase.

     const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed in successfull
        const user = userCredential.user;
        console.log('Registered with:',user.email);

        if(user.email){
             addDoc(usersCollection, {
                email: email,
                name: name,
                phone: phone,
                unid: user.uid,
            })
        }
    // ...
  })
  .catch((error) => {

    //error reporting
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ..
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
        placeholder='Full name'
        value={name}
        onChangeText={text=>setName(text) }
        style={styles.input}/>
        

        <TextInput
        placeholder='Email'
        value={email}
        onChangeText={text=>setEmail(text) }
        style={styles.input}/>

<TextInput
        placeholder='phone'
        value={phone}
        onChangeText={text=>setPhone(text) }
        style={styles.input}/>

        <TextInput
        placeholder='Password'
        value={password}
        onChangeText={text=> setPassword(text) }
        style={styles.input}
        secureTextEntry/>

        <TextInput
        placeholder='Confirm password'
        value={confirmPassword}
        onChangeText={text=>setConfirmPassword(text) }
        style={styles.input}
        secureTextEntry/>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={handleRegister}
        style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>

        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> {navigation.navigate('Login')}}
        style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Login</Text>

        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(24, 72, 6,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        

    },
input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 5,
    
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
    borderWidth: 2,
    
},
buttonOutlineText: {
    color: '#0782f9',
    fontWeight: '700',
    fontSize: 16,
    
},
})