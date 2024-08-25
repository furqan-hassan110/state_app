/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionics from 'react-native-vector-icons/Ionicons';
// Images
import loginImg from '../../../assets/images/login.png';
// Styles
import colors from '../../styles/colors';
// Contexts
import { useAuth } from '../../contexts/AuthContext';
// Components
import Button from '../../components/Button';
import Textinput from '../../components/Textinput';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const { role, login } = useAuth(); // Destructure login function
  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  const handleLogin = async (values) => {
    try {
      // Replace this with actual API call for authentication
      // const response = await api.login(values.email, values.password);
      const userData = {
        name: 'John Doe',
        email: values.email,
        // Add other user data as needed
      };

      await login(userData); // Call login function from AuthContext

      // Navigation will be handled automatically by RootNavigator based on auth state
    } catch (error) {
      console.error('Login error:', error);
      // Optionally show error message to user
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Image source={loginImg} style={styles.signimage} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.Let}>Let's</Text>
          <Text style={styles.sign}> Sign In</Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleSubmit }) => (
            <>
              <View>
                <Textinput
                  iconSet="MaterialIcons"
                  style={styles.email}
                  icon={'mail-outline'}
                  name="email"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Textinput
                  iconSet="Ionicons"
                  style={styles.password}
                  icon={'lock-closed'}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
              </View>
              <View
                style={{
                  flexDirection: 'row-reverse',
                }}
              >
                <Text style={styles.forget}>Forget password ?</Text>
              </View>
              <View
                style={{
                  marginTop: 'auto',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Button
                  title="Sign In"
                  onPress={handleSubmit}
                  style={styles.button}
                />
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <Text style={styles.alreadytext}>
                    Don't have an account ?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                  >
                    <Text style={styles.signIn}> Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
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
    // bottom: 60,
  },
  Let: {
    fontSize: 22,
    fontFamily: 'Lato-Medium',
    color: colors.text,
    // left:10
  },
  sign: {
    fontSize: 22,
    fontFamily: 'Lato-Bold',
    color: colors.boldtextcolor,
    // left: 15,
  },
  email: {
    backgroundColor: colors.textinputfill,
    // paddingLeft:50,
    fontFamily: 'Lato-Regular',
    width: width * 0.8,
    alignSelf: 'center',
    height: height * 0.08,
    borderRadius: 10,
    // padding: 10,

  },
  password: {
    backgroundColor: colors.textinputfill,
    // paddingLeft:50,
    fontFamily: 'Lato-Regular',
    width: width * 0.72,
    alignSelf: 'center',
    height: height * 0.08,
    borderRadius: 10,
    // padding: 10,
    // bottom:20
  },
  button: {
    width: width * 0.75,
    height: height * 0.075,
    // top: 60,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.buttons,
  },
  forget: {
    fontSize: 12,
    fontFamily: 'Lato-Semibold',
    color: colors.text,
  },
  showpass: {
    fontSize: 12,
    fontFamily: 'Lato-Semibold',
    color: colors.text,
  },
  alreadytext: {
    color: colors.text,
    // alignSelf: 'center',
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
