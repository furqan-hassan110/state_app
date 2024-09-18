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
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
// Import the login function from your API file
import {login as apiLogin} from '../../utils/apiUtils';
import loginImg from '../../../assets/images/login.png';
import colors from '../../styles/colors';
import {useAuth} from '../../contexts/AuthContext';
import Button from '../../components/Button';
import Textinput from '../../components/Textinput';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const {login, role} = useAuth(); // Destructure login function from AuthContext

  const initialValues = {email: '', password: ''};

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  const handleLogin = async values => {
    apiLogin(values.email, values.password)
      .then(async res => {
        console.log('[LOGIN RES] ==> ', res);
        console.log(res.data.user_type);
        if (res.data.user_type === role) {
          await login(res.data);
          console.log('OK to go..');
        } else {
          console.log('Permission denied..');
        }
      })
      .catch(err => {
        console.log('[LOGIN ERR] ==> ', err);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          <Image source={loginImg} style={styles.signimage} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.Let}>Let's</Text>
          <Text style={styles.sign}> Sign In</Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}>
          {({handleSubmit}) => (
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
                }}>
                <Text style={styles.forget}>Forget password ?</Text>
              </View>
              <View
                style={{
                  marginTop: 'auto',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Button
                  title="Sign In"
                  onPress={handleSubmit}
                  style={styles.button}
                />
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.alreadytext}>
                    Don't have an account ?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}>
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
  },
  Let: {
    fontSize: 22,
    fontFamily: 'Lato-Medium',
    color: colors.text,
  },
  sign: {
    fontSize: 22,
    fontFamily: 'Lato-Bold',
    color: colors.boldtextcolor,
  },
  email: {
    backgroundColor: colors.textinputfill,
    color: colors.black,
    fontFamily: 'Lato-Regular',
    width: width * 0.8,
    alignSelf: 'center',
    height: height * 0.08,
    borderRadius: 10,
  },
  password: {
    backgroundColor: colors.textinputfill,
    color: colors.black,
    fontFamily: 'Lato-Regular',
    width: width * 0.72,
    alignSelf: 'center',
    height: height * 0.08,
    borderRadius: 10,
  },
  button: {
    width: width * 0.75,
    height: height * 0.075,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.buttons,
  },
  forget: {
    fontSize: 12,
    fontFamily: 'Lato-Semibold',
    color: colors.text,
  },
  alreadytext: {
    color: colors.text,
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
