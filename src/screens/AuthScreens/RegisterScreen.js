/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
// Styles
import colors from '../../styles/colors';
// Contexts
import { useAuth } from '../../contexts/AuthContext';
// Components
import Textinput from '../../components/Textinput';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const initialValues = { name: '', email: '', password: '', phoneNo: '' };
  const { role, setUserData, login, selectRole } = useAuth();
  const navigation = useNavigation();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phoneNo: Yup.string().required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  const handleRegister = async (values) => {
    try {
      
      setUserData(values);

     

      await login(values); 
      if (role === 'user') {
        
        navigation.navigate('UserProfileScreen');
      } else {

        console.log('Role is not user:', role);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backbutton}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 60 }}>
          <Text style={styles.creat}>Create your</Text>
          <Text style={styles.account}> account</Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ handleSubmit }) => (
            <>
              <View>
                <Textinput
                  style={styles.name}
                  name="name"
                  icon={'person'}
                  placeholder="Full name"
                />
                <Textinput
                  style={styles.email}
                  name="email"
                  icon={'mail-outline'}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Textinput
                  style={styles.Phone}
                  name="phoneNo"
                  icon={'phone'}
                  placeholder="Enter Phone No"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
                <Textinput
                  iconSet="Ionicons"
                  style={styles.pass}
                  icon={'lock-closed'}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Button
                  title="Register"
                  onPress={handleSubmit}
                  style={styles.button}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 'auto',
                }}
              >
                <Text style={styles.alreadyText}>
                  Already have an account ?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.signIn}> Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  name: {
    backgroundColor: colors.textinputfill,
    width: width * 0.8,
    height: height * 0.08,
    borderRadius: 10,
  },
  email: {
    backgroundColor: colors.textinputfill,
    width: width * 0.8,
    height: height * 0.08,
    alignSelf: 'center',
    borderRadius: 10,
  },
  Phone: {
    backgroundColor: colors.textinputfill,
    width: width * 0.8,
    height: height * 0.08,
    alignSelf: 'center',
    borderRadius: 10,
  },
  pass: {
    backgroundColor: colors.textinputfill,
    width: width * 0.72,
    height: height * 0.08,
    alignSelf: 'center',
    borderRadius: 10,
  },
  creat: {
    color: colors.thintextcolo,
    fontFamily: 'Lato-Medium',
    fontSize: 25,
  },
  account: {
    color: colors.thintextcolo,
    fontFamily: 'Lato-Black',
    fontSize: 25,
  },
  button: {
    width: width * 0.75,
    height: height * 0.08,
    borderRadius: 10,
    backgroundColor: colors.buttons,
  },
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alreadyText: {
    color: colors.thintextcolo,
    fontFamily: 'Lato-Medium',
    fontSize: 12,
  },
  signIn: {
    color: colors.thintextcolo,
    fontFamily: 'Lato-Black',
    fontSize: 12,
  },
  showpass: {
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    color: colors.text,
    alignSelf: 'flex-end',
  },
});

export default RegisterScreen;
