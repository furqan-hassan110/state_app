import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../src/styles/colors'
import Textinput from '../components/Textinput'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import { useAuth } from './authcontext';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const initialValues = { name: '', email: '', password: '' };
  const { role } = useAuth();
  const navigation = useNavigation();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const handleRegister = (values) => {
    console.log('Registration Details:', values);
    if (role === 'user') {
      navigation.navigate('UserStack');
    } else if (role === 'agent') {
      navigation.navigate('AgentStack');
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.backbutton}>

      </View>
      <View >
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.creat}>
            Create your
          </Text>
          <Text style={styles.account}>
            account
          </Text>
        </View>
        <View style={styles.inputcon}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ handleSubmit }) => (
              <>
                <Textinput
                  style={styles.name}
                  name="name"
                  placeholder="Full name"
                />
                <Textinput
                  style={styles.email}
                  name="email"
                  placeholder="Enter your email"
                  keyboardType="email"
                  autoCapitalize="none"
                />
                <Textinput
                  style={styles.pass}
                  name="password"
                  placeholder="password"
                  secureTextEntry
                />
                <Text style={styles.showpass}>
                  Show Password
                </Text>
                <Button
                  title="Register"
                  onPress={handleSubmit}
                  style={styles.button}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Text style={styles.alreadyText}>Already have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signIn}>Login</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10

  },
  name: {
    backgroundColor: colors.textinputfill,
    width: width * 0.85,
    alignSelf: 'center',
    height: '30%',
    borderRadius: 10,
    padding: 10,
    height: height * 0.1,
  },
  email: {
    backgroundColor: colors.textinputfill,
    width: width * 0.85,
    alignSelf: 'center',
    height: '30%',
    borderRadius: 10,
    padding: 10,
    height: height * 0.1,

  },
  pass: {
    backgroundColor: colors.textinputfill,
    width: width * 0.85,
    alignSelf: 'center',
    height: '30%',
    borderRadius: 10,
    padding: 10,
    height: height * 0.1,
  },
  inputcon: {
    top: 100,
  },
  creat: {
    color: colors.thintextcolo,
    fontFamily: 'Lato-Medium',
    fontSize: 25,
    left: 10,
    top: 20


  },
  account: {
    color: colors.thintextcolo,
    fontFamily: 'Lato-Black',
    fontSize: 25,
    left: 15,
    top: 20
  },
  button: {
    width: width * 0.75,
    height: height * 0.08,
    alignSelf: 'center',
    top: 70,
    borderRadius: 10,
    backgroundColor: colors.buttons
  },
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    left: 10
  },

  alreadyText: {
    color: colors.thintextcolo,
    fontFamily: 'Lato-Medium',
    fontSize: 12,
    top: 150
  },
  signIn: {
    color: colors.thintextcolo,
    fontFamily: 'Lato-Black',
    fontSize: 12,
    top: 150
  },
  showpass: {
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    color: colors.text,
    alignSelf: 'flex-end',
    right: 20
  }
})
export default RegisterScreen