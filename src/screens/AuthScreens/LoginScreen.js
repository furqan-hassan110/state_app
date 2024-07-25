/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
// Images
import loginImg from '../../../assets/images/login.png';
// Styles
import colors from '../../styles/colors';
// Contexts
import {useAuth} from '../../contexts/AuthContext';
// Components
import Button from '../../components/Button';
import Textinput from '../../components/Textinput';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const {role} = useAuth();
  const initialValues = {email: '', password: ''};

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  const handleLogin = values => {
    console.log('Entered Credentials:', values);
    if (role === 'user') {
      navigation.navigate('UserStack');
    } else if (role === 'agent') {
      navigation.navigate('AgentStack');
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={loginImg} style={styles.signimage} />
      <View style={{flexDirection: 'row', bottom: 70}}>
        <Text style={styles.Let}>Let's</Text>
        <Text style={styles.sign}>Sign In</Text>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
        {({handleSubmit}) => (
          <>
            <Textinput
              style={styles.email}
              // MaterialIcons={}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Textinput
              style={styles.password}
              name="password"
              placeholder="Password"
              // value={password}
              // onChangeText={handleChange('password')}
              secureTextEntry
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: width * 1.2,
                alignSelf: 'center',
              }}>
              <Text style={styles.forget}>Forget password?</Text>
              <Text style={styles.showpass} onPress={togglePasswordVisibility}>
                {passwordVisible ? 'Hide Password' : 'Show Password'}
              </Text>
            </View>

            <Button
              title="Login"
              onPress={handleSubmit}
              style={styles.button}
            />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: width * 0.75,
                top: 150,
                left: 50,
              }}>
              <Text style={styles.alreadytext}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signIn}>Register</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  signimage: {
    width: width,
    height: height * 0.3,
    bottom: 60,
  },
  Let: {
    fontSize: 25,
    fontFamily: 'Lato-Medium',
    color: colors.text,
  },
  sign: {
    fontSize: 25,
    fontFamily: 'Lato-Black',
    color: colors.boldtextcolor,
    left: 5,
  },
  email: {
    backgroundColor: colors.textinputfill,
    fontFamily: 'Lato-Regular',
    width: width * 0.85,
    alignSelf: 'center',
    height: height * 0.1,
    borderRadius: 10,
    padding: 10,
  },
  password: {
    backgroundColor: colors.textinputfill,
    fontFamily: 'Lato-Regular',
    width: width * 0.85,
    alignSelf: 'center',
    height: height * 0.1,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    width: width * 0.75,
    height: height * 0.08,
    top: 70,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.buttons,
  },
  forget: {
    fontSize: 12,
    fontFamily: 'Lato-Semibold',
    color: colors.text,
    // right: 20
  },
  showpass: {
    fontSize: 12,
    fontFamily: 'Lato-Semibold',
    color: colors.text,
    // left: 20
  },
  alreadytext: {
    color: colors.text,
    alignSelf: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: 12,
  },
  signIn: {
    color: colors.text,
    alignSelf: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 12,
  },
});

export default LoginScreen;
