import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import img1 from '../assets/images/role1.png';
import img2 from '../assets/images/role2.png';
import img3 from '../assets/images/role3.png';
import img4 from '../assets/images/role4.png';
import colors from '../src/styles/colors';
import { Dimensions } from 'react-native';
import Button from '../components/Button';
import { useAuth } from '../navigationscreens/authcontext';
import { useNavigation } from '@react-navigation/native';



const { width, height } = Dimensions.get('window');
const Rolesc = () => {
    const { selectRole } = useAuth();
    const navigation = useNavigation();

    const handleRoleSelection = (role) => {
        console.log('selected role: ', role);
        selectRole(role);
        navigation.navigate('Login');
    };


    return (
        <View style={styles.maincontaier} >
            <View>
                <View style={styles.imagecontainer}>
                    <Image source={img1} style={styles.image}></Image>
                    <Image source={img2} style={styles.image}></Image>
                </View>
                <View style={styles.imagecontainer}>
                    <Image source={img3} style={styles.image}></Image>
                    <Image source={img4} style={styles.image}></Image>
                </View>
                <View style={{ flexDirection: 'row', top: 20 }}>
                    <Text style={styles.findtext}>Find</Text>
                    <Text style={styles.findtextbold}>perfect choice</Text>
                    <Text style={styles.findtext}>for</Text>
                </View>
                <Text style={styles.futuretext}>
                    your future house
                </Text>
                <View style={{ flexDirection: 'row', top: 30 }}>
                    <Text style={styles.findtext}>Ready to</Text>
                    <Text style={styles.findtextbold}>explore?</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 120 }}>
                    <Button
                        style={styles.button}
                        onPress={() => handleRoleSelection('agent')}
                        title="Agent"
                        // onPress={() =>(}
                        backgroundColor={colors.buttons}
                        textColor="#fff"
                        width={width * 0.35}
                        height={height * 0.08}
                        borderRadius={10}
                        fontFamily="Lato-Bold"
                    />
                    <Button
                        style={styles.button}
                        onPress={() => handleRoleSelection('user')}
                        title="User"
                        // onPress={() =>(}
                        backgroundColor={colors.buttons}
                        textColor="#fff"
                        width={width * 0.35}
                        height={height * 0.08}
                        borderRadius={10}
                        fontFamily="Lato-Bold"
                    />
                </View>
                <View style={{ flexDirection: 'row', top: 150, alignSelf: 'center' }}>
                    <Text style={styles.alreadytext}>
                        If you already have an account?
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.sign}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    maincontaier: {
        padding: 10,
        flex: 1,
        backgroundColor: colors.white
    },
    imagecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    image: {
        width: width * 0.45,
        height: height * 0.22,
        borderRadius: 20,
        marginTop: 10
    },
    findtext: {
        fontSize: 25,
        color: colors.text,
        fontFamily: "Lato-Medium"
    },
    findtextbold: {
        fontSize: 25,
        marginLeft: 10,
        color: colors.text,
        marginRight: 10,
        fontFamily: "Lato-Black"
    },
    futuretext: {
        fontSize: 25,
        color: colors.text,
        fontFamily: "Lato-Medium",
        marginTop: 15
    },
    alreadytext: {
        color: colors.thintextcolo,
        fontFamily: 'Lato-Regular',
        fontSize: 12
    },
    sign: {
        color: colors.text,
        fontFamily: 'Lato-Bold',
        fontSize: 12
    }

})
export default Rolesc;