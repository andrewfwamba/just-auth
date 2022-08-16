import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth, db, firebase } from '../firebase'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { collection,  doc,  getDoc,  getDocs, getFirestore, query, where } from 'firebase/firestore';




// const q = query(collection(db, "users"), where('unid', '==', auth.currentUser?.uid));



// const querySnapshot = () => getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });


const HomeScreen = () => {
    const user = auth.currentUser;
    // const userRef = collection(db, "users");
    // const q = query(userRef, where(user?.email, "==", true));

//     async function getUser() {

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });
// }


    // const docSnap = getDoc(userRef);

    const navigation = useNavigation();

    // if (getDoc(userRef).exists()) {
    //     console.log("Document data:", getDoc(userRef).data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
      

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

    
        // query(collection(db, "users"),
        // where('email', '==', auth.currentUser.email))
        // .get()
        // .then((querySnapshot) =>
        //   querySnapshot.forEach((doc) =>
        //       ({
        //         avatar: doc.data().avatar,
        //         name: doc.data().name,
        //         email: doc.data().email
        //       })
        //   )
        // );
    

    

// db.collection("users").where("uid", "==", user?.uid).get();

    // const q = query(collection(db, "users"), where("unid", "==", auth.currentUser?.uid));

    // if (user !== null) {
    //     // The user object has basic properties such as display name, email, etc.
    //     const displayName = user.displayName;
    //     const email = user.email;
      
    //     // The user's ID, unique to the Firebase project. Do NOT use
    //     // this value to authenticate with your backend server, if
    //     // you have one. Use User.getToken() instead.
    //     const uid = user.uid;
    //   }
    

    // const querySnapshot =  getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

  return (
    <ImageBackground source={require('../assets/cover.jpg')} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
        
        <View style={{height: 60, width: '100%', justifyContent: 'center',
         alignItems: 'center', backgroundColor: 'white',
         position: 'absolute', top: 50}}>
            <Text style={{color: 'blue', fontSize: 20, fontWeight: 'bold'}}>Firebase Home</Text>
            <Text style={{color: '#131A23', fontSize: 18, fontWeight: '400'}}>Testing login session with uid</Text>
            <Text>Unique ID: {user?.uid}</Text>
        </View>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '800', margin: 30}}>Your email is displayed below</Text>
      <Text style={{color: '#ccc', fontWeight: '300', fontSize: 20, marginBottom: 10}}>Email: {user?.email}</Text>
      <Text style={{color: '#ccc', fontWeight: '300', fontSize: 20, marginBottom: 10}}>Name: {user.name}</Text>


      <TouchableOpacity style={styles.button}
      onPress={handleSignout}
      activeOpacity={0.5}>
        <Text style={styles.buttonText}>Sign out</Text>
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
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        
    },
    image: {
        flex: 1,
    }
})