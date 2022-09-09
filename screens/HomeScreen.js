import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db} from '../firebase'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { collection, getDocs, query, where } from 'firebase/firestore';

// icons imports
import { Ionicons, Feather, AntDesign, EvilIcons  } from '@expo/vector-icons';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

// console.log(height, width);




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
        const getuse = query(collection(db, "users"), where("email", "==", email));

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

  let greeting;
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    greeting = 'Morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Afternoon';
  } else {
    greeting = 'Evening';
  }

    return (
        <ImageBackground source={require('../assets/cover.jpg')} resizeMode="cover" style={styles.image}>
            <ScrollView 
            vertical={true} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}
            style={styles.container}>




                {/* <View style={{
                    height: 60, width: '100%', justifyContent: 'center',
                    alignItems: 'center', backgroundColor: 'white', marginTop: 50
                }}>
                    <Text style={{ color: 'blue', fontSize: 20, fontWeight: 'bold' }}>Home</Text>
                    <Text style={{ color: '#131A23', fontSize: 18, fontWeight: '400' }}>Testing login session with uid</Text>
                    <Text>Unique ID: {user?.uid}</Text> 
                </View> */}


                {/* Welconme landing */}
                <View style={{height: 70, width: '100%', 
                justifyContent: 'space-between', alignItems: 'center', 
                backgroundColor: 'rgba(rgba(0, 0, 0,0.5))',
                marginTop: 40,paddingHorizontal: 17,
                flexDirection: 'row'}}>
                    <View>
                {/* <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>Good {greeting} </Text> */}
                <Text style={{ color: '#ccc', fontSize: 20, fontWeight: '400'}}>Welcome Back, </Text>
                <Text style={{ color: '#ccc', fontSize: 20, fontWeight: '400'}}>{myUser.name}</Text>
                {/* <Text style={{ color: '#ccc', fontWeight: '300', fontSize: 20, marginBottom: 10 }}>Email: {email}</Text>

                <Text style={{ color: '#ccc', fontWeight: '300', fontSize: 20, marginBottom: 10 }}>Phone: {myUser.phone}</Text> */}
                </View>
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{margin: 5, height: 25, width: 27}}>
                <Ionicons name="notifications-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{margin: 5, height: 25, width: 27}}>
                <Feather name="send" size={24} color="white" />
                </TouchableOpacity>
                </View>
                </View>
                {/* Landing */}
                <View style={{height: 25, width:'90%', marginTop: 7, justifyContent: 'space-between',alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{color: '#ccc', fontSize: 20, fontWeight: '300'}}>Trending Topics</Text>
                    <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', height: 20, marginTop: 5}}>
                        <Text style={{color: '#fff', marginRight: 5}}>View All</Text>
                        <AntDesign name="arrowright" size={15} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Active discussions */}
                <View style={{height: 300, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={0.6} style={{height: 70, width: '90%',
                 borderWidth: .5, borderColor: '#ccc', 
                 marginTop: 10, borderRadius: 10,paddingHorizontal: 17,
                 backgroundColor: '#000', justifyContent: 'space-between', alignItems: 'center',
                 flexDirection: 'row'}}>
                    <Image source={require('../assets/designs.png')} style={{height: 25, width: 25}} />
                    <View style={{marginRight: 50}}>
                        <Text style={{color: '#f4f4f4', fontWeight: '500',fontSize: 15}}>Design Club</Text>
                        <Text style={{color: '#ccc', fontWeight: '300',fontSize: 16}}>51 Discussions</Text>
                    </View>

                    <EvilIcons name="arrow-right" size={35} color="grey" />

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={{height: 70, width: '90%',
                 borderWidth: .5, borderColor: '#ccc', 
                 marginTop: 10, borderRadius: 10,paddingHorizontal: 17,
                 backgroundColor: '#000', justifyContent: 'space-between', alignItems: 'center',
                 flexDirection: 'row'}}>
                    <Image source={require('../assets/startup.png')} style={{height: 25, width: 25}} />
                    <View style={{marginRight: 50}}>
                        <Text style={{color: '#f4f4f4', fontWeight: '500',fontSize: 15}}>Startup Club</Text>
                        <Text style={{color: '#ccc', fontWeight: '300',fontSize: 16}}>80 Discussions</Text>
                    </View>

                    <EvilIcons name="arrow-right" size={35} color="grey" />


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} style={{height: 70, width: '90%',
                 borderWidth: .5, borderColor: '#ccc', 
                 marginTop: 10, borderRadius: 10,paddingHorizontal: 17,
                 backgroundColor: '#000', justifyContent: 'space-between', alignItems: 'center',
                 flexDirection: 'row'}}>
                    <Image source={require('../assets/money.png')} style={{height: 25, width: 25}} />
                    <View style={{marginRight: 50}}>
                        <Text style={{color: '#f4f4f4', fontWeight: '500',fontSize: 15}}>Finance Club</Text>
                        <Text style={{color: '#ccc', fontWeight: '300',fontSize: 16}}>27 Discussions</Text>
                    </View>

                    <EvilIcons name="arrow-right" size={35} color="grey" />


                </TouchableOpacity>

                

                </View>

                {/* Upcomming events */}

                <View style={{height: 25, width:'90%', marginTop: 7, justifyContent: 'space-between',alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{color: '#ccc', fontSize: 20, fontWeight: '300'}}>Upcoming Events</Text>
                    <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', height: 20, marginTop: 5}}>
                        <Text style={{color: '#fff', marginRight: 5}}>See All</Text>
                        <AntDesign name="arrowright" size={15} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Events */}
                <View style={{height: 170}}>
                    <ScrollView showsHorizontalScrollIndicator={false} 
                    bounces={true}
                    horizontal={true} 
                    contentContainerStyle={{flexDirection: 'row', height: 160}}>
                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(138, 214, 143, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Designing for</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Delight</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text>
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(68, 255, 255, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Getting the first</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>High paying client</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text>
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(237, 127, 118, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Content Creation in</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>College</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text>
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(227, 231, 231, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>A developer's</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Journey</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text>
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>
                    </ScrollView>

                </View>

                {/* Most liked  */}

                <View style={{height: 25, width:'90%', marginTop: 7, justifyContent: 'space-between',alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{color: '#ccc', fontSize: 20, fontWeight: '300'}}>Most liked Views</Text>
                    <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', height: 20, marginTop: 5}}>
                        <Text style={{color: '#fff', marginRight: 5}}>See All</Text>
                        <AntDesign name="arrowright" size={15} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Liked */}
                <View style={{height: 170}}>
                    <ScrollView showsHorizontalScrollIndicator={false} 
                    bounces={true}
                    horizontal={true} 
                    contentContainerStyle={{flexDirection: 'row', height: 160}}>
                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(36, 84, 158, 0.7)',
                            borderRadius: 10, padding: 10, margin: 10}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>This is what</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Happened</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text>
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(151, 113, 232, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10, paddingTop: 90}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>The Netflix Share</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Collapse</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                {/* <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text> */}
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(165, 85, 141, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10,paddingTop: 90}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>What are</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Student</Text>
                                <Text style={{fontWeight: '500', fontSize: 15, color: '#2F1012'}}>Credit Cards</Text>
                                {/* <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text> */}
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(210, 47, 60, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10,paddingTop: 90}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Creativity</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Tips</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                {/* <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text> */}
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>
                    </ScrollView>

                </View>

                {/* Resources */}


                <View style={{height: 25, width:'90%', marginTop: 7, justifyContent: 'space-between',alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{color: '#ccc', fontSize: 20, fontWeight: '300'}}>Resources</Text>
                    <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', height: 20, marginTop: 5}}>
                        <Text style={{color: '#fff', marginRight: 5}}>See All</Text>
                        <AntDesign name="arrowright" size={15} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Liked */}
                <View style={{height: 170}}>
                    <ScrollView showsHorizontalScrollIndicator={false} 
                    bounces={true}
                    horizontal={true} 
                    contentContainerStyle={{flexDirection: 'row', height: 160}}>
                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(36, 84, 158, 0.7)',
                            borderRadius: 10, padding: 10, margin: 10}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>UI/UX</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Prototyping</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text>
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(151, 113, 232, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10, paddingTop: 90}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>NFT Trading</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Tutorials</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                {/* <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text> */}
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(165, 85, 141, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10,paddingTop: 90}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Programming</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Basics</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                {/* <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text> */}
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={{height: 150, width: 150, borderWidth: 1, 
                            borderColor: '#ccc', backgroundColor: 'rgba(210, 47, 60, 0.6)',
                            borderRadius: 10, padding: 10, margin: 10,paddingTop: 90}}>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Guidelines to</Text>
                                <Text style={{fontWeight: '800', fontSize: 15}}>Efficiency</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>lorem ipsum ammet dola simet</Text>
                                {/* <Text>Build yiur innovative capabilities with our community.</Text>
                                <Text style={{fontWeight: '500', fontSize: 10}}>Here to take your aspiring career to the next level. We light up your dreams</Text> */}
                                <View style={{height: 4, width: '100%', backgroundColor: '#000'}}></View>
                        </TouchableOpacity>
                    </ScrollView>

                </View>

                {/* Help and support */}

                <View style={{height: 25, width:'90%', marginTop: 7, justifyContent: 'space-between',alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{color: '#ccc', fontSize: 20, fontWeight: '300'}}>Help & support</Text>
                    
                </View>
                <View style={{height: 70, width:'80%', margin: 10, flexDirection: 'row' }}>
                    <TouchableOpacity style={{height: 40, width: 130, borderWidth: 1, borderColor: '#ccc',
                     borderRadius: 10, justifyContent: 'center', alignItems: 'center',
                     flexDirection: 'row', margin: 7}}>
                        <Text style={{color: '#fff', fontWeight: '300', fontSize: 17}}>Create Ticket</Text>
                        <AntDesign name="arrowright" size={15} color="white" />
                     </TouchableOpacity>

                     <TouchableOpacity style={{height: 40, width: 130, borderWidth: 1, borderColor: '#ccc',
                     borderRadius: 10, justifyContent: 'center', alignItems: 'center',
                     flexDirection: 'row', margin: 7}}>
                        <Text style={{color: '#fff', fontWeight: '300', fontSize: 17}}>E-mail us</Text>
                        <AntDesign name="arrowright" size={15} color="white" />
                     </TouchableOpacity>

                </View>


                {/* <TouchableOpacity style={styles.button1}
                    onPress={()=> navigation.navigate('Upload')}
                    activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={handleSignout}
                    activeOpacity={0.5}>
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity> */}



            </ScrollView>
        </ImageBackground>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0,0.8)',
        // justifyContent: 'center',
        
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