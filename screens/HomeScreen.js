import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db, firebase } from '../firebase'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { collection, collectionGroup, DocumentReference, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';



const HomeScreen = () => {
    const user = auth.currentUser;
    const [myUser, setMyUser] = useState('');

    const navigation = useNavigation();
    useEffect(() => {
        getUser()
    }, [])

    const handleSignout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            //sign out successful

            navigation.replace('Login');

        }).catch((error) => {

            //error reporting
            console.log(error);

        });


    };
    let email = auth.currentUser?.email;
    const getUser = () => {
        const getuse = query(collection(db, "users"), where("email", "==", auth.currentUser?.email));

        getDocs(getuse).then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                const test = (doc.id, "=>", doc.data());
                // console.log(test.name);
                setMyUser((doc.id, "=>", doc.data()))

            });
        })
            .catch(function (error) {
                seterror("Error getting documents: ", error);
            });
    }

    return (
        <ImageBackground source={require('../assets/cover.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>



                <View style={{
                    height: 60, width: '100%', justifyContent: 'center',
                    alignItems: 'center', backgroundColor: 'white',
                    position: 'absolute', top: 50
                }}>
                    <Text style={{ color: 'blue', fontSize: 20, fontWeight: 'bold' }}>Firebase Home</Text>
                    <Text style={{ color: '#131A23', fontSize: 18, fontWeight: '400' }}>Testing login session with uid</Text>
                    <Text>Unique ID: {user?.uid}</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '800', margin: 30 }}>Your email is displayed below</Text>
                <Text style={{ color: '#ccc', fontWeight: '300', fontSize: 20, marginBottom: 10 }}>Email: {email}</Text>
                <Text style={{ color: '#ccc', fontWeight: '300', fontSize: 20, marginBottom: 10 }}>Name: {myUser.name}</Text>
                <Text style={{ color: '#ccc', fontWeight: '300', fontSize: 20, marginBottom: 10 }}>Phone: {myUser.phone}</Text>




                <TouchableOpacity style={styles.button}
      onPress={handleSignout}
      activeOpacity={0.5}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

                <TouchableOpacity style={styles.button1}
                    onPress={getUser}
                    activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Init</Text>
                </TouchableOpacity>


            </View>
        </ImageBackground>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(24, 72, 6,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0782f9',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        position: 'absolute',
        bottom: 100,
        elevation: 2
    },
    button1: {
        backgroundColor: '#0782f9',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        position: 'absolute',
        bottom: 220,
        elevation: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,

    },
    image: {
        flex: 1,
    }
})